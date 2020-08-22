<template>
  <div class="app-container">
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column label="上级代理商">
        <template slot-scope="scope">{{ scope.row.up_agent_id && $.allAgent.filter(e => e.id === scope.row.up_agent_id)[0].name }}</template>
      </el-table-column>
      <el-table-column label="代理商名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="代理商别名">
        <template slot-scope="scope">{{ scope.row.name_alias }}</template>
      </el-table-column>
      <el-table-column label="联系人">
        <template slot-scope="scope">{{ scope.row.contact_name }}</template>
      </el-table-column>

      <el-table-column label="联系电话">
        <template slot-scope="scope">{{ scope.row.contact_mobile }}</template>
      </el-table-column>
      <el-table-column label="联系邮箱">
        <template slot-scope="scope">{{ scope.row.contact_email }}</template>
      </el-table-column>

      <el-table-column label="客户经理">
        <template slot-scope="scope">{{ scope.row.custom_manager && $.allUser.filter(e => e.id === scope.row.custom_manager)[0].realname }}</template>
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
        },
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
