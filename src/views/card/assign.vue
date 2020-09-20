<template>
  <!-- 卡片划拨 -->
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="划拨给">
        <el-select style="width: 300px;" v-model="form.to_agent" placeholder="请选择">
          <el-option
            v-for="(item, index) in $.allAgent.filter((e) => e.up_agent_id === agent.id)"
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

      <!-- <el-form-item label="业务号码段">
        <el-col :span="6">
          <el-input v-model="form.business_code_start" />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-input v-model="form.business_code_end" />
        </el-col>
      </el-form-item>-->
      <el-form-item label="卡批次">
        <el-col :span="6">
          <el-input v-model="form.batch" />
        </el-col>
      </el-form-item>

      <el-form-item label="卡片数">
        <el-button @click="getMeals" size="small" type="primary">查询</el-button>
      </el-form-item>

      <el-form-item label="套餐成本设置">
        <el-row
          style="display: flex; margin-bottom: 10px;"
          v-for="(item, index) in meals"
          :key="index"
        >
          <el-col
            :span="8"
          >{{ `${item.meal.name} / ${item.meal.meal_period}个月 / ${item.meal.call_mins}分钟 / ${item.meal.flow}M / 售价${item.meal.meal_price}元`}}</el-col>
          <el-col :span="4">
            <el-input
              v-model="meals[index].cost"
              :placeholder="`给${$.allAgent.find(e => e.id === form.to_agent).name}的成本价`"
            />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">确认划拨</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postCardAssign, getMeals } from "@/api/card";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},

      mealOptions: [
        { name: "年套餐", code: "year" },
        { name: "半年套餐", code: "half_year" },
        { name: "季套餐", code: "season" },
        { name: "月套餐", code: "month" },
      ],
      meals: {},
    };
  },
  computed: {
    toAgent() {
      return this.$.allAgent.filter((e) => e.up_agent_id === this.agent.id);
    },
    ...mapGetters(["agent"]),
  },
  methods: {
    async getMeals() {
      const res = await getMeals({
        form: this.form,
      });
      this.$message({ message: `查询到${res.data.count}条卡片数据` });

      this.meals = res.data.meals;
    },
    async submit() {
      await postCardAssign({
        form: this.form,
        meals: this.meals,
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
