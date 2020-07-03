<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="自定义套餐名称">
        <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="原价(元)">
        <el-input v-model="form.orign_price" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐售价(元)">
        <el-input v-model="form.meal_price" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐成本(元)">
        <el-input v-model="form.meal_cost" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐类型">
        <el-select style="width: 300px;" v-model="form.meal_type" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.meal_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐周期(月)">
        <el-input v-model="form.meal_period" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="通话分钟(分)">
        <el-input v-model="form.call_mins" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="流量包大小(MB)">
        <el-input v-model="form.flow" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="徕纳语音停用阀值(分)">
        <el-input v-model="form.laina_voice" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="徕纳流量停用基础阀值(MB)">
        <el-input v-model="form.laina_flow_base" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="徕纳流量停用进阶阀值(MB)">
        <el-input v-model="form.laina_flow_advance" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="徕纳流量停用顶峰阀值(MB)">
        <el-input v-model="form.laina_flow_top" placeholder="" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="结算类型">
        <el-select style="width: 300px;" v-model="form.settle_type" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.settle_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="购买限制">
        <el-select style="width: 300px;" v-model="form.package" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.package" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    postCardInput
  } from '@/api/card'
  export default {
    data() {
      return {
        VUE_APP_BASE_API: process.env.VUE_APP_BASE_API,
        form: {}
      }
    },
    methods: {
      downloadTpl() {
        location.href = process.env.VUE_APP_BASE + '/uploads/template/tpl.csv'
      },
      async submit() {
        await postCardInput({
          form: this.form
        })
        this.$confirm('录入成功！', '提示', {
          confirmButtonText: '跳转列表',
          cancelButtonText: '继续录入',
          type: 'success'
        }).then(() => {
          this.$router.push('/card/list')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 40px 5%;

    .line {
      text-align: center;
    }
  }
</style>
