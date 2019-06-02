<template>
  <div class="left" :class="{'is-active':isCollapse}">
    <div class="sidebar-container">
      <logo :isCollapse="isCollapse"></logo>
      <el-menu
        unique-opened
        mode="vertical"
        :default-active="defaultActive"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#00142a"
        text-color="hsla(0,0%,100%,.65)"
        active-text-color="#409eff">
        <sidebar-item :userMenu="userMenu" :isCollapse="isCollapse"></sidebar-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Logo from './logo'
import { mapGetters } from 'vuex'
import SidebarItem from './sidebarItem'
import { setUrlPath, initMenu } from '../../../../tools/utiltools'

export default {
  name: 'sidebar',
  components: { SidebarItem, Logo },
  created () {
    // if (validatenull(this.userMenu)) {
    //   this.$store.dispatch('GetUserMenu').then(data => {
    //     initMenu(this.$router, data)
    //   })
    // }
    this.$store.dispatch('GetUserInfo')
    this.$store.dispatch('GetUserMenu').then(data => {
      initMenu(this.$router, data)
    })
  },
  computed: {
    ...mapGetters(['userMenu', 'isCollapse']),
    defaultActive: function () {
      return setUrlPath(this.$route)
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 230px;
  }
  .el-menu-vertical {
    border: 0;
  }
</style>
