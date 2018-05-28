<template>
  <section class="allsection">
    <el-card class="infocard">
      <div slot="header" class="detail-card-header">
        <span>编辑信息</span>
      </div>
      <div>
        <el-form :model="app">
          <el-form-item label="App名称">
            <el-input v-model="app.app_name" ></el-input>
          </el-form-item>
          <el-form-item label="AppID">
            <el-input v-model="app.app_id"></el-input>
          </el-form-item>
          <el-form-item label="AppSecret">
            <el-input v-model="app.app_secret"></el-input>
          </el-form-item>
          <el-form-item label="App描述">
            <el-input v-model="app.app_description"></el-input>
          </el-form-item>
        </el-form>


      </div>
      <div class="button-div">

        <el-button style="margin-left: 12px;" type="success" @click="update">更新</el-button>
      </div>
    </el-card>
  </section>
</template>
<script>
  import BizService from '../../services/biz-service.js'
  var service = new BizService()
  export default {
    data () {
      return {
        app:{
          app_name:'',
          app_id:'',
          app_secret:'',
          app_description:''
        }

      }
    },
    created () {
      this.initPage()
    },
    methods: {
      initPage () {
        var app =  GBFL.Cache.get('App')
        this.app = app
      },
      update(){
        var params={}
        params.app_id=this.app.app_id
        params.app_name=this.app.app_name
        params.app_description=this.app.app_description
        params.consumer_id= '87de254182574856af64d323869b686d'
        service.editApp(params,(isOk, data) => {
          if(isOk){
            this.$message({
              type: 'success',
              message: '更新成功',
              showClose: true
            })
            var view = {
              path: this.$route.path,
              name: this.$route.name
            }
            this.$store.dispatch('delVisitedViews', view).then((views) => {
              if (this.isActive(view)) {
                const latestView = views.slice(-1)[0]
                if (latestView) {
                  this.$router.push(latestView.path)
                } else {
                  this.$router.push('/')
                }
              }
            })
          }else{
            this.$message({
              type: 'warning',
              message: data.message,
              showClose: true
            })
          }
      })
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
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


