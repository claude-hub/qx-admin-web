<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off"
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
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input size="small" @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="loginForm.code"
                    auto-complete="off" placeholder="请输入验证码">
            <i slot="prefix" class="iconfont icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <!--<span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{code.value}}</span>-->
            <!--<img :src="code.src" class="login-code-img" @click="refreshCode" v-else/>-->
            <img src="http://preview.pig4cloud.com/admin/code/93011530014758010"/>
          </div>
        </el-col>
      </el-row>

    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {isvalidUsername} from '@/util/validate'
import {randomLenNum} from '@/util/utiltools'

export default {
  name: 'userlogin',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        redomStr: ''
      },
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        username: [
          {required: true, trigger: 'blur', validator: validateUsername}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码长度最少为6位', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur'},
          {required: true, trigger: 'blur', validator: validateCode}
        ]
      },
      passwordType: 'password'
    }
  },
  created () {
    this.refreshCode()
  },
  mounted () {
  },
  computed: {},
  props: [],
  methods: {
    refreshCode () {
      this.loginForm.redomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}/${this.loginForm.redomStr}`)
      this.loginForm.code = this.code.value
    },
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm).then(res => {
            this.$router.push({path: this.tagWel.value})
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
