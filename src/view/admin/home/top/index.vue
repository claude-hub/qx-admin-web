<template>
  <div class="top-container">
    <div>
      <div class="tags-breadcrumb">
        <i class="iconfont icon-daohang" :class="[{ 'tag-collapse_right': isCollapse }]" @click="showCollapse"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isFullScreen', 'isCollapse'])
  },
  methods: {
    showCollapse () {
      this.$store.commit('SET_COLLAPSE')
    }
  }
}
</script>
<style lang="scss" scoped>
  .top-container{
    position: fixed;
    top: 0;
    width: calc(100% - 230px);
    height: 64px;
    border-bottom: 1px solid #eee;
    padding-left: 10px;
    .tags-breadcrumb{
      cursor: pointer;
      .icon-daohang{
        padding: 0 16px;
        font-size: 32px;
        color: #595959;
      }
    }
  }
</style>
