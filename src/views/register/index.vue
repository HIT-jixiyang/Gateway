<template>
  <div class="register-container">
    <div class="register-form">
      <div class="title-container">
        <h3 class="title">{{'注册界面'}}</h3>
      </div>
      <el-form ref="form" :model="form" label-width="105px">
        <el-form-item label="提供商名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="法人代表名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 20px">
        <el-radio v-model="type" label="1" border>提供商</el-radio>
        <el-radio v-model="type" label="2" border>消费者</el-radio>
        <el-button style="width: 47%; float: right;" type="primary">{{'注册'}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      type: '2',
      sp: {},
      consumer: {

      },
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
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


