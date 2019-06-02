<template>
  <div>
    <div class="user-filter">
      <div class="query">
        <span class="dept-tree">部门</span>
        <tree-select :data="deptTree"
                     :defaultProps="defaultProps"
                     :nodeKey="nodeKey" :checkedKeys="searchDeptCheckedKeys"
                     @popoverHide="popoverHide"></tree-select>

        <el-input
          clearable
          v-model="query"
          placeholder="用户信息"
          class="query-input"
          style="width: 250px"
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
      <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="姓名">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="deptName"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="roles"
        label="角色">
        <template slot-scope="scope">
          <span v-for="item in scope.row.roles" :key="item.id">
            <el-tag>{{item.name}}</el-tag>
          </span>
        </template>
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
        width="100"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.locked == null" type="success">正常</el-tag>
          <!--<el-button disabled size="mini" type="success" plain v-if="scope.row.locked == null">正常</el-button>-->
          <!--<el-button disabled size="mini" type="danger" plain v-else>冻结</el-button>-->
          <el-tag type="danger" plain v-else>冻结</el-tag>
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
            <el-button size="mini" icon="el-icon-delete" circle type="danger" plain @click="deleteUser(scope.row.id)"></el-button>
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
      :title="dialogInfo.dialogTitle"
      :visible.sync="dialogVisible"
      top="10vh"
      width="40%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="手机号" prop="phoneNum">
          <el-input
            v-model="ruleForm.phoneNum"
            placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
        </el-form-item>

        <!--<el-dialog-->
          <!--width="30%"-->
          <!--title="请选择部门"-->
          <!--:visible.sync="deptVisible"-->
          <!--append-to-body>-->
          <!--<el-input-->
            <!--placeholder="输入关键字进行过滤"-->
            <!--style="margin-bottom: 20px"-->
            <!--v-model="filterText">-->
          <!--</el-input>-->
          <!--<el-tree-->
            <!--style="margin-bottom: 30px"-->
            <!--:data="deptTree"-->
            <!--:props="defaultProps"-->
            <!--default-expand-all-->
            <!--:filter-node-method="filterNode"-->
            <!--@node-click="selectDept"-->
            <!--ref="tree">-->
          <!--</el-tree>-->
        <!--</el-dialog>-->

        <!--<el-dialog-->
          <!--width="30%"-->
          <!--title="请选择员工的特殊权限"-->
          <!--:visible.sync="permissionVisible"-->
          <!--top="10vh"-->
          <!--append-to-body>-->
          <!--<el-input-->
            <!--placeholder="输入关键字进行过滤"-->
            <!--style="margin-bottom: 20px"-->
            <!--v-model="filterPermission">-->
          <!--</el-input>-->
          <!--<el-tree-->
            <!--:data="menuTree"-->
            <!--show-checkbox-->
            <!--default-expand-all-->
            <!--node-key="id"-->
            <!--ref="permissionTree"-->
            <!--:filter-node-method="filterNode"-->
            <!--highlight-current-->
            <!--:props="defaultProps">-->
          <!--</el-tree>-->

          <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="closePermission">取 消</el-button>-->
              <!--<el-button-->
                <!--type="primary"-->
                <!--:loading="btnLoading"-->
                <!--@click.native.prevent="handleSelectPerm"-->
              <!--&gt;确 定</el-button>-->
          <!--</span>-->

        <!--</el-dialog>-->

        <el-form-item label="所属部门" prop="deptId">
          <!--<el-input-->
            <!--@focus="showDeptTree"-->
            <!--v-model="ruleForm.deptName"-->
            <!--placeholder="请选择所属部门"></el-input>-->
          <tree-select :data="deptTree"
                       :defaultProps="defaultProps"
                       :nodeKey="nodeKey" :checkedKeys="selectDeptCheckedKeys"
                       @popoverHide="popoverSelectDept"></tree-select>
        </el-form-item>


        <el-form-item label="角色" prop="role">
          <el-select
            v-model="ruleForm.role"
            multiple
            collapse-tags
            placeholder="请选择角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="特殊权限" prop="specialPerm">
          <!--<el-input-->
            <!--@focus="showPermissionTree"-->
            <!--v-model="ruleForm.specialPerm"-->
            <!--placeholder="请选择特殊权限"></el-input>-->
          <tree-select :data="menuTree" multiple
                       :defaultProps="defaultProps"
                       :nodeKey="nodeKey" :checkedKeys="selectPermCheckedKeys"
                       @popoverHide="popoverSelectPrem"></tree-select>
        </el-form-item>

        <el-form-item label="状态" prop="locked">
          <el-select
            v-model="ruleForm.locked"
            placeholder="请选择账号状态">
            <el-option
              v-for="item in status"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="closeDialogBtn">取 消</el-button>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click.native.prevent="handleSubmit"
          >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { UserApi } from '@/api/user'
