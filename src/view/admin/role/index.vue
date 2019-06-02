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
          v-if="sys_role_add"
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
        width="160"
        label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="授权" placement="left">
            <el-button
              size="mini"
              v-if="sys_role_perm"
              icon="el-icon-plus"
              circle type="primary"
              plain
              @click="showAddPerm(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              v-if="sys_role_edit"
              size="mini"
              icon="el-icon-edit"
              circle type="primary"
              plain
              @click="openDialog(scope.row,'edit')"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              v-if="sys_role_del"
              size="mini" icon="el-icon-delete" circle type="danger" plain
                       @click="deleteItem(scope.row.id)"></el-button>
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


    <el-dialog
      :before-close="closePermissionDialog"
      width="40%"
      title="请选择角色权限"
      :visible.sync="permission.visible"
      top="10vh"
      append-to-body>
      <el-input
        placeholder="输入关键字进行过滤"
        style="margin-bottom: 20px"
        v-model="filterPermission">
      </el-input>
      <el-tree
        :data="permission.menuTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="permissionTree"
        :default-checked-keys='selectedKeys'
        :filter-node-method="filterNode"
        highlight-current
        :props="defaultProps">
      </el-tree>

      <span slot="footer" class="dialog-footer">
    <el-button @click="closePermission">取 消</el-button>
    <el-button
      type="primary"
      :loading="permission.loading"
      @click.native.prevent="handleSelectPerm"
    >确 定</el-button>
    </span>

    </el-dialog>
  </div>
</template>
<script>
  import {Msg} from '@/tools/message'
  import {mapGetters} from 'vuex'
  import {RoleApi} from '@/api/role'
  import {MenuApi} from '@/api/menu'

  export default {
    name: 'rolemanage',
    created() {
      this.$store.dispatch('GetUserInfo')
      this.sys_role_add = this.permissions.includes('sys_role_add')
      this.sys_role_edit = this.permissions.includes('sys_role_edit')
      this.sys_role_del = this.permissions.includes('sys_role_del')
      this.sys_role_perm = this.permissions.includes('sys_role_perm')
      this.loadData()
      MenuApi.menuTree().then(res => {
        this.permission.menuTree = res.data.data
      })
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    watch: {
      filterPermission(val) {
        this.$refs.permissionTree.filter(val)
      }
    },
    data() {
      return {
        roleId: '',
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

        filterPermission: '',
        permission: {
          visible: false,
          menuTree: [],
          loading: false,
        },

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
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        selectedKeys: []
      }
    },
    methods: {
      loadData() {
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
      handleSearch() {
        this.loadData()
      },
      reloadData() {
        this.loadData()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.loadData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.loadData()
      },
      openDialog(row, type) {
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
      closeDialog(done) {
        this.$refs.ruleForm.resetFields()
        done()
      },
      closeDialogBtn() {
        this.dialog.visible = false
        this.$refs.ruleForm.resetFields()
      },
      handleSubmit() {
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
      deleteItem(id) {
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
      },
      showAddPerm(id) {
        MenuApi.roleMenu(id).then(res => {
          let ids = res.data.data.map(item => item.id)
          // 解析出所有的太监节点
          this.selectedKeys = this.resolveAllEunuchNodeId(this.permission.menuTree, ids , [])
          this.permission.visible = true
          this.roleId = id
        })
      },
      /**
       * 解析出所有的太监节点id
       * @param json 待解析的json串
       * @param idArr 原始节点数组
       * @param temp 临时存放节点id的数组
       * @return 太监节点id数组
       */
      resolveAllEunuchNodeId(json, idArr, temp) {
        for (let i = 0; i < json.length; i++) {
          const item = json[i]
          // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
          if (item.children && item.children.length !== 0) {
            this.resolveAllEunuchNodeId(item.children, idArr, temp)
          } else {
            temp.push(idArr.filter(id => id === item.id))
          }
        }
        return temp
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      closePermission() {
        this.filterPermission = ''
        this.resetChecked()
        this.permission.visible = false
      },
      closePermissionDialog(done) {
        this.filterPermission = ''
        this.resetChecked()
        done()
      },
      resetChecked() {
        this.$refs.permissionTree.setCheckedKeys([]);
      },

      handleSelectPerm() {
        let selected = []
        selected.push(...this.$refs.permissionTree.getHalfCheckedKeys())
        selected.push(...this.$refs.permissionTree.getCheckedKeys())
        let params = {
          roleId: this.roleId,
          menuIds: selected
        }
        RoleApi.addRolePerms(params).then(res => {
          this.permission.loading = false
          Msg.success("授权成功!")
          this.permission.visible = false
        }).catch(err => {
          this.permission.loading = false
        })
      },
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
