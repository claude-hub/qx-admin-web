<template>
  <div class="container animated" :class="{'zoomOutUp': isLock}">
    <Sidebar class="left"></Sidebar>
    <div class="right">
      <Top></Top>
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar'
import Top from './top'

export default {
  name: 'adminindex',
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
    justify-content: start;
    .left {
      width: 230px;
      overflow-y: auto;
    }
  }
</style>
