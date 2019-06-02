<template>
  <el-container class="container">
    <el-aside class="aside" :class="{'is-active':isCollapse}" width="230px">
      <sidebar></sidebar>
    </el-aside>
    <el-container>
      <el-header style="height: 108px; padding: 0">
        <top></top>
      </el-header>
      <el-main>
        <div class="page">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
  .container {
    height: 100%;
    .aside {
      background-color: #00142a;
    }
    .el-main {
      background: #f1f4f5;
      height: 100%;
      padding: 15px;
      .page {
        background: #fff;
        min-height: 100%;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
</style>

<script>

import Sidebar from './sidebar/index'
import Top from './top/index'
import { mapGetters } from 'vuex'
import './index.scss'

export default {
  components: {
    Sidebar,
    Top
  },
  computed: {
    ...mapGetters(['isCollapse'])
  }
}
</script>
