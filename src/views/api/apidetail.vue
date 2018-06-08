<template>
  <section class="allsection">
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
        <span>基本信息</span>
      </div>
      <div>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">Api名称: </span>{{api.api_name}}</el-col>
          <el-col class="detailcell" :span="12"><span class="detailLabel">Api请求方式: </span>{{formatMethod(api.api_method)}}</el-col>
        </el-row>
        <el-row class="filter-container">
          <el-col class="detailcell " :span="12"><span class="detailLabel">ApiUrl: </span>{{api.api_url}}</el-col>
          <el-col class="detailcell" :span="12"><span class="detailLabel">Api所属Api类： </span>{{api.api_category_name}}</el-col>
        </el-row>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">服务提供商名称: </span>{{api.sp_name}}</el-col>
          <el-col class="detailcell" :span="12"><span class="detailLabel">Api记账方式: </span>{{formatBill(api.api_bill_type)}}</el-col>
        </el-row>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">Api价格: </span>{{api.price}}</el-col>
          <el-col class="detailcell" :span="12"><span class="detailLabel">配额: </span>{{api.content}}</el-col>
        </el-row>
        <el-row>
          <el-col class="detailcell" :span="24"><span class="detailLabel">Api功能描述: </span>{{api.api_description}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
        <span>header参数</span>
      </div>
      <el-table
        :data="header"
        border
        style="width: 100%">
        <el-table-column
          prop="api_param_key"
          label="参数名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="api_param_value"
          label="参数值示例"
          width="150">
        </el-table-column>

        <el-table-column
          prop="api_param_type"
          label="参数类型"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="api_param_desc"
          label="参数描述"
          min-width="300">
        </el-table-column>
        <el-table-column
          label="参数是否必须"
          width="100">
          <template slot-scope="scope">
            {{ismust(scope.row.api_param_ismust)}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
        <span>query参数</span>
      </div>
      <el-table
        :data="query"
        border
        style="width: 100%">
        <el-table-column
          prop="api_param_key"
          label="参数名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="api_param_value"
          label="参数值示例"
          width="150">
        </el-table-column>

        <el-table-column
          prop="api_param_type"
          label="参数类型"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="api_param_desc"
          label="参数描述"
          min-width="300">
        </el-table-column>
        <el-table-column
          label="参数是否必须"
          width="100">
          <template slot-scope="scope">
            {{ismust(scope.row.api_param_ismust)}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
        <span>body参数</span>
      </div>
      <el-input type="textarea" autosize v-model="body" disabled></el-input>
    </el-card>

    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
        <span>Api返回格式</span>
      </div>
      <span>Api正常返回示例</span>
      <el-input type="textarea" autosize v-model="api.api_normal_return_demo" disabled></el-input>
      <span>Api错误返回示例</span>
      <el-input type="textarea" autosize v-model="api.api_error_return_demo" disabled></el-input>

    </el-card>
  </section>
</template>
<script>
  import BizService from '../../services/biz-service.js'
  var service = new BizService()
  export default {
    data () {
      return {
        query:[],
        body:'',
        api: {},
        activeName: "detail",
        header:[]
      }
    },
    created () {
      this.initPage()
    },
    methods: {
      initPage () {
        var api =  GBFL.Cache.get('api')
        this.api = api
        service.getApiDetail ({api_id: api.api_id},(isOk, data) => {
          if(isOk){
            this.api=data.data.api
            console.log(JSON.stringify(api))
            this.query=data.data.params.query
            this.header=data.data.params.header
            this.body=data.data.params.body;
            console.log("body"+this.body)
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
          return '是'
        else if(val=='0')
          return '否'
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


