<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form @submit.native.prevent>
        <el-button v-waves class="filter-item" type="success" icon="el-icon-plus" native-type="submit" @click="$router.push('/meal/packageCreate')">添加加油包</el-button>
      </el-form>
    </div>
    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column align="center" label="运营商">
        <template slot-scope="scope">{{ $.cfg.enum.operator.filter(e => e.id === scope.row.operator)[0].value }}</template>
      </el-table-column>
      <el-table-column align="center" label="地区运营商">
        <template slot-scope="scope">{{ $.cfg.enum.region_operator.filter(e => e.id === scope.row.region_operator)[0].value }}</template>
      </el-table-column>
      <el-table-column align="center" label="套餐名字">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="套餐别名(显示在微信公众号购买套餐)">
        <template slot-scope="scope">{{ scope.row.alias }}</template>
      </el-table-column>
      <el-table-column align="center" label="套餐价格(元)">
        <template slot-scope="scope">{{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column align="center" label="套餐周期(月)">
        <template slot-scope="scope">{{ scope.row.period }}</template>
      </el-table-column>
      <el-table-column align="center" label="通话分钟(分)">
        <template slot-scope="scope">{{ scope.row.mins }}</template>
      </el-table-column>
      <el-table-column align="center" label="短信条数(条)">
        <template slot-scope="scope">{{ scope.row.msg_count }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否上架">
        <template slot-scope="scope">{{ $.cfg.enum.is_added.filter(e => e.id === scope.row.is_added)[0].value }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否推荐">
        <template slot-scope="scope">{{ $.cfg.enum.recommend.filter(e => e.id === scope.row.recommend)[0].value }}</template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import { getList } from '@/api/package'

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
