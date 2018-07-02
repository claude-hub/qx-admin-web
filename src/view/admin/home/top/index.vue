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

</script>
<style lang="scss" scoped>
  .top-container{
    position: absolute;
    top: 0;
    height: 64px;
    border-bottom: 1px solid #eee;
    width: 100%;
    padding: 0 10px;
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
