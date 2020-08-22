<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.realname" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input
          v-model="form.password"
          type="password"
          placeholder
          style="width: 500px;"
          class="filter-item"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-select style="width: 300px;" v-model="form.gender" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.cfg.enum.gender"
            :key="index"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="email">
        <el-input v-model="form.email" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="所属代理商">
        <el-select style="width: 300px;" v-model="form.agent" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.allAgent"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select style="width: 300px;" v-model="form.role" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.cfg.enum.role"
            :key="index"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postSave } from "@/api/user";

export default {
  data() {
    return {
      form: {},
    };
  },
  created() {},
  methods: {
    async submit() {
      await postSave({
        form: this.form,
      });
      this.$message({ message: "操作成功！", type: "success" });

      this.$.getAllUser();
      setTimeout(() => this.$router.go(-1), 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 40px 5%;

  .line {
    text-align: center;
  }
}
</style>
