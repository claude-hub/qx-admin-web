<template>
  <div class="sidebar-container" :class="{'is-active':isCollapse}">
    <logo :isCollapse="isCollapse"></logo>
    <el-menu unique-opened :default-active="nowTagValue" mode="vertical"
             :show-timeout="200" background-color="#00142a"
             text-color="hsla(0,0%,100%,.65)"
             active-text-color="#409eff"
             :collapse="isCollapse">
      <sidebar-item :userMenu="userMenu" :isCollapse="isCollapse"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import {setUrlPath, initMenu} from '@/tools/utiltools'
import SidebarItem from './sidebarItem'
import Logo from './logo'
// import {validatenull} from '@/tools/validate'
import {mapGetters} from 'vuex'
import './sidebar.scss'

export default {
  name: 'sidebar',
  components: {SidebarItem, Logo},
  created () {
    // if (validatenull(this.userMenu)) {
    //   this.$store.dispatch('GetUserMenu').then(data => {
    //     initMenu(this.$router, data)
    //   })
    // }
    this.$store.dispatch('GetUserMenu').then(data => {
      initMenu(this.$router, data)
    })
  },
  computed: {
    ...mapGetters(['userMenu', 'isCollapse']),
    nowTagValue: function () {
      return setUrlPath(this.$route)
    }
  }
}
</script>
<style lang="scss" scoped>
  .sidebar-container {
    background: #00142a;
    height: 100%;
    .el-menu{
      border: 0;
    }
  }
</style>
