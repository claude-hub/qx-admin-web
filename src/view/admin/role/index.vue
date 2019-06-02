<template>
  <div class="content">
    <div class="filter">
      <div class="query">
        <el-input
          clearable
          v-model="query"
          placeholder="角色信息"
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
        <el-button
          v-if="sys_user_add"
          type="primary"
          @click="openDialog('','add')"
        >新增
        </el-button>
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
        prop="name"
        label="角色名">
      </el-table-column>
      <el-table-column
        prop="roleCode"
        label="角色码">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
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

    <el-dialog
      :close-on-click-modal="false"
      :before-close="closeDialog"
      :title="dialog.title"
      :visible.sync="dialog.visible"
      top="10vh"
      width="40%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
        <el-form-item label="角色名" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入角色名"></el-input>
        </el-form-item>
        <el-form-item label="角色码" prop="roleCode">
          <el-input
            v-model="ruleForm.roleCode"
            placeholder="请输入角色码"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            v-model="ruleForm.roleDesc"
            placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="resetForm">重置</el-button>-->
        <el-button @click="closeDialogBtn">取 消</el-button>
          <el-button
            type="primary"
            :loading="dialog.submitLoading"
            @click.native.prevent="handleSubmit"
          >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { Msg } from '@/tools/message'
  import { mapGetters } from 'vuex'
  import { RoleApi } from '@/api/role'

export default {
  name: 'rolemanage',
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
      dialog: {
        visible: false,
        title: '',
        type: '',
        submitLoading: false,
      },
      ruleForm: {
        name: '',
        roleCode: '',
        roleDesc: '',
        id: '',
        version: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入角色名', trigger: 'blur'},
        ],
        roleCode: [
          {required: true, message: '请输入角色码', trigger: 'blur'},
        ]
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
      RoleApi.roles(params).then((res) => {
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
    openDialog (row, type) {
      this.dialog.visible = true
      this.dialog.type = type
      if (type === 'edit') {
        this.dialog.title = '修改'
        this.ruleForm.name = row.name
        this.ruleForm.roleCode = row.roleCode
        this.ruleForm.roleDesc = row.roleDesc
        this.ruleForm.id = row.id
        this.ruleForm.version = row.version
      }
      if (type === 'add') {
        this.dialog.title = '新增'
      }
    },
    closeDialog (done) {
      this.$refs.ruleForm.resetFields()
      done()
    },
    closeDialogBtn () {
      this.dialog.visible = false
      this.$refs.ruleForm.resetFields()
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.dialog.submitLoading = true
          let params = {
            name: this.ruleForm.name,
            roleCode: this.ruleForm.roleCode,
            roleDesc: this.ruleForm.roleDesc,
          }
          if (this.dialog.type === 'edit') {
            params.id = this.ruleForm.id
            params.version = this.ruleForm.version
            RoleApi.editRole(params).then(res => {
              this.dialog.visible = false
              this.dialog.submitLoading = false
              this.loadData()
            }).catch(err => {
              this.dialog.submitLoading = false
              Msg.error(err.message)
            })
          } else {
            RoleApi.addRole(params).then(res => {
              this.dialog.visible = false
              this.dialog.submitLoading = false
              this.loadData()
            }).catch(err => {
              this.dialog.submitLoading = false
              Msg.error(err.message)
            })
          }
        }
      })
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
        RoleApi.delRole(params).then(res => {
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
