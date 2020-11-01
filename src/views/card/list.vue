<template>
  <!-- 卡片列表 -->
  <div class="app-container">
    <div class="filter-container">
      <el-form @submit.native.prevent>
        <el-input
          placeholder="业务号码"
          style="width: 200px"
          class="filter-item"
          v-model="listQuery.business_code"
        />
        <el-input
          placeholder="iccid"
          style="width: 200px"
          class="filter-item"
          v-model="listQuery.iccid"
        />
        <el-select
          style="width: 300px"
          v-model="listQuery.agent"
          placeholder="所属代理商"
          clearable
        >
          <el-option
            v-for="(item, index) in $.allAgent"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          native-type="submit"
          @click="fetchData(1)"
          >查询</el-button
        >
        <el-button
          v-waves
          class="filter-item"
          type="success"
          icon="el-icon-plus"
          @click="$router.push('/card/create')"
          >添加卡片</el-button
        >
      </el-form>
    </div>
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
      <el-table-column align="center" label="ICCID">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="$router.push(`/card/info/${scope.row.id}`)"
            >{{ scope.row.iccid }}</el-link
          >
        </template>
      </el-table-column>

      <el-table-column label="业务号码" align="center">
        <template slot-scope="scope">{{ scope.row.business_code }}</template>
      </el-table-column>

      <el-table-column label="划拨状态" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="
              $.cfg.enum.assign_status.find(
                (e) => e.id === scope.row.assign_status
              ).type
            "
            >{{
              $.cfg.enum.assign_status.find(
                (e) => e.id === scope.row.assign_status
              ).value
            }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column
        label="卡片状态"
        prop="card_status"
        align="center"
        sortable="custom"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              $.cfg.enum.card_status.find((e) => e.id === scope.row.card_status)
                .type
            "
            >{{
              $.cfg.enum.card_status.find((e) => e.id === scope.row.card_status)
                .value
            }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column label="实名状态" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="
              $.cfg.enum.real_name_auth.find(
                (e) => e.id === scope.row.real_name_auth
              ).type
            "
            >{{
              $.cfg.enum.real_name_auth.find(
                (e) => e.id === scope.row.real_name_auth
              ).value
            }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column
        label="激活时间"
        align="center"
        prop="first_active_time"
        sortable="custom"
      >
        <template slot-scope="scope">{{
          scope.row.first_active_time
        }}</template>
      </el-table-column>

      <el-table-column label="到期时间" align="center">
        <template slot-scope="scope">{{
          scope.row.end_time
        }}</template>
      </el-table-column>

      <el-table-column label="已用流量" width="120" align="center">
        <template slot-scope="scope">{{
          scope.row.used_flow_size + "MB"
        }}</template>
      </el-table-column>

      <el-table-column label="卡批次" align="center">
        <template slot-scope="scope">{{ scope.row.batch }}</template>
      </el-table-column>

      <el-table-column label="归属代理商" align="center">
        <template slot-scope="scope">{{
          (scope.row.agent &&
            $.allAgent.find((e) => e.id === scope.row.agent).name) ||
          "-"
        }}</template>
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
import { getCardList } from "@/api/card";

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
    sortChange(e) {
      this.listQuery.sortProp = e.prop;
      if (e.order === "ascending") {
        this.listQuery.sortOrder = "asc";
      } else if (e.order === "descending") {
        this.listQuery.sortOrder = "desc";
      } else {
        this.listQuery.sortOrder = null;
      }
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      const res = await getCardList(this.listQuery);
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
