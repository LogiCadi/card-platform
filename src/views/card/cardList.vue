<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form @submit.native.prevent>
        <!-- <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" @click="downloads">打印</el-button>s -->
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
        <!-- <el-button v-waves class="filter-item" type="warning" icon="el-icon-download" @click="downloads">批量下载</el-button> -->
      </el-form>
    </div>

    <!-- 表格内容 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>

      <!-- <el-table-column align="center" type="selection" width="70" /> -->
      <el-table-column align="center" label="ICCIDID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>

      <el-table-column label="业务号码" align="center">
        <template slot-scope="scope">{{ scope.row.business_code }}</template>
      </el-table-column>

      <el-table-column label="划拨状态" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.assign_status }}</template>
      </el-table-column>

      <el-table-column label="卡片状态" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.assign_status }}</template>
      </el-table-column>

      <el-table-column label="实名状态" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.assign_status }}</template>
      </el-table-column>

      <el-table-column label="激活时间" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.first_active_time }}</template>
      </el-table-column>

      <el-table-column label="已用流量" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.used_flow_size }}</template>
      </el-table-column>

      <el-table-column label="归属代理商" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.company_name }}</template>
      </el-table-column>

      <el-table-column v-if="['cs_re'].includes(re)" align="center" label="审核状态" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.reverseStatus === 1" type="warning">{{ scope.row.reverseStatusDesc }}</el-tag>
          <el-tag v-if="scope.row.reverseStatus === 2" type="danger">{{ scope.row.reverseStatusDesc }}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="['table'].includes(re)" class="btn" type="primary" size="mini" @click="$router.push(`/openacc/info?id=${scope.row.applyId}&re=${re}`)">查看</el-button>
          <el-button v-if="['table'].includes(re)" class="btn" type="" size="mini" @click="$router.push(`/openacc/log?id=${scope.row.applyId}&re=${re}`)">日志</el-button>

          <el-button v-if="['serv', 'ca', 'lr_pre', 'ro_pre', 'cs', 'settle', 'lr', 'ro'].includes(re)" class="btn"
            type="primary" size="mini" @click="$router.push(`/openacc/info?id=${scope.row.applyId}&re=${re}`)">审核</el-button>

          <el-button v-if="['op'].includes(re)" class="btn" type="primary" size="mini" @click="submitHandle(scope.row)">开通账户</el-button>

          <div v-if="['cs_re'].includes(re)">
            <el-button v-if="scope.row.reverseStatus === 1" class="btn" type="primary" size="mini" @click="submitHandle(scope.row)">放弃</el-button>
            <span v-else>——</span>
          </div>
        </template>
      </el-table-column> -->

      <el-table-column v-if="['table', 'serv', 'ca', 'lr_pre', 'ro_pre', 'lr', 'ro'].includes(re)" label="资料导出" align="center"
        width="220" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button class="btn" size="mini" :disabled="![23, 24, 30, 70].includes(scope.row.openStatus)" type="success"
            :loading="scope.row.download_pdf" @click="download(scope.row.applyId, scope.$index, 'download_pdf')">开户申请表</el-button>
          <el-button class="btn" size="mini" type="warning" :loading="scope.row.download_excel" @click="download(scope.row.applyId, scope.$index, 'download_excel')">
            信息表
          </el-button>
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
    getCardList
  } from '@/api/card'

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
      submitHandle(row) {
        let mainText, postData
        if (this.re === 'op') {
          mainText = '开通'
          postData = {
            applyId: row.applyId, // int, 开户id
            auditStatus: 1, // int, 1-通过,2-驳回,3-不通过
          }
        } else if (this.re === 'cs_re') {
          mainText = '放弃'
          postData = {
            chequeVerifyId: row.id, // 支票核验id
            reverseStatus: 2, // 1 - 待放弃,2 - 已放弃
          }
        }

        this.$confirm(`是否 <b>${mainText}</b> ${row.idName} 的申请`, '提示', {
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(async () => {
          await postSubmit(postData, this.re)
          this.$message({
            message: `${mainText}成功！`,
            type: 'success'
          })
          this.fetchData()
        })
      },

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
