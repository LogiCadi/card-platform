<template>
  <!-- 卡片列表 -->
  <div class="app-container">
    <!-- 表格内容 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
    >
      <!-- <el-table-column align="center" type="selection" width="70" /> -->

      <el-table-column label="微信支付订单号" align="center">
        <template slot-scope="scope">{{ scope.row.wx_id }}</template>
      </el-table-column>
      <el-table-column label="商户订单号" align="center">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="卡号码" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="$router.push(`/card/info/${scope.row.card.id}`)"
            >{{ scope.row.card.business_code }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="ICCID" align="center">
        <template slot-scope="scope">{{ scope.row.card.iccid }}</template>
      </el-table-column>
      <el-table-column label="卡套餐" align="center">
        <template slot-scope="scope">{{ scope.row.meal.name }}</template>
      </el-table-column>
      <el-table-column label="支付金额" align="center">
        <template slot-scope="scope">{{ scope.row.total_fee }}</template>
      </el-table-column>
      <el-table-column label="支付状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.pay_time" type="success">已支付</el-tag>
          <el-tag v-if="!scope.row.pay_time" type="info">未支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getList } from "@/api/order";

export default {
  directives: {
    waves,
  },
  components: {
    Pagination,
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1, // 当前页码
        size: 20, // 每页大小

        sortProp: "",
        sortOrder: "",
      },
    };
  },
  computed: {},
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      const res = await getList(this.listQuery);
      this.total = res.data.total;
      this.list = res.data.list;
      setTimeout(() => {
        this.listLoading = false;
      }, 500);
    },
  },
};
</script>
<style scoped lang="scss">
.btn {
  // margin: 5px;
}

.filter-container {
  .filter-item {
    margin-bottom: 10px;
  }
}
</style>
