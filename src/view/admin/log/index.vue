<template>
  <div class="content">
    <div class="filter">
      <div class="query">
        <el-input
          clearable
          v-model="query"
          placeholder="日志信息"
          class="query-input"
          style="width: 150px"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <el-button
          @click="handleSearch"
        >搜索
        </el-button>
      </div>
      <div>
        <el-button icon="el-icon-refresh" circle @click="reloadData"></el-button>
      </div>
    </div>
    <el-table
      :data="tableData.data"
      v-loading=loading
      :header-row-style="headerRowStyle"
      :header-cell-style="headerCellStyle"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        width="50"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="createBy"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operate"
        width="120"
        label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button size="mini" icon="el-icon-delete" circle type="danger" plain @click="deleteItem(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="text-align: right;margin-top: 20px;color: #606266"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1,2, 5, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.totalCount">
    </el-pagination>
  </div>
</template>
<script>
  import { Msg } from '@/tools/message'
  import { mapGetters } from 'vuex'
  import { LogApi } from '@/api/log'

  export default {
    name: 'logmanage',
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
        },
        currentPage: 1,
        pageSize: 5,
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
        LogApi.logs(params).then((res) => {
          this.loading = false
          this.tableData = res.data
        }).catch((err) => {
          // Msg.error('请求数据失败!')
          this.loading = false
        })
      },
      handleSearch () {
        this.loadData()
      },
      reloadData () {
        this.loadData()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.loadData()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loadData()
      },
      deleteItem (id) {
        this.$confirm('此操作将删除该角色, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: id
          }
          LogApi.delLog(params).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.loadData()
          })
        })
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
