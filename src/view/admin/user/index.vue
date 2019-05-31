<template>
  <div class="user-body">
    <comp-table/>
  </div>
</template>
<script>
import CompTable from './table'

export default {
  name: 'usermanage',
  components: {
    CompTable
  }
}
</script>

<style lang="scss" scoped>
  .user-body{
    padding: 30px;
  }
</style>
