<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="mobile">
      <el-input size="small" v-model="loginForm.mobile" auto-complete="off" placeholder="手机号码">
        <i slot="prefix" class="iconfont icon-shouji"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input size="small" v-model="loginForm.code" auto-complete="off" placeholder="验证码">
            <!--<template slot="append">-->
            <!--<span class="msg-text">发送验证码</span>-->
            <!--</template>-->
            <i slot="prefix" class="iconfont icon-yanzhengma" style="margin-top:10px;"></i>
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="msg-text">发送验证码</div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {isvalidatemobile} from '@/util/validate'
import {mapGetters} from 'vuex'

export default {
  name: 'codelogin',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('请输入4位数的验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [{required: true, trigger: 'blur', validator: validatePhone}],
        code: [{required: true, trigger: 'blur', validator: validateCode}]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['tagWel'])
  },
  props: [],
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('LoginByPhone', this.loginForm)
            .then(response => {
              this.$store.commit('ADD_TAG', this.tagWel)
              this.$router.push({path: this.tagWel.value})
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .msg-text {
    background-color: #f5f7fa;
    color: #909399;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    height: 32px;
    margin-top: 5px;
    line-height: 32px;
  }

  .msg-text.display {
    color: #ccc;
  }
</style>
