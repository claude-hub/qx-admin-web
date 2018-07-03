<template>
  <div class="pages-container">
    <div class="page-item"
         :class="{'is-active':nowTagValue==item.path}"
         v-for="(item,index) in openedPages" :key="index"
         @click="openCurrentPage(item)"
    >
      <i class="iconfont icon-circle"></i>
      <span>{{item.name}}</span>
      <i class="el-icon-close"
         @click.stop="closePage(item)"
         v-if="openedPages.length>1"></i>
    </div>
  </div>
</template>
<script>
import {setUrlPath, resolveUrlPath} from '@/tools/utiltools'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['openedPages', 'currentPage']),
    nowTagValue: function () {
      return setUrlPath(this.$route)
    }
  },
  methods: {
    openCurrentPage (item) {
      this.$router.push({
        path: resolveUrlPath(item.path, item.name)
      })
      this.$store.dispatch('SetPageState', {name: item.name, path: item.path})
    },
    closePage (item) {
      this.$store.dispatch('ShowPrePage', {name: item.name, path: item.path})
      this.$router.push({
        path: resolveUrlPath(this.currentPage.path, this.currentPage.name)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  $mainBg: #409eff;
  $defaultBg: #eee;
  .pages-container {
    line-height: 40px;
    height: 40px;
    padding: 0 15px;
    font-size: 12px;
    .page-item {
      line-height: 30px;
      display: inline-block;
      border: 1px solid $defaultBg;
      border-radius: 3px;
      cursor: pointer;
      padding: 0 10px;
      margin-right: 6px;
      span {
        margin: 0 8px;
      }
      .icon-circle {
        font-size: 12px;
        color: $defaultBg;
      }
    }
    .is-active{
      border: 1px solid $mainBg !important;
      .icon-circle {
        color: $mainBg;
      }
    }
  }
</style>