import { DeptApi } from '@/api/dept'
import { RoleApi } from '@/api/role'
import { MenuApi } from '@/api/menu'
import { isvalidatemobile } from '@/tools/validate'
import { Msg } from '@/tools/message'
import { mapGetters } from 'vuex'
import TreeSelect from '@/components/tree-select.vue';

export default {
  created () {
    this.sys_user_add = this.permissions.includes('sys_user_add')
    this.sys_user_edit = this.permissions.includes('sys_user_edit')
    this.sys_user_del = this.permissions.includes('sys_user_del')
    this.showDeptTree()
    this.getRoles()
    MenuApi.menuTree().then(res => {
      this.menuTree = res.data.data
    })
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  components: { TreeSelect },
  data () {
    let validatePhone = (rule, value, callback) => {
      if (!isvalidatemobile(value)) {
        callback(new Error('请输入正确的手机号'))
      }
      callback()
    }
    return {
      dialogType: '',
      query: '',
      deptId: '',
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
      pageSize: 5,
      dialogVisible: false,
      // deptVisible: false,
      permissionVisible: false,
      ruleForm: {
        userName: '',
        name: '',
        email: '',
        password: '',
        deptId: '',
        deptName: '',
        phoneNum: '',
        role: '',
        locked: '',
        // specialPerm: '', // 字符串数组逗号隔开
        specialPermIds: [],
        version: '', //乐观锁版本
        id: '' //主键id
      },
      rules: {
        // userName: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' }
        // ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        locked: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      },

      // filterText: '',
      filterPermission: '',
      deptTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nodeKey: 'id',
      searchDeptCheckedKeys: [], //部门默认选中的key
      selectDeptCheckedKeys: [], //新增修改用户时，选择部门的key
      selectPermCheckedKeys: [], //新增修改用户时，选择的特殊权限
      roles: [],
      btnLoading: false,
      status: [{
        id: 0,
        name: '有效'
      }, {
        id: 1,
        name: '冻结'
      }],
      menuTree: []
    }
  },
  mounted () {
    this.loadData()
  },
  watch: {
    // filterText (val) {
    //   this.$refs.tree.filter(val)
    // },
    filterPermission (val) {
      this.$refs.permissionTree.filter(val)
    }
  },
  methods: {
    popoverHide (checkedIds) {
      this.deptId = checkedIds
      this.loadData()
    },
    popoverSelectDept (checkedIds) {
      this.ruleForm.deptId = checkedIds
    },
    popoverSelectPrem (checkedIds) {
      this.ruleForm.specialPermIds = checkedIds
    },
    reloadData () {
      this.deptId = ''
      this.searchDeptCheckedKeys = []
      this.query = ''
      this.loadData()
    },
    loadData () {
      this.loading = true
      let params = {
        query: this.query,
        page: this.currentPage,
        pageSize: this.pageSize,
        deptId: this.deptId
      }
      UserApi.getUserList(params).then((res) => {
        this.loading = false
        this.tableData = res.data
      }).catch((err) => {
        console.log(err)
        // Msg.error('请求数据失败!')
        this.loading = false
      })
    },
    openDialog (row, type) {
      this.dialogVisible = true
      this.dialogType = type
      if (type === 'edit') {
        this.dialogInfo.dialogTitle = '编辑'
        this.dialogInfo.userItem = row
        console.log(row)
        this.ruleForm.phoneNum = row.phone
        this.ruleForm.userName = row.userName
        this.ruleForm.name = row.name
        this.ruleForm.email = row.email
        this.ruleForm.password = ''
        this.ruleForm.role = row.roles.map(item=>item.id)
        // 特殊权限的id
        this.ruleForm.specialPermIds = row.menus.map(item=>item.id)
        this.selectPermCheckedKeys = row.menus.map(item=>item.id)
        this.ruleForm.deptId = row.deptId
        let depts = []
        depts.push(row.deptId)
        this.selectDeptCheckedKeys = depts
        this.ruleForm.locked = row.locked || 0
        this.ruleForm.version = row.version
        this.ruleForm.id = row.id
      }
      if (type === 'add') {
        this.dialogInfo.dialogTitle = '新增'
        this.dialogInfo.userItem = {}
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
    },
    showDeptTree () {
      DeptApi.deptTree().then(res => {
        this.deptTree = res.data.data
        // this.deptVisible = true
      }).catch(err => {
        console.log(err)
        // Msg.error('请求数据失败!')
      })
    },
    // filterNode (value, data) {
    //   if (!value) return true
    //   return data.label.indexOf(value) !== -1
    // },
    // selectDept (dept) {
    //   this.deptVisible = false
    //   this.ruleForm.deptId = dept.id
    //   this.ruleForm.deptName = dept.name
    // },
    getRoles () {
      RoleApi.roles().then(res => {
        this.roles = res.data.data
      }).catch(err => {
        console.log(err)
        // Msg.error('请求数据失败!')
      })
    },
    // showPermissionTree () {
    //   MenuApi.menuTree().then(res => {
    //     this.menuTree = res.data.data
    //     this.permissionVisible = true
    //   }).catch(err => {
    //     console.log(err)
    //     // Msg.error('请求数据失败!')
    //   })
    // },
    // closePermission () {
    //   this.filterPermission = ''
    //   this.permissionVisible = false
    // },
    // handleSelectPerm () {
    //   this.permissionVisible = false
    //   let selected = this.$refs.permissionTree.getCheckedNodes().map(item => {
    //     return {
    //       id: item.id,
    //       name: item.name
    //     }
    //   })
    //   this.ruleForm.specialPermIds = selected.map(item => item.id)
    //   this.ruleForm.specialPerm = selected.map(item => item.name).toString()
    // },
    resetForm () {
      this.$refs.ruleForm.resetFields()
      this.selectPermCheckedKeys = []
      this.selectDeptCheckedKeys = []
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.btnLoading = true
          let params = {
            phone: this.ruleForm.phoneNum,
            userName: this.ruleForm.userName,
            name: this.ruleForm.name,
            email: this.ruleForm.email,
            passwordEncrypted: this.ruleForm.password,
            roleIds: this.ruleForm.role,
            permissionIds: this.ruleForm.specialPermIds,
            deptId: this.ruleForm.deptId,
            locked: this.ruleForm.locked
          }
          if(this.dialogType === 'edit'){
            params.id = this.ruleForm.id
            params.version = this.ruleForm.version
            UserApi.editUser(params).then(res => {
              this.btnLoading = false
              this.dialogVisible = false
              this.loadData()
            }).catch(err => {
              this.btnLoading = false
              if (err.response.status === 504) {
                Msg.error('请求超时！')
              }
              if (err.response.status === 400) {
                let { message } = err.response.data.message[0]
                Msg.error(message)
              }
              if (err.response.status === 500) {
                Msg.error(err.response.data.message)
              }
            })
          }else {
            UserApi.addUser(params).then(res => {
              this.btnLoading = false
              this.dialogVisible = false
              this.loadData()
            }).catch(err => {
              this.btnLoading = false
              if (err.response.status === 504) {
                Msg.error('请求超时！')
              }
              if (err.response.status === 400) {
                let { message } = err.response.data.message[0]
                Msg.error(message)
              }
              if (err.response.status === 500) {
                Msg.error(err.response.data.message)
              }
            })
          }
        }
      })
    },
    closeDialog (done) {
      done()
      this.resetForm()
    },
    closeDialogBtn () {
      this.dialogVisible = false
      this.resetForm()
    },
    deleteUser (id) {
      this.$confirm('此操作将删除该用户, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: id
        }
        UserApi.delUser(params).then(res => {
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
  .user-filter {
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
      margin: 0 6px 0 20px;
    }
  }
</style>
