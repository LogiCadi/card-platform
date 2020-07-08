<template>
  <div class="app-container">
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <!-- <el-table-column align="center" type="selection" width="70" /> -->
      <el-table-column align="center" label="ICCID">
        <template slot-scope="scope">{{ scope.row.iccid }}</template>
      </el-table-column>

      <el-table-column label="业务号码" align="center">
        <template slot-scope="scope">{{ scope.row.business_code }}</template>
      </el-table-column>

      <el-table-column label="划拨状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="cfg.enum.assign_status.filter(e => e.id === scope.row.assign_status )[0].type">{{ cfg.enum.assign_status.filter(e => e.id === scope.row.assign_status )[0].value }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="卡片状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="cfg.enum.card_status.filter(e => e.id === scope.row.card_status )[0].type">{{ cfg.enum.card_status.filter(e => e.id === scope.row.card_status )[0].value }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="实名状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="cfg.enum.real_name_auth.filter(e => e.id === scope.row.real_name_auth )[0].type">{{ cfg.enum.real_name_auth.filter(e => e.id === scope.row.real_name_auth )[0].value }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="激活时间" align="center">
        <template slot-scope="scope">{{ scope.row.first_active_time }}</template>
      </el-table-column>

      <el-table-column label="到期时间" align="center">
        <template slot-scope="scope">{{ scope.row.first_active_time }}</template>
      </el-table-column>

      <el-table-column label="已用流量" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.used_flow_size + 'MB' }}</template>
      </el-table-column>

      <el-table-column label="卡批次" align="center">
        <template slot-scope="scope">{{ scope.row.batch }}</template>
      </el-table-column>

      <el-table-column label="归属代理商" align="center">
        <template slot-scope="scope">{{ scope.row.company_name}}</template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { getCardList } from '@/api/card'

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
    computed: {},
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        const res = await getCardList(this.listQuery, this.re)
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
