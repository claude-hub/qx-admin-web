<template>
  <div>
    <el-table
      :data="userList"
      size="small"
      v-loading=loading
      :header-row-style="headerRowStyle"
      :header-cell-style="headerCellStyle"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="userId"
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
        prop="avatar"
        width="120"
        label="头像">
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
            <el-button size="mini" icon="el-icon-edit" circle type="primary" plain></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="冻结" placement="top">
            <el-button size="mini" icon="el-icon-delete" circle type="danger" plain></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      headerRowStyle: {
        color: '#909399'
      },
      headerCellStyle: {
        backgroundColor: '#d7d7d7'
      }
    }
  },
  props: {
    userList: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  }
}
</script>
