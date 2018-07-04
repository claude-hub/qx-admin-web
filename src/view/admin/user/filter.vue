<template>
  <div class="user-filter">
    <div class="query">
      <el-input
        clearable
        size="small"
        placeholder="用户信息"
        class="query-input"
      ></el-input>
      <el-button
        size="small"
      >搜索</el-button>
    </div>
    <el-button
      size="small"
      type="primary"
    >新增</el-button>
  </div>
</template>
<style lang="scss" scoped>
  .user-filter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .query-input{
      width: 150px;
      margin-right: 6px
    }
  }
</style>
