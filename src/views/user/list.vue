<template>
  <div class="app-container">
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column align="center" label="真实姓名">
        <template slot-scope="scope">{{ scope.row.realname }}</template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">{{ cfg.enum.gender.filter(e => { return e.id === scope.row.gender })[0].value }}</template>
      </el-table-column>
      <el-table-column align="center" label="email">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column align="center" label="所属代理商">
        <template slot-scope="scope">{{ scope.row.agent && agentList.filter(e => e.id === scope.row.agent)[0].name }}</template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">{{ cfg.enum.role.filter(e => { return e.id === scope.row.role })[0].value }}</template>
      </el-table-column>
      <el-table-column align="center" label="最后登录时间">
        <template slot-scope="scope">{{ scope.row.least_login }}</template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { getList } from '@/api/user'
  import { getList as getAgentList } from '@/api/agent'
  import { getList as getUserList } from '@/api/agent'

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
        agentList: []
      }
    },
    computed: {},
    created() {
      this.getAllAgent()
      this.fetchData()
    },
    methods: {
      async getAllAgent() {
        this.agentList = (await getAgentList({ size: 9999 })).data.list
      },
      async fetchData() {
        const getDate = time => {
          if (!time) return
          const date = new Date(time)

          return (
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            '-' +
            date
            .getDate()
            .toString()
            .padStart(2, '0')
          )
        }
        this.listQuery.submitTimeStart = getDate(this.dateArr && this.dateArr[0])
        this.listQuery.submitTimeFinish = getDate(this.dateArr && this.dateArr[1])

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
