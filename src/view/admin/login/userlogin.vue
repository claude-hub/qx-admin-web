<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="loginStr">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.loginStr" auto-complete="off"
                placeholder="用户名 | 邮箱 | 手机号">
        <i slot="prefix" class="iconfont iconuser"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password"
                auto-complete="off" placeholder="密码">
        <i class="iconfont iconeye" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="iconfont iconpassword"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <el-row :span="24">
        <el-col :span="12">
          <el-input
            @keyup.enter.native="handleLogin"
            :maxlength="code.len"
            v-model="loginForm.captcha"
            auto-complete="off" placeholder="请输入验证码">
            <i slot="prefix" class="iconfont iconyanzhengma"></i>
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
      <el-button type="primary" :loading="loading" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum } from '@/tools/utiltools'
import { mapGetters } from 'vuex'
import { Msg } from '@/tools/message'

export default {
  name: 'userlogin',
  data () {
    return {
      loginForm: {
        loginStr: '15223246130',
        password: '123456',
        captcha: '',
        randomStr: '',
        remember: false
      },
      code: {
        src: '',
        len: 4,
        type: 'text'
      },
      loading: false,
      loginRules: {
        loginStr: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
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
      this.loginForm.randomStr = randomLenNum(this.code.len, true)
      this.code.src = `${window.location.origin}/captcha?randomStr=${this.loginForm.randomStr}`
    },
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$store.dispatch('SetPageState', this.defaultHomePage)
            this.$router.push({ path: this.defaultHomePage.path })
          }).catch(err => {
            this.loading = false
            Msg.error(err.response.data.message)
            this.refreshCode()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .iconeye {
    cursor: pointer;
  }
</style>
