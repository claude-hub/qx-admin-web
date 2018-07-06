<template>
  <div>
    <el-dialog
      :title="dialogInfo.dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="closeDialog">
      {{dialogInfo}}
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="closeDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    }
  },
  props: ['dialogInfo']
}
</script>
