<template>
  <div class="login">
    <div class="login-container" @keyup.enter.native="handleLogin">
      <div class="login-info text-white animated fadeInLeft">
        <h2 class="login-info-title">千寻---快速开发脚手架---后台登录</h2>
        <ul class="login-info-list">
          <li class="login-info-item">
            <i class="el-icon-check"></i>&nbsp;是一个基于Spring Boot、spring security开发基于Vue前后分离的开发平台
          </li>
          <li class="login-info-item">
            <i class="el-icon-check"></i>&nbsp;是一个基于vue+vuex+vue-router快速后台管理系统，采用token交互验证方式。
          </li>
          <li class="login-info-item">
            <i class="el-icon-check"></i>&nbsp;最大程度上帮助企业节省时间成本和费用开支。
          </li>
          <li class="login-info-item">
            <i class="el-icon-check"></i>&nbsp;当前版本：v1.0.0
          </li>
        </ul>
      </div>
      <div class="login-border  animated fadeInRight">
        <div class="login-main">
          <h4 class="login-title">
            <span>千寻-后台登录</span>
          </h4>
          <el-tabs v-model="activeName">
            <el-tab-pane label="账号密码" name="user">
              <userLogin></userLogin>
            </el-tab-pane>
            <el-tab-pane label="短信验证码" name="code">
              <codeLogin></codeLogin>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from './userlogin'
import codeLogin from './codelogin'

export default {
  name: 'login',
  data () {
    return {
      activeName: 'user'
    }
  },
  components: {
    userLogin,
    codeLogin
  }
}
</script>

<style lang="scss">
  .login {
    z-index: -999;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/images/login.png");
    background-size: cover;
    .login-container {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: rgba(0, 0, 0, 0.3);
      height: 100%;
      position: relative;
      .login-info {
        padding-left: 60px;
        .login-info-title {
          line-height: 90px;
        }
      }
      .login-border {
        width: 270px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 30px 40px 25px 40px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 1px 1px 2px #eee;
        .login-main {
          border-radius: 3px;
          box-sizing: border-box;
          background-color: #fff;
          .login-title {
            margin: 0 0 20px;
            text-align: center;
            color: #409eff;
            letter-spacing: 3px;
          }
        }
      }
    }
  }

  .login-info-list {
    list-style: none;
    padding: 0;
    .login-info-item {
      font-size: 14px;
    }
  }

  .login-form {
    .el-form-item {
      margin-bottom: 12px;
    }
    .el-form-item__error{
      padding: 0px;
    }
    .login-submit {
      margin-top: 20px;
      width: 100%;
      border-radius: 4px;
    }
    .login-code {
      display: flex;
      justify-content: space-between;
      margin-left: 15px;
      cursor: pointer;
    }
  }
</style>
