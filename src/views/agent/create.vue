<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="上级代理商">
        <el-select style="width: 300px;" v-model="form.up_agent_id" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.allAgent.filter(e => e.id === agent.id)"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="代理商名称">
        <el-input v-model="form.name" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="代理商别名">
        <el-input v-model="form.name_alias" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="代理商级别">
        <el-select style="width: 300px;" v-model="form.agent_level" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.cfg.enum.agent_level"
            :key="index"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算对象（不可修改）">
        <el-select style="width: 300px;" v-model="form.settle_target" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.cfg.enum.settle_target"
            :key="index"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实时分润">
        <el-select style="width: 300px;" v-model="form.shareprofit" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.cfg.enum.shareprofit"
            :key="index"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="保证金（元）">
        <el-input v-model="form.margin" style="width: 500px;" class="filter-item" />
      </el-form-item>

      <!-- <el-form-item label="代理商简介">
        <el-input
          v-model="form.agent_introduction"
          type="textarea"
          style="width: 500px;"
          class="filter-item"
        />
      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="submit">添加</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postCreate } from "@/api/agent";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapGetters(["agent"]),
  },
  methods: {
    async submit() {
      await postCreate({
        form: this.form,
      });
      this.$.getAllAgent();
      this.$message({ message: "操作成功！", type: "success" });
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
