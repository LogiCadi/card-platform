<template>
  <div class="app-container">

    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column align="center" label="代理商名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="代理商别名">
        <template slot-scope="scope">{{ scope.row.name_alias }}</template>
      </el-table-column>
      <el-table-column align="center" label="联系人">
        <template slot-scope="scope">{{ scope.row.contact_name }}</template>
      </el-table-column>
      <el-table-column align="center" label="联系电话">
        <template slot-scope="scope">{{ scope.row.contact_mobile }}</template>
      </el-table-column>
      <el-table-column align="center" label="email">
        <template slot-scope="scope">{{ scope.row.contact_email }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button class="btn" type="primary" size="mini" @click="$router.push(`/meal/allotSetting/${scope.row.id}`)">分配</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { getList } from '@/api/agent'

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
