<template>
  <div>
    <el-form ref="form" class="input-form" label-width="150px">
      <div class="row">
        <el-radio-group v-model="auditStatus">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="2">驳回</el-radio>
          <el-radio v-if="['lr_pre', 'ro_pre', 'lr', 'ro'].includes(re)" :label="3">不通过</el-radio>
        </el-radio-group>
      </div>

      <div class="row" v-loading="loading">
        <div class="checkbox-wrap" :class="{'top-line': [21, 25, 29].includes(item.value)}" v-if="item.dictCode === curCode"
          v-for="(item, index) in rejectList" :key="index">
          <el-checkbox class="checkbox" v-model="item.checked">{{ item.valueDesc }}</el-checkbox>
          <el-input v-if="~item.valueDesc.indexOf('原因')" :disabled="!item.checked" class="input" v-model="item.desc"
            placeholder="请输入原因" />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {
    getRejectEnum,
    postSubmit,
  } from '@/api/openacc'

  import permission from '@/directive/permission' // 权限判断指令

  export default {
    directives: {
      permission
    },
    props: ['name', 'applyId', 'fetchData', 're'],
    data() {
      return {
        auditStatus: 1, // int, 1-通过,2-驳回,3-不通过
        rejectList: [],

        loading: false,
      }
    },
    computed: {
      curCode() {
        if (this.auditStatus === 2) {
          // 驳回
          if (['cs', 'settle'].includes(this.re)) {
            return 'chequeVerifyReason'
          } else {
            return 'rejectReason'
          }
        } else if (this.auditStatus === 3) {
          // 不通过
          return 'refuseReason'
        }
      },
    },
    created() {},
    watch: {
      auditStatus() {
        this.fetchRejectEnum()
      }
    },
    methods: {
      // 提交审核
      submit() {
        const auditDesc = this.auditStatus === 1 ? '通过' : this.auditStatus === 2 ? '驳回' : '不通过'
        this.$confirm(`是否 <b>${auditDesc}</b> ${this.name} 的申请`, '提示', {
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(async () => {
          await postSubmit({
            applyId: this.applyId, // int, 开户id
            auditStatus: this.auditStatus, // int, 1-通过,2-驳回,3-不通过
            rejectReason: this.rejectList.map(e => {
              if (e.checked) {
                return {
                  code: e.dictCode,
                  value: e.value,
                  desc: e.desc
                }
              }
            }).filter(e => e)
          }, this.re)
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          this.fetchData()
        })
      },
      async fetchRejectEnum() {
        // 获取驳回枚举
        this.loading = true
        const res = await getRejectEnum()
        this.rejectList = res.result.dictList
        this.loading = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  .input-form {
    margin: 20px;
    box-shadow: 0px 1px 2px rgba(#333, 0.3);
    padding: 20px;
    border-radius: 5px;

    .row {
      margin: 20px;
      // padding: 20px;

      .checkbox-wrap {
        // display: inline-block;
        margin: 10px 0;

        &.top-line {
          padding-top: 20px;
          margin-top: 20px;
          border-top: 1px solid #efefef;
        }

        .checkbox {
          margin: 10px;
        }

        .input {
          margin: 0 20px;
          width: 300px;
        }
      }
    }
  }
</style>
