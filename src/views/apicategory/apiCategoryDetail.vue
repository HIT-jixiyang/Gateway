<template>
  <section class="allsection">
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
          <span>基本信息</span>
      </div>
      <div>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">分类名称: </span>{{apiCategory.api_category_name}}</el-col>
          <el-col class="detailcell" :span="12"><span class="detailLabel">平均响应时间(秒): </span>{{apiCategory.api_category_avg_response_time}}</el-col>
        </el-row>
        <el-row class="filter-container">
          <el-col class="detailcell " :span="12"><span class="detailLabel">总调用次数: </span>{{apiCategory.api_category_total_times}}</el-col>
          <el-col class="detailcell" :span="12"><span class="detailLabel">服务评价等级: </span>
            <el-rate
            class="filter-item"
              v-model="apiCategory.api_category_comment"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">path: </span>{{apiCategory.api_category_path}}</el-col>
          <el-col class="detailcell" :span="12"><span class="detailLabel">请求方式: </span>{{formatMethod(apiCategory.api_category_request_type)}}</el-col>
        </el-row>
        <el-row>
          <el-col class="detailcell" :span="24"><span class="detailLabel">描述: </span>{{apiCategory.api_category_desc}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
          <span>正确返回报文样例</span>
      </div>
      <el-input type="textarea" autosize v-model="apiCategory.api_category_normal_response" disabled></el-input>
    </el-card>
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
          <span>错误返回报文样例</span>
      </div>
      <el-input type="textarea" autosize v-model="apiCategory.api_category_error_response" disabled></el-input>
    </el-card>
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
          <span>header参数</span>
      </div>
      <el-table
        :data="params.header"
        border
        style="width: 100%">
        <el-table-column
          prop="standard_inbound_param_key"
          label="参数名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="standard_inbound_param_type"
          label="类型"
          width="150">
        </el-table-column>
        <el-table-column
          label="是否必填"
          width="100">
          <template slot-scope="scope">
            {{ismust(scope.row.standard_inbound_param_position)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="standard_inbound_param_value_demo"
          label="示例值"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="standard_inbound_param_desc"
          label="描述"
          min-width="300">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
          <span>query参数</span>
      </div>
      <el-table
        :data="params.query"
        border
        style="width: 100%">
        <el-table-column
          prop="standard_inbound_param_key"
          label="参数名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="standard_inbound_param_type"
          label="类型"
          width="150">
        </el-table-column>
        <el-table-column
          label="是否必填"
          width="100">
          <template slot-scope="scope">
            {{ismust(scope.row.standard_inbound_param_position)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="standard_inbound_param_value_demo"
          label="示例值"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="standard_inbound_param_desc"
          label="描述"
          min-width="300">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
          <span>body参数</span>
      </div>
      <el-input type="textarea" autosize v-model="params.body" disabled></el-input>
    </el-card>
  </section>
</template>
<script>
import BizService from '../../services/biz-service.js'
var service = new BizService()
export default {
  data () {
    return {
      response: {},
      params: {},
      apiCategory: {},
      activeName: "detail"
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      var apiCategory =  GBFL.Cache.get('apiCategory')
      this.apiCategory = apiCategory
      service.getApiCategoryDetail ({api_category_id: apiCategory.api_category_id},(isOk, data) => {
        if(isOk){
          var response = data.data.response
          console.log(data)
          response.normal_response = this.formatJSON(response.normal_response)
          response.error_response = this.formatJSON(response.error_response)
          this.response = response
          var params = data.data.params
          params.body = this.formatJSON(JSON.stringify(params.body))
          this.params = data.data.params
        }else{
          this.$message({
            type: 'warning',
            message: '获取详情失败',
            showClose: true
          })
        }
      })
    },
    formatMethod (val) {
      if (val == 0)
        return 'GET'
      else if (val == 1)
        return 'POST'
      else
        return 'GET/POST'
    },
    formatBill (val) {
      if (val == '1')
        return '按访问次数计费'
      else if (val == '0')
        return '按流量计费'
    },
    ismust(val){
      if(val=='1')
        return '必填'
      else if(val=='0')
        return '可选'
    },
    goback () {
      window.location.href='/api/search';
    },
    formatJSON: GBFL.Util.formatJSON
  }
}
</script>
<style scope>
    .infocard .el-card__body {
        padding: 0;
    }
    .allsection .el-card {
        margin-top: 12px;
    }
    .allsection .el-card .el-card__header {
        padding: 10px 20px;
        background-color: #EEF1F6;
        color: black;
        border-left: 3px solid #475669;
    }
    .detail-title .title-name {
        line-height: 50px;
        font-size: 20px;
    }
    .detail-title .el-button {
        margin-top: 5px;
        margin-bottom: 10px;
    }
    .allsection .el-row .user-detail-title {
        border-bottom: 1px solid #DDD;
    }
    .infocard .el-card__header div .el-button {
        padding: 3px 10px;
        float: right;
    }
    .infocard{
        box-shadow:none;
        margin-top:12px;
    }
    .detailcell {
        height: 50px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        line-height: 50px;
        padding-left: 23px;
        font-size: 12px;
    }
    .detailcell .detailLabel {
        color:#8492A6;
        margin-right: 10px;
    }
    .filter-container{
      padding-bottom: 0px;
    }
    .filter-item{
      margin-bottom: 0px;
    }
    .paragraph{
      margin-left: 10px;
    }
    .el-textarea.is-disabled .el-textarea__inner{
      cursor: auto;
      background-color: white;
      color: black;
    }
</style>


