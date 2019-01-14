<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="loginStr">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.loginStr" auto-complete="off"
                placeholder="用户名 | 邮箱 | 手机号">
        <i slot="prefix" class="iconfont icon-user"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password"
                auto-complete="off" placeholder="密码">
        <i class="iconfont icon-eye" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="iconfont icon-password"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-row :span="24">
        <el-col :span="12">
          <el-input
            size="small"
            @keyup.enter.native="handleLogin"
            :maxlength="code.len"
            v-model="loginForm.captcha"
            auto-complete="off" placeholder="请输入验证码">
            <i slot="prefix" class="iconfont icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="login-code">
            <img :src="code.src" @click="refreshCode"/>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-checkbox v-model="loginForm.remember">记住账号</el-checkbox>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum } from '@/tools/utiltools'
import {mapGetters} from 'vuex'
import {Msg} from '@/tools/message'

export default {
  name: 'userlogin',
  data () {
    return {
      loginForm: {
        loginStr: 'admin',
        password: '123456',
        captcha: '',
        remember: false
      },
      code: {
        src: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        loginStr: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码长度最少为6位', trigger: 'blur'}
        ],
        captcha: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur'}
        ]
      },
      passwordType: 'password'
    }
  },
  created () {
    this.refreshCode()
  },
  computed: {
    ...mapGetters(['defaultHomePage'])
  },
  methods: {
    refreshCode () {
      let randomStr = randomLenNum(this.code.len, true)
      this.code.src = `${process.env.BASE_API}/api/admin/tool/captcha?randomStr=${randomStr}`
    },
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.$store.dispatch('SetPageState', this.defaultHomePage)
            this.$router.push({path: this.defaultHomePage.path})
          }).catch(err => {
            console.log(err)
            Msg.error('验证码错误')
            this.refreshCode()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-eye {
    cursor: pointer;
  }
</style>
