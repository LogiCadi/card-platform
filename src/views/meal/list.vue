<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form @submit.native.prevent>
        <el-button v-waves class="filter-item" type="success" icon="el-icon-plus" native-type="submit" @click="$router.push('/meal/create')">添加套餐</el-button>
      </el-form>
    </div>
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column align="center" label="自定义套餐名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="原价(元)">
        <template slot-scope="scope">{{ scope.row.orign_price }}</template>
      </el-table-column>
      <el-table-column align="center" label="套餐售价(元)">
        <template slot-scope="scope">{{ scope.row.meal_price }}</template>
      </el-table-column>
      <el-table-column align="center" label="套餐成本(元)">
        <template slot-scope="scope">{{ scope.row.meal_cost }}</template>
      </el-table-column>
      <el-table-column align="center" label="套餐类型">
        <template slot-scope="scope">{{ $.cfg.enum.meal_type.filter(e => e.id == scope.row.meal_type)[0].value }}</template>
      </el-table-column>
      <el-table-column align="center" label="套餐周期(月)">
        <template slot-scope="scope">{{ scope.row.meal_period }}</template>
      </el-table-column>
      <el-table-column align="center" label="通话分钟(分)">
        <template slot-scope="scope">{{ scope.row.call_mins }}</template>
      </el-table-column>
      <el-table-column align="center" label="流量包大小(MB)">
        <template slot-scope="scope">{{ scope.row.flow }}</template>
      </el-table-column>

      <el-table-column align="center" label="结算类型">
        <template slot-scope="scope">{{ $.cfg.enum.settle_type.filter(e => e.id == scope.row.settle_type)[0].value }}</template>
      </el-table-column>
      <el-table-column align="center" label="购买限制">
        <template slot-scope="scope">{{ $.cfg.enum.buy_limit.filter(e => e.id == scope.row.buy_limit)[0].value }}</template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { getList } from '@/api/meal'

  export default {
    directives: {
      waves
    },
    components: {
      Pagination
    },
    data() {
      return {
        list: null,
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1, // 当前页码
          size: 20 // 每页大小
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        const res = await getList(this.listQuery, this.re)
        this.total = res.data.total
        this.list = res.data.list
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      }
    }
  }
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
