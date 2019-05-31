<template>
  <div class="container animated" :class="{'zoomOutUp': isLock}">
    <Sidebar class="left"></Sidebar>
    <div class="right">
      <Top></Top>
      <div class="body-container">
        <div class="page">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar/index'
import Top from './top/index'

export default {
  components: {
    Sidebar,
    Top
  },
  data () {
    return {
      isLock: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    height: 100%;
    background: #fff;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    .left {
      width: 230px;
    }
    .right{
      width: 100%;
      overflow: hidden;
      position:  relative;
      .body-container{
        margin-top: 104px;
        padding: 15px;
        height: 100%;
        background: #f1f4f5;
        .page{
          height: 100%;
          background-color: #fff;
        }
      }
    }
  }
</style>
