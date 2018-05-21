<template>
  <div class="infocard">
    <el-card>
      <div slot="header" class="detail-card-header">
          <span>api类新增</span>
      </div>
      <div class="step-container">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
        
      </div>

      <!-- **********************************************第一步**************************************************************** -->
      <div v-if="active == 0" class="add-form">
        <el-form label-width="100px" :model="api_category">
          <el-form-item label="api类名称">
            <el-input v-model="api_category.api_category_name"></el-input>
          </el-form-item>
          <el-form-item label="请求方式">
            <el-radio-group v-model="api_category.api_category_request_type" size="small" style="width: 100%">
              <el-radio label="0" border>GET</el-radio>
              <el-radio label="1" border>POST</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="访问路径">
            <el-input v-model="api_category.api_category_path"></el-input>
          </el-form-item>
          <el-form-item label="记账方式">
            <el-select v-model="api_category.api_category_bill_type" placeholder="请选择" style="width: 100%">
              <el-option label="按访问次数计费" value="0"></el-option>
              <el-option label="按流量计费" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" :rows="3" v-model="api_category.api_category_desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-top: 12px;">返回</el-button>
            <el-button style="margin-top: 12px;" @click="nextStep" type="primary">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 1">
        <div class="demobox">
          <div class="header">Params
            <el-button style="float: right; margin-bottom: 10px;" type="info" @click="testXml">测试</el-button>
          </div>
          <el-input type="textarea" :rows="5" v-model="param_xml"></el-input>
        </div>
        <div class="demobox">
          <div class="header">Body</div>
          <el-input type="textarea" :rows="5" v-model="body_param"></el-input>
        </div>
        <div class="button-div">
          <el-button @click="preStep">上一步</el-button>
          <el-button style="margin-left: 12px;" @click="nextStep" type="primary">下一步</el-button>
        </div>
      </div>
      <div v-if="active == 2">
        <div class="demobox">
          <div class="header">正确信息返回样例</div>
          <el-input type="textarea" :rows="5" v-model="api_category.api_category_normal_response"></el-input>
        </div>
        <div class="demobox">
          <div class="header">错误信息返回样例</div>
          <el-input type="textarea" :rows="5" v-model="api_category.api_category_error_response"></el-input>
        </div>
        <div class="button-div">
          <el-button @click="preStep">上一步</el-button>
          <el-button style="margin-left: 12px;" type="success" @click="addApiCategory">完成</el-button>
        </div>
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
      active: 0,
      api_category: {
        api_category_bill_type: '',
        api_category_desc: '',
        api_category_error_response: '',
        api_category_name: '',
        api_category_normal_response: '',
        api_category_path: '',
        api_category_price: null,
        api_category_request_type: ''
      },
      param_xml: '',
      body_param: '',
    };
  },

  methods: {
    nextStep(){
      this.active = this.active + 1;
    },
    preStep(){
      this.active = this.active - 1;
    },
    testXml(){
      service.testXml({param_xml: this.param_xml},(isOk, data) => {
        if(isOk){
          this.$message({
            type: 'success',
            message: '测试通过',
            showClose: true
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
    addApiCategory(){
      var params = {}
      params.body_param = this.body_param
      params.param_xml = this.param_xml
      params.api_category = this.api_category
      console.log(this.$route)
      console.log(this.$store.state)
      service.addApiCategory(params,(isOk, data) => {
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


