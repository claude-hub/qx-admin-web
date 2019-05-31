<template>
  <div>
    <div class="user-filter">
      <div class="query">
        <el-input
          clearable
          v-model="query"
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
        v-if="sys_user_add"
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
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
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
    <el-dialog
      :title="dialogInfo.dialogTitle"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="重置密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入重置的密码"></el-input>
        </el-form-item>

        <el-dialog
          width="30%"
          title="请选择"
          :visible.sync="innerVisible"
          append-to-body>
          <el-input
            placeholder="输入关键字进行过滤"
            style="margin-bottom: 20px"
            v-model="filterText">
          </el-input>
          <el-tree
            style="margin-bottom: 30px"
            class="filter-tree"
            :data="deptTree"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="selectDept"
            ref="tree">
          </el-tree>
        </el-dialog>

        <el-form-item label="所属部门" prop="deptName">
          <el-input
            @focus="showDeptTree"
            v-model="ruleForm.deptName"
            placeholder="请选择所属部门"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { UserApi } from '@/api/user'
import { DeptApi } from '@/api/dept'
import { Msg } from '@/tools/message'
import { mapGetters } from 'vuex'

export default {
  created () {
    this.sys_user_add = this.permissions.includes('sys_user_add')
    this.sys_user_edit = this.permissions.includes('sys_user_edit')
    this.sys_user_del = this.permissions.includes('sys_user_del')
  },
  computed: {
    ...mapGetters(['permissions'])
  },
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
      pageSize: 1,
      dialogVisible: false,
      innerVisible: false,
      ruleForm: {
        userName: '',
        password: '',
        deptId: '',
        deptName: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      },

      filterText: '',
      deptTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
    this.loadData()
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
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
      UserApi.getUserList(params).then((res) => {
        this.loading = false
        this.tableData = res.data
      }).catch((err) => {
        console.log(err)
        Msg.error('请求数据失败!')
        this.loading = false
      })
    },
    openDialog (row, type) {
      this.dialogVisible = true
      if (type === 'edit') {
        this.dialogInfo.dialogTitle = '编辑'
        this.dialogInfo.userItem = row
      }
      if (type === 'add') {
        this.dialogInfo.dialogTitle = '新增'
        this.dialogInfo.userItem = {}
      }
    },
    // closeDialog () {
    //   this.dialogVisible = false
    // },
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
    },
    showDeptTree (e) {
      DeptApi.deptTree().then(res => {
        this.deptTree = res.data.data
        this.innerVisible = true
      }).catch(err => {
        console.log(err)
        Msg.error('请求数据失败!')
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    selectDept (dept) {
      console.log(dept)
      this.innerVisible = false
      this.ruleForm.deptId = dept.id
      this.ruleForm.deptName = dept.name
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
