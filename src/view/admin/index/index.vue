<template>
  <div>后台首页</div>
</template>

<script>
// import {IndexApi} from './api'
// import {Msg} from '@/tools/message'
import {store} from '@/store'

export default {
  name: 'adminindex',
  data () {
    return {
      menus: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      const {userMenu, userInfo} = store.getters
      console.log(userMenu)
      console.log(userInfo)
      // IndexApi.menus().then((res) => {
      //   console.log(res)
      //   this.menus = res.data.data
      // }).catch(() => {
      //   Msg.error('此账号无权限!')
      // })
    }
  }
}
</script>

<style>
</style>
