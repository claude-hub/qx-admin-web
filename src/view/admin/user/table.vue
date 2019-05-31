<template>
  <div>
    <div class="user-filter">
      <div class="query">
        <el-input
          clearable
          v-model="query"
          size="small"
          placeholder="用户信息"
          class="query-input"
          @keyup.enter.native="handleSearch"
        ></el-input>
        <el-button
          size="small"
          @click="handleSearch"
        >搜索
        </el-button>
      </div>
      <el-button
        size="small"
        type="primary"
        @click="openDialog('','add')"
      >新增
      </el-button>
    </div>
    <el-table
      :data="tableData.data"
      size="small"
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
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="deptId"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        width="100"
        label="电话号码">
      </el-table-column>
      <el-table-column
        prop="email"
        width="150"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        width="140"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="signInCount"
        align="center"
        label="登录次数">
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-button disabled size="mini" type="success" plain v-if="scope.row.status == null">正常</el-button>
          <el-button disabled size="mini" type="danger" plain v-else>冻结</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="operate"
        width="120"
        label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button
              size="mini"
              icon="el-icon-edit"
              circle type="primary"
              plain
              @click="openDialog(scope.row,'edit')"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="冻结" placement="top">
            <el-button size="mini" icon="el-icon-delete" circle type="danger" plain></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right;margin-top: 20px;color: #606266"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1,2, 5, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.totalCount">
    </el-pagination>
    <comp-dialog ref="compDialog" :dialogInfo="dialogInfo"></comp-dialog>
  </div>
</template>

<script>
import CompDialog from './dialog'
import { UserApi } from '@/api/user'
import { Msg } from '@/tools/message'

export default {
  data () {
    return {
      query: '',
      headerRowStyle: {
        color: '#909399'
      },
      headerCellStyle: {
        backgroundColor: '#d7d7d7'
      },
      dialogInfo: {
        dialogTitle: '',
        userItem: {}
      },
      loading: false,
      tableData: {},
      currentPage: 1,
      pageSize: 1
    }
  },
  // props: {
  //   tableData: {
  //     type: Object
  //   },
  //   loading: {
  //     type: Boolean
  //   }
  // },
  components: {
    CompDialog
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.loading = true
      let params = {
        query: this.query,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      UserApi.getUserList(params).then((res) => {
        this.loading = false
        this.tableData = res.data
      }).catch((err) => {
        console.log(err)
        Msg.error('请求失败!')
        this.loading = false
      })
    },
    openDialog (row, type) {
      if (type === 'edit') {
        this.dialogInfo.dialogTitle = '修改用户信息'
        this.dialogInfo.userItem = row
        this.$nextTick(() => {
          this.$refs.compDialog.openDialog()
        })
      }
      if (type === 'add') {
        this.dialogInfo.dialogTitle = '新增'
        this.dialogInfo.userItem = {}
        this.$nextTick(() => {
          this.$refs.compDialog.openDialog()
        })
      }
    },
    handleSearch () {
      this.loadData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-filter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .query-input {
      width: 150px;
      margin-right: 6px
    }
  }
</style>
