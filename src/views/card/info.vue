<template>
  <!-- 卡片详情 -->
  <div class="app-container">
    <el-card class="box-card">
      <div class="title">卡片操作</div>
      <el-row class="row">
        <el-button type="primary" @click="btnHandler('active')"
          >开启实名权限</el-button
        >
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div class="title">卡片详情</div>
      <el-row class="row">
        <el-col :span="8">
          <span class="label">ICCID</span>
          <span class="content">{{ info.iccid }}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">业务号码</span>
          <span class="content">{{ info.business_code }}</span>
        </el-col>
        <el-col :span="8">
          <span class="label">激活时间</span>
          <span class="content">{{ info.first_active_time }}</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div class="title">可销售套餐</div>
      <el-table :data="info.meals" style="width: 100%">
        <el-table-column prop="meal.name" label="套餐名称"></el-table-column>

        <el-table-column
          v-for="(item, index) in info.meals &&
          info.meals[0] &&
          info.meals[0].tier"
          :key="index"
          :label="item.name + '成本价'"
        >
          <template slot-scope="scope">{{
            scope.row.tier[index].cost
          }}</template>
        </el-table-column>

        <el-table-column
          prop="meal.meal_price"
          label="套餐售价"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getInfo, cardActive } from "@/api/card";
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {},
    };
  },
  computed: {},
  created() {
    this.fetchData();
  },
  methods: {
    async btnHandler(type) {
      if (type === "active") {
        await cardActive(this.info.business_code);
      }
    },
    async fetchData() {
      const res = await getInfo({ id: this.id });

      res.data.meals = res.data.meals.map((e) => {
        if (e.tier) {
          e.tier = JSON.parse(e.tier).map((t) => ({
            ...t,
            name: this.$.allAgent.find((e) => e.id == t.agent_id).name,
          }));
        }

        return e;
      });
      this.info = res.data;
    },
  },
};
</script>
<style scoped lang="scss">
.box-card {
  margin-bottom: 20px;

  .title {
    font-size: 18px;
    font-weight: 600;
    margin: 10px 0 20px;
  }

  .row {
    margin: 10px 0;
    font-size: 14px;

    .label {
      &::after {
        content: ":";
        position: relative;
        top: -0.5px;
        margin: 0 8px 0 2px;
      }
    }
  }
}
</style>
