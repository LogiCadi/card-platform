<template>
  <!-- 绑定套餐 -->
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="代理商">
        <el-select style="width: 300px;" v-model="form.agent" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.allAgent"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="划拨模式">
        <el-select style="width: 300px;" v-model="form.card_selected_mode" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.cfg.enum.card_selected_mode"
            :key="index"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item label="业务号码段">
        <el-col :span="6">
          <el-input v-model="form.business_code_start" />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-input v-model="form.business_code_end" />
        </el-col>
      </el-form-item>

      <el-form-item label="卡片数">
        <el-button @click="getAreaCount" size="small" type="primary">查询</el-button>
      </el-form-item>


      

      <el-form-item>
        <el-button type="primary" @click="submit">确认划拨</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postCardAssign, getAreaCount } from "@/api/card";
export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    async getAreaCount() {
      const res = await getAreaCount({
        form: this.form,
      });
      this.$message({ message: `查询到${res.data}条卡片数据` });
    },
    async submit() {
      await postCardAssign({
        form: this.form,
      });
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
