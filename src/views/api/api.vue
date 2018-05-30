<template>
  <div class="infocard">
    <el-card>
      <div slot="header" class="detail-card-header">
        <span>api新增</span>
      </div>
      <div class="step-container">
        <el-steps :active="active" finish-status="success">
          <el-step title="填写API基础信息"></el-step>
          <el-step title="填写API详细信息"></el-step>
          <el-step title="填写API参数信息"></el-step>
          <el-step title="填写API返回信息"></el-step>
        </el-steps>

      </div>

      <!-- **********************************************第一步**************************************************************** -->
      <div v-if="active == 0" class="add-form">
        <el-form :model="api" label-width="100px">
          <el-form-item label="API名称">
            <el-input v-model="api.api_name"></el-input>
          </el-form-item>
<br/>
          <el-form-item label="API描述" style="width:100%">
            <el-input type="textarea" v-model="api.api_description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-top: 12px;" @click="nextStep" type="primary">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--***********************************************第二步******************************************************* -->
      <div v-if="active == 1" class="add-form">
        <el-form :model="api" label-width="100px">
          <el-form-item label="URL">
            <el-input v-model="api.api_url" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="请求方式">
            <el-select v-model="api.api_method" style="width:100%">
              <el-option label="POST" value=0></el-option>
              <el-option label="GET" value=1></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测试接口">
            <el-input v-model="api.api_test_interface" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="记账方式">
            <el-select v-model="api.api_bill_type" style="width:100%">
              <el-option label="按照次数" value=0></el-option>
              <el-option label="按照流量" value=1></el-option>
            </el-select>
          </el-form-item>


          <br>
          <el-form-item label="Api价格" style="width:100%">
            <el-input v-model="api_price.price" placeholder="元"></el-input>
          </el-form-item>
          <el-form-item label="配额" style="width:100%">
            <el-input v-model="api_price.content" placeholder="次"></el-input>
          </el-form-item>
          <el-form-item label="超时时间" style="width:100%">
            <el-input v-model="api.api_timeout" placeholder="毫秒"></el-input>
          </el-form-item>

          <el-form-item label="最大访问量" style="width:100%">
            <el-input v-model="api.api_max_in" placeholder="次/秒"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="preStep">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="nextStep" type="primary">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>


      <div v-if="active == 2">
        <div class="demobox">
          <div class="header">ApiParamXml
            <el-button style="float: right; margin-bottom: 10px;" type="info" @click="testXml">测试</el-button>
          </div>
          <el-input type="textarea" :rows="5" v-model="api.api_param_xml"></el-input>
        </div>
        <div class="demobox">
          <div class="header">请求体</div>
          <el-select v-model="api.api_request_contenttype" >
            <el-option label="application/json" value='application/json'></el-option>
            <el-option label="application/xml" value='application/xml'></el-option>
            <el-option label="text/plain" value='text/plain'></el-option>
            <el-option label="html" value='html'></el-option>
          </el-select>
          <el-input type="textarea" :rows="5" v-model="api.api_request_body"></el-input>
        </div>
        <div class="button-div">
          <el-button @click="preStep">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="nextStep" type="primary">下一步</el-button>
        </div>
      </div>
      <div v-if="active == 3">
        <div class="demobox">
          API返回格式
          <el-select v-model="api.api_return_pattern">
            <el-option label="application/json" value=0></el-option>
            <el-option label="text/xml" value=1></el-option>
            <el-option label="multipart/form-data" value=2></el-option>
            <el-option label="application/x-www-form-urlencoded" value=3></el-option>
          </el-select>
        </div>
        <div class="demobox">
          <div class="header">正常返回信息</div>
          <el-input type="textarea" :rows="5" v-model="api.api_normal_return_demo"></el-input>
        </div>
        <div class="demobox">
          <div class="header">异常返回信息</div>
          <el-input type="textarea" :rows="5" v-model="api.api_error_return_demo"></el-input>
        </div>
        <div class="button-div">
          <el-button @click="preStep">上一步</el-button>
          <el-button style="margin-left: 12px;" type="success" @click="addApi">完成</el-button>
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
        api: {
          api_name: '',
          api_bill_type: 0,
          api_description: '',
          api_error_return_demo: '',
          api_max_in: 0,
          api_method: 0,
          api_timeout: 0,
          api_normal_return_demo: '',
          api_test_interface: '',
          api_param_xml: '',
          api_return_pattern: '',
          api_url: '',
          sp_id: 'c430c9776a934ff1a856360185920c5d',
          api_request_body:'',
          api_request_contenttype:''
        },

        api_price: {
          price:0,
          content: 0
        }
      };
    },

    methods: {
      nextStep() {
        this.active = this.active + 1;
      },
      preStep() {
        this.active = this.active - 1;
      },
      testXml() {
        service.sptestXml({param_xml: this.api.api_param_xml}, (isOk, data) => {
          if (isOk) {
            this.$message({
              type: 'success',
              message: '测试通过',
              showClose: true
            })
          } else {
            this.$message({
              type: 'warning',
              message: data.message,
              showClose: true
            })
          }
        })
      },
      addApi() {
        var params = {}
        params.api = this.api
        params.api_price = this.api_price

        console.log(this.$route)
        console.log(this.$store.state)
        service.addapi(params, (isOk, data) => {
          if (isOk) {
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
          } else {
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
  .step-container {
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

  .infocard {
    box-shadow: none;
    margin-top: 12px;
  }

  .add-form {
    width: 30%;
    margin: 0 30%;
  }

  .button-div {
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

  .paramsbox .addparambtn {
    color: #bfcbd9;
    border: 0;
  }

  .paramsbox .addparambtn :hover {
    color: #20A0FF;
  }

  .paramsbox div {
    margin-bottom: 5px
  }

  .demobox {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .demobox .header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
  }
</style>


