<template>
  <el-dialog title="资料披露说明" :visible.sync="modalShow">
    <el-form>
      <el-form-item label="关系人姓名">
        <div>{{ info.name }}</div>
      </el-form-item>
      <el-form-item label="何种关系">
        <div>{{ info.relationship }}</div>
      </el-form-item>
    </el-form>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="modalShow = false">取 消</el-button>
      <el-button type="primary" @click="modalShow = false">确 定</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
  export default {
    props: {
      modalShow: {
        type: Boolean,
        default: false,
      },
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {}
    }
  }
</script>

<style>
</style>
