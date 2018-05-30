<template>
  <div class="register-container">
    <div class="register-form">
      <div class="title-container">
        <h3 class="title">{{'注册界面'}}</h3>
      </div>
      <el-form v-if="type =='1'"ref="sp_form" :model="sp_form" label-width="105px">
        <el-form-item label="提供商名字">
          <el-input v-model="sp_form.sp_name"></el-input>
        </el-form-item>
        <el-form-item label="提供商身份证号">
          <el-input v-model="sp_form.sp_org_id"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="sp_form.sp_tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="sp_form.sp_email"></el-input>
        </el-form-item>
        <el-form-item label="法人代表名称">
          <el-input v-model="sp_form.sp_representative"></el-input>
        </el-form-item>
        <el-form-item label="法人代表身份证号">
          <el-input v-model="sp_form.sp_representative_id"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="sp_form.sp_password"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="sp_form.sp_description"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button-div">
            <el-button style="margin-left: 12px;" type="success" @click="spRegister">完成</el-button>
          </div>
        </el-form-item>
      </el-form>

      <el-form v-if="type =='2'"ref="consumer_form" :model="consumer_form" label-width="105px">
        <el-form-item label="消费者名字">
          <el-input v-model="consumer_form.consumer_name"></el-input>
        </el-form-item>
        <el-form-item label="消费者身份证号">
          <el-input v-model="consumer_form.consumer_card_id"></el-input>
        </el-form-item>
        <el-form-item label="消费者类型">
          <el-select v-model="consumer_form.consumer_type" style="width:100%">
            <el-option label="内部用户" value=0></el-option>
            <el-option label="外部用户" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="consumer_form.consumer_tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="consumer_form.consumer_email"></el-input>
        </el-form-item>
        <el-form-item label="自我介绍">
          <el-input v-model="consumer_form.consumer_intro"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="consumer_password"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button-div">
            <el-button style="margin-left: 12px;" type="success" @click="consumerRegister">完成</el-button>
          </div>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script>
  import BizService from '../../services/biz-service.js'

  var service = new BizService()
  export default {
    data(){
      return{
        type: '1',
        consumer_form: {
          consumer_name:'',
          consumer_password:'',
          consumer_email:'',
          consumer_tel:'',
          consumer_type:0,
          consumer_intro:'',
          consumer_card_id:''
        },
        sp_form: {
          sp_org_id:'',
          sp_description:'',
          sp_tel:'',
          sp_representative:'',
          sp_email:'',
          sp_name:'',
          sp_password:'',
          sp_representative_id:''
        }
      }
    },
    methods:{
      consumerRegister(){
        var params={}
        params.consumer_name=this.consumer_form.consumer_name
        params.consumer_password=this.consumer_form.consumer_password
        params.consumer_email=this.consumer_form.consumer_email
        params.consumer_tel=this.consumer_form.consumer_tel
        params.consumer_type=this.consumer_form.consumer_type
        params.consumer_intro=this.consumer_form.consumer_intro
        params.consumer_card_id=this.consumer_form.consumer_card_id
        console.log(this.$route)

        console.log(this.$store.state)
        service.consumerRegister(params, (isOk, data) => {
          if (isOk) {
            this.$message({
              type: 'success',
              message: '注册成功',
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
      spRegister() {
        var params = {}
        params.sp_org_id=this.sp_form.sp_org_id
        params.sp_description=this.sp_form.sp_description
        params.sp_tel=this.sp_form.sp_tel
        params.sp_representative=this.sp_form.sp_representative
        params.sp_representative_id=this.sp_form.sp_representative_id
        params.sp_email=this.sp_form.sp_email
        params.sp_name=this.sp_form.sp_name
        params.sp_password=this.sp_form.sp_password

        console.log(this.$route)
        console.log(this.$store.state)
        service.spRegister(params, (isOk, data) => {
          if (isOk) {
            this.$message({
              type: 'success',
              message: '注册成功',
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
<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .register-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .button-div {
      width: 57%;
      margin-left: 43%;
      margin-bottom: 20px;
    }
    .el-select {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      .el-input__suffix {
        right: -61px;
      }
    }
    .el-radio {
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .register-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .register-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      // padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
  }
</style>


