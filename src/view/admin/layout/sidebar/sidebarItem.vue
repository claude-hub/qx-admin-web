<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in userMenu">
      <el-menu-item v-if="item.children.length===0 " :index="filterPath(item.path,index)" @click="open(item)" :key="item.menu_id">
        <i class="iconfont" :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-else :index="filterPath(item.name,index)" :key="item.name">
        <template slot="title">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title" :class="{'el-menu--display':isCollapse}">{{item.name}}</span>
        </template>
        <template v-for="(child,cindex) in item.children">
          <el-menu-item :index="filterPath(child.path,cindex)" @click="open(child)" v-if="child.children.length==0" :key="cindex">
            <i class="iconfont"  :class="child.icon"></i>
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex" :isCollapse="isCollapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath } from '@/tools/utiltools'
export default {
  name: 'SidebarItem',
  data () {
    return {}
  },
  props: {
    userMenu: {
      type: Array
    },
    isCollapse: {
      type: Boolean
    }
  },
  methods: {
    filterPath (path, index) {
      return path == null ? index + '' : path
    },
    open (item) {
      this.$router.push({
        path: resolveUrlPath(item.path, item.name)
      })
      this.$store.dispatch('SetPageState', {name: item.name, path: item.path})
    }
  }
}
</script>
<style lang="scss" scoped>
  .iconfont {
    font-size: 20px;
  }
</style>
