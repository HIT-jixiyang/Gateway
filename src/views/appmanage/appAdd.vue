<template>
  <div class="infocard">
    <el-card>
      <div slot="header" class="detail-card-header">
        <span>App新增</span>
      </div>



      <div class="add-form">
        <el-form label-width="100px" :model="app">
          <el-form-item label="App名称">
            <el-input v-model="app.app_name"></el-input>
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

          <el-button style="margin-left: 12px;" type="success" @click="addApp">完成</el-button>
        </div>

    </el-card>
  </div>
</template>
<script>
  import BizService from '../../services/biz-service.js'
  var service = new BizService()
  export default {
    data() {
      return {
       app:{
         app_name:'',
         app_id:'',
         app_secret:'',
         app_description:''
       }


      };
    },

    methods: {
      addApp(){
        var params = {}
        params.app_name=this.app.app_name
        params.app_description=this.app.app_description
        params.consumer_id= '87de254182574856af64d323869b686d'
        console.log(this.$route)
        console.log(this.$store.state)
        service.addApp(params,(isOk, data) => {
          if(isOk){
            this.$message({
              type: 'success',
              message: '新增成功',
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
    }
  }
</script>
<style scope>
  .step-container{
    width: 80%;
    margin: 50px auto;
  }
  .infocard .el-card__body {
    padding: 0;
  }
  .infocard .el-card__header div .el-button {
    padding: 3px 10px;
    float: right;
  }
  .infocard .el-card .el-card__header {
    padding: 10px 20px;
    background-color: #EEF1F6;
    color: black;
    border-left: 3px solid #475669;
  }
  .infocard{
    box-shadow:none;
    margin-top:12px;
  }
  .add-form{
    width: 30%;
    margin: 0 30%;
  }
  .button-div{
    width: 57%;
    margin-left: 43%;
    margin-bottom: 20px;
  }
  .paramsbox {
    width: 80%;
    margin: 0 auto;
    border-top: 1px solid #D1DBE5;
    padding-top: 10px;
    padding-bottom: 20px;
    min-height: 75px;
  }
  .paramsbox .addparambtn{
    color:#bfcbd9;
    border: 0;
  }
  .paramsbox .addparambtn :hover{
    color: #20A0FF;
  }
  .paramsbox div{
    margin-bottom:5px
  }
  .demobox{
    width: 80%;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .demobox .header{
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
  }
</style>


