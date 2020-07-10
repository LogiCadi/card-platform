<template>
  <div class="app-container">
    当前分配代理商：<h3>{{ agent_name }}</h3>
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column align="center" label="套餐名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="结算类型">
        <template slot-scope="scope">{{ cfg.enum.settle_type.filter(e => e.id == scope.row.settle_type)[0].value }}</template>
      </el-table-column>
      <el-table-column label="语音阀值(分)">
        <template slot-scope="scope">{{ scope.row.laina_voice }} </template>
      </el-table-column>
      <el-table-column label="流量基础阀值(MB)">
        <template slot-scope="scope">{{ scope.row.laina_flow_base }} </template>
      </el-table-column>
      <el-table-column label="流量进阶阀值(MB)">
        <template slot-scope="scope">{{ scope.row.laina_flow_advance }} </template>
      </el-table-column>
      <el-table-column label="流量顶峰阀值(MB)">
        <template slot-scope="scope">{{ scope.row.laina_flow_top }} </template>
      </el-table-column>
      <el-table-column align="center" label="套餐售价(元)">
        <template slot-scope="scope">{{ scope.row.meal_price }}</template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { getMealList } from '@/api/agent'

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
          size: 20, // 每页大小

          id: this.$route.params.id,
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        const res = await getMealList(this.listQuery, this.re)
        this.total = res.data.total
        this.list = res.data.list
        this.agent_name = res.data.agent_name
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
