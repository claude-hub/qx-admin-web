<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in userMenu">
      <!--没有子菜单的项-->
      <el-menu-item
        v-if="item.children===undefined || item.children.length===0"
        :index="filterPath(item.path,index)"
        @click="open(item)"
        :key="index">
        <i class="iconfont" :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <!--有子菜单的项-->
      <el-submenu v-else :index="filterPath(item.name,index)" :key="item.name">
        <template slot="title">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title" :class="{'el-menu--display':isCollapse}">{{item.name}}</span>
        </template>
        <template v-for="(child,cIndex) in item.children">
          <el-menu-item
            :index="filterPath(child.path,cIndex)"
            @click="open(child)"
            v-if="child.children===undefined || child.children.length===0"
            :key="cIndex">
            <i class="iconfont"  :class="child.icon"></i>
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cIndex" :isCollapse="isCollapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath } from '../../../../tools/utiltools'
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
      this.$store.dispatch('SetPageState', { name: item.name, path: item.path })
    }
  }
}
</script>
<style lang="scss" scoped>
  .iconfont {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 16px;
    vertical-align: middle;
  }
</style>
