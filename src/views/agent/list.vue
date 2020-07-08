<template>
  <div class="app-container">
    <!-- 表格内容 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
    >
      <el-table-column label="上级代理商">
        <template slot-scope="scope">{{ scope.row.up_agent_id && agentList.filter(e => e.id === scope.row.up_agent_id)[0].name || '' }}</template>
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
        <template slot-scope="scope">{{ scope.row.custom_manager && userList.filter(e => e.id === scope.row.custom_manager)[0].realname || '' }}</template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getList } from '@/api/agent'
import { getList as getUserList } from '@/api/user'

import config from '@/config/card'

export default {
  directives: {
    waves
  },
  components: {
    Pagination
  },
  data() {
    const re = this.$route.path.split('/')[2] // 根据path区分不同角色/页面
    return {
      re,
      pickerOptions: config.datePickOptions,
      dateArr: [],
      authMethod: config.authMethod,
      idArea: config.idArea,
      openStatus: config.openStatus,

      list: null,
      listLoading: true,

      total: 0,
      listQuery: {
        page: 1, // 当前页码
        size: 20, // 每页大小
        name: '', // 姓名(可选查询)
        mobileNo: '', // 手机号码(可选查询)
        idNo: '', // 身份证号(可选查询)
        applyId: null, // int, 开户id (可选查询)
        idArea: null, // 开户地区(可选查询)
        authMethod: null, // 认证方式(可选查询)
        // "openStatus": null, // 开户状态, 见公共枚举(可选查询)
        openStatusList: config.openStatus
          .map(e => {
            if (re === e.re) return e.value
          })
          .filter(e => e),
        reverseStatus: null,

        submitTimeStart: '', // 申请时间开始(可选查询)
        submitTimeFinish: '' // 申请时间结束(可选查询)
      },

      agentList: [],
      userList: []
    }
  },
  computed: {},
  created() {
    this.getAllAgent()
    this.getAllUser()
    this.fetchData()
  },
  methods: {
    async getAllAgent() {
      this.agentList = (await getList({ size: 9999 })).data.list
    },
    async getAllUser() {
      this.userList = (await getUserList({ size: 9999 })).data.list
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
