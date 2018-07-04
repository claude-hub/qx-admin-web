<template>
  <div class="user-body">
    <comp-filter></comp-filter>
    <comp-table
      :userList="userList"
      :loading= "loading"
    ></comp-table>
  </div>
</template>
<script>
import CompTable from './table'
import CompFilter from './filter'
import {UserApi} from '@/api/user'
import {Msg} from '@/tools/message'

export default {
  name: 'usermanage',
  data () {
    return {
      userList: [],
      loading: false
    }
  },
  components: {
    CompTable,
    CompFilter
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.loading = true
      UserApi.getUserList().then((res) => {
        console.log(res.data.data)
        this.loading = false
        this.userList = res.data.data
      }).catch((err) => {
        console.log(err)
        Msg.error('请求失败!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-body{
    padding: 30px;
  }
</style>
