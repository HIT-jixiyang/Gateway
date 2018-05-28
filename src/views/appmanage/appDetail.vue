<template>
  <section class="allsection">
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
        <span>基本信息</span>
      </div>
      <div>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">App名称：</span>{{app.app_name}}</el-col>
        </el-row>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">AppID：</span>{{app.app_id}}</el-col>
        </el-row>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">AppSecret：</span>{{app.app_secret}}</el-col>
        </el-row>
        <el-row>
          <el-col class="detailcell" :span="12"><span class="detailLabel">App描述：</span>{{app.app_description}}</el-col>
        </el-row>

      </div>
    </el-card>
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
        <span>App已经获得授权的API类列表</span>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="api_category_name"
          label="API类名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="api_category_id"
          label="API类ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="api_category_url"
          label="API类url"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100px">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="showDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filter.pageNo"
        :page-sizes="[5, 10, 15]"
        :page-size="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataLength"
        style="float:right">
      </el-pagination>
    </el-card>
  </section>
</template>
<script>
  import BizService from '../../services/biz-service.js'
  var service = new BizService()
  export default {
    data () {
      return {
        app:{},
        tableData: [],
        tableDataLength: null,
        filter: {
          pageSize: 10,
          pageNo: 1

        }
      }
    },
    created () {
      this.initPage()
    },
    methods: {
      initPage () {
        var app =  GBFL.Cache.get('App')
        this.app=app
        var params={}
        params.pageNo = this.filter.pageNo
        params.pageSize = this.filter.pageSize
        params.app_id=this.app.app_id
        service.getapicategorylistByappid(params,(isOk, data) => {
          console.log(data)
          console.log(isOk)
          this.tableData = data.data
          this.tableDataLength = data.total
        })
      },
      handleSizeChange (val) {
        this.filter.pageSize = val
        console.log(this.filter)
        this.initPage()
      },
      handleCurrentChange (val) {
        this.filter.pageNo = val
        // console.log(this.filter)
        this.initPage()
      },
      showDetail (apiCategory) {
        GBFL.Cache.set('apiCategory', apiCategory)
        this.$router.push('/apicategory/detail')
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


