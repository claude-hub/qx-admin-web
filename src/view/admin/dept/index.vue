<template>
  <div class="content">
    <div>
      <el-button type="primary" @click="addDept">新增</el-button>
      <el-button type="primary" @click="editDept">修改</el-button>
      <el-button type="primary">删除</el-button>
    </div>
    <div class="tree">
      <div class="dept-tree">
        <el-input
          placeholder="输入关键字进行过滤"
          style="margin-bottom: 20px"
          v-model="filterText">
        </el-input>
        <el-tree
          highlight-current
          :expand-on-click-node="false"
          style="margin-bottom: 30px"
          :data="deptTree"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="selectDept"
          ref="tree">
        </el-tree>
      </div>
      <div class="dept-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="部门ID" prop="id" v-if="type!=='add'">
            <el-input
              :disabled="true"
              v-model="ruleForm.id"
              placeholder="请输入部门ID"></el-input>
          </el-form-item>
          <el-form-item label="部门名" prop="name">
            <el-input
              :disabled="disabled"
              v-model="ruleForm.name"
              placeholder="请输入部门名"></el-input>
          </el-form-item>
          <el-form-item label="上级部门ID" prop="parentId">
            <el-input
              :disabled="true"
              v-model="ruleForm.parentId"
              placeholder="请输入上级部门ID"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input
              :disabled="disabled"
              v-model="ruleForm.sort"
              placeholder="请输入排序号"></el-input>
          </el-form-item>
          <el-form-item
            style="text-align: right"
          >
            <el-button v-if="!disabled" :loading="loading" @click="submit" type="primary">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { DeptApi } from '@/api/dept'
  import { mapGetters } from 'vuex'
  import { Msg } from '@/tools/message'
export default {
  name: 'deptmanage',
  created () {
    this.sys_user_add = this.permissions.includes('sys_user_add')
    this.sys_user_edit = this.permissions.includes('sys_user_edit')
    this.sys_user_del = this.permissions.includes('sys_user_del')
    this.showDeptTree()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  data () {
    return {
      type: '',
      loading: false,
      filterText: '',
      deptTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      ruleForm: {
        id: '',
        name: '',
        parentId: '',
        sort: '',
        version: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入部门名', trigger: 'blur'},
        ]
      },
      disabled: true
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
  },
  methods: {
    showDeptTree () {
      DeptApi.deptTree().then(res => {
        this.deptTree = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    selectDept (dept) {
      this.$refs.ruleForm.resetFields()
      this.type = ''
      this.disabled = true
      this.ruleForm.name = dept.name
      this.ruleForm.id = dept.id
      this.ruleForm.sort = dept.sort
      this.ruleForm.parentId = dept.parentId
      this.ruleForm.version = dept.version
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    addDept () {
      if(this.ruleForm.id === ''){
        Msg.error("请选择上级部门")
        return
      }
      this.ruleForm.name = ''
      this.ruleForm.sort = ''
      this.ruleForm.parentId = this.ruleForm.id
      this.ruleForm.id = ''
      // this.$refs.ruleForm.resetFields()
      this.disabled = false
      this.type = 'add'
    },
    editDept () {
      if(this.ruleForm.id === ''){
        Msg.error("请选择部门")
        return
      }
      this.disabled = false
    },
    submit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          let params = {
            name: this.ruleForm.name,
            parentId: this.ruleForm.parentId,
            sort: this.ruleForm.sort
          }
          if (this.type === 'add'){
            DeptApi.addDept(params).then(res=>{
              this.loading = false
              this.$message({
                type: 'success',
                message: '新增成功!'
              })
              this.showDeptTree()
            }).catch(err=>{
              console.log(err)
            })
          }else {
            params.id = this.ruleForm.id
            params.version = this.ruleForm.version
            console.log(params)
            DeptApi.editDept(params).then(res=>{
              this.loading = false
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.showDeptTree()
            }).catch(err=>{
              console.log(err)
              this.loading = false
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

      // if (this.type === 'add'){
      //   this.$refs.ruleForm.validate(valid => {
      //     if (valid) {
      //       this.loading = true
      //       let params = {
      //         name: this.ruleForm.name,
      //         parentId: this.ruleForm.parentId,
      //         sort: this.ruleForm.sort
      //       }
      //       DeptApi.addDept(params).then(res=>{
      //         this.loading = false
      //         this.$message({
      //           type: 'success',
      //           message: '新增成功!'
      //         })
      //         this.showDeptTree()
      //       }).catch(err=>{
      //         console.log(err)
      //       })
      //     }
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    padding: 30px;
  }
  .tree {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .dept-form {
      padding-top: 60px;
      padding-right: 100px;
    }
  }
  .dept-tree,.dept-form{
    width: 46%;
  }
</style>
