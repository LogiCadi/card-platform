<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-form @submit.native.prevent>
        <el-input v-model="listQuery.name" placeholder="姓名" style="width: 150px;" class="filter-item" />
        <el-input v-model="listQuery.mobileNo" placeholder="手机" style="width: 200px;" class="filter-item" />
        <el-input v-model="listQuery.idNo" placeholder="地区运营商" style="width: 200px;" class="filter-item" />
        <el-input v-model="listQuery.applyId" placeholder="归属代理商" style="width: 200px;" class="filter-item" />

        <el-select v-if="['table'].includes(re)" v-model="listQuery.openStatusList" @change="fetchData" placeholder="卡片状态"
          style="width: 200px" class="filter-item" clearable multiple collapse-tags>
          <el-option v-for="item in openStatus" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-select v-if="['cs_re'].includes(re)" v-model="listQuery.reverseStatus" @change="fetchData" placeholder="审核状态"
          style="width: 120px" class="filter-item" clearable>
          <el-option label="待放弃" :value="1" />
          <el-option label="已放弃" :value="2" />
        </el-select>

        <el-select v-if="['table', 'serv', 'ca', 'lr_pre', 'ro_pre', 'lr', 'ro'].includes(re)" v-model="listQuery.idArea"
          @change="fetchData" placeholder="开户地区" style="width: 120px" class="filter-item" clearable>
          <el-option v-for="item in idArea" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-select v-if="['table', 'cs', 'settle', 'cs_re'].includes(re)" v-model="listQuery.authMethod" @change="fetchData"
          placeholder="认证方式" style="width: 120px" class="filter-item" clearable>
          <el-option v-for="item in authMethod" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-date-picker v-model="dateArr" @change="fetchData" class="filter-item" type="daterange" align="right"
          unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>

        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" native-type="submit" @click="fetchData">搜索</el-button>
      </el-form>
    </div> -->

    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>

      <el-table-column align="center" label="自定义套餐名称">
        <template slot-scope="scope"> {{ scope.row.name }} </template>
      </el-table-column>
      <el-table-column align="center" label="原价(元)">
        <template slot-scope="scope"> {{ scope.row.orign_price }} </template>
      </el-table-column>
      <el-table-column align="center" label="套餐售价(元)">
        <template slot-scope="scope"> {{ scope.row.meal_price }} </template>
      </el-table-column>
      <el-table-column align="center" label="套餐成本(元)">
        <template slot-scope="scope"> {{ scope.row.meal_cost }} </template>
      </el-table-column>
      <el-table-column align="center" label="套餐类型">
        <template slot-scope="scope"> {{ cfg.enum.meal_type.filter(e => e.id == scope.row.meal_type)[0].value }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="套餐周期(月)">
        <template slot-scope="scope"> {{ scope.row.meal_period }} </template>
      </el-table-column>
      <el-table-column align="center" label="通话分钟(分)">
        <template slot-scope="scope"> {{ scope.row.call_mins }} </template>
      </el-table-column>
      <el-table-column align="center" label="流量包大小(MB)">
        <template slot-scope="scope"> {{ scope.row.flow }} </template>
      </el-table-column>

      <el-table-column align="center" label="结算类型">
        <template slot-scope="scope"> {{ cfg.enum.settle_type.filter(e => e.id == scope.row.settle_type)[0].value }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买限制">
        <template slot-scope="scope"> {{ cfg.enum.buy_limit.filter(e => e.id == scope.row.buy_limit)[0].value }}
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />

  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import {
    getList
  } from '@/api/meal'

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

          "page": 1, // 当前页码
          "size": 20, // 每页大小
          "name": "", // 姓名(可选查询)
          "mobileNo": "", // 手机号码(可选查询)
          "idNo": "", // 身份证号(可选查询)
          "applyId": null, // int, 开户id (可选查询)
          "idArea": null, // 开户地区(可选查询)
          "authMethod": null, // 认证方式(可选查询)
          // "openStatus": null, // 开户状态, 见公共枚举(可选查询)
          "openStatusList": config.openStatus.map(e => {
            if (re === e.re) return e.value
          }).filter(e => e),
          "reverseStatus": null,

          "submitTimeStart": "", // 申请时间开始(可选查询)
          "submitTimeFinish": "" // 申请时间结束(可选查询)
        },
      }
    },
    computed: {

    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const getDate = (time) => {
          if (!time) return
          const date = new Date(time)

          return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate()
            .toString()
            .padStart(2, '0')
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
