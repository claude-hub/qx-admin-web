<template>
  <div class="content">
    <el-table
      :data="tableData.data"
      v-loading=loading
      :header-row-style="headerRowStyle"
      :header-cell-style="headerCellStyle"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="tableName"
        label="表名">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="engine"
        label="engine">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operate"
        width="120"
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary"
              plain @click="codeGen(scope.row.tableName)"
            >生成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { Msg } from '@/tools/message'
  import { mapGetters } from 'vuex'
  import { GenApi } from '@/api/gen'

  export default {
    name: 'gencode',
    created () {
      this.sys_user_add = this.permissions.includes('sys_user_add')
      this.sys_user_edit = this.permissions.includes('sys_user_edit')
      this.sys_user_del = this.permissions.includes('sys_user_del')
      this.loadData()
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    data () {
      return{
        query: '',
        tableData: {},
        loading: false,
        headerRowStyle: {
          color: '#909399'
        },
        headerCellStyle: {
          backgroundColor: '#d7d7d7'
        }
      }
    },
    methods: {
      loadData () {
        this.loading = true
        let params = {
          query: this.query,
          page: this.currentPage,
          pageSize: this.pageSize
        }
        GenApi.getTables(params).then((res) => {
          this.loading = false
          this.tableData = res.data
        }).catch((err) => {
          // Msg.error('请求数据失败!')
          this.loading = false
        })
      },
      reloadData () {
        this.loadData()
      },
      codeGen (tableName) {
        GenApi.codeGen(0, tableName)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 30px;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .query {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .dept-tree {
        margin-right: 6px;
        font-size: 13px;
        color: #909399;
      }
    }
    .query-input {
      width: 150px;
      margin-right: 6px;
    }
  }
</style>
