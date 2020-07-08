<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="200px">
      <h3>分配设置</h3>
      <el-form-item label="下级代理商">
        <el-select style="width: 300px;" v-model="form.down_agent_id" placeholder="请选择">
          <el-option v-for="(item, index) in agentList" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
        <el-input v-model="form.down_agent_id" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="下级成本价格">
        <el-input v-model="form.down_cost" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="下级语音阀值(分钟)">
        <el-input v-model="form.down_voice" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="下级流量基础阀值(MB)">
        <el-input v-model="form.down_flow_base" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="下级流量进阶阀值(MB)">
        <el-input v-model="form.down_flow_advance" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="下级流量顶峰阀值(MB)">
        <el-input v-model="form.down_flow_top" style="width: 500px;" class="filter-item" />
      </el-form-item>

      <h3>套餐设置</h3>
      <el-form-item label="自定义套餐名称">
        <el-input v-model="form.name" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="原价(元)">
        <el-input v-model="form.orign_price" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐售价(元)">
        <el-input v-model="form.meal_price" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐成本(元)">
        <el-input v-model="form.meal_cost" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐类型">
        <el-select style="width: 300px;" v-model="form.meal_type" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.meal_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐周期(月)">
        <el-input v-model="form.meal_period" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="通话分钟(分)">
        <el-input v-model="form.call_mins" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="流量包大小(MB)">
        <el-input v-model="form.flow" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="徕纳语音停用阀值(分)">
        <el-input v-model="form.laina_voice" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="徕纳流量停用基础阀值(MB)">
        <el-input v-model="form.laina_flow_base" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="徕纳流量停用进阶阀值(MB)">
        <el-input v-model="form.laina_flow_advance" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="徕纳流量停用顶峰阀值(MB)">
        <el-input v-model="form.laina_flow_top" placeholder style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="结算类型">
        <el-select style="width: 300px;" v-model="form.settle_type" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.settle_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="购买限制">
        <el-select style="width: 300px;" v-model="form.buy_limit" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.buy_limit" :key="index" :label="item.value" :value="item.id"></el-option>
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
  import { postSave } from '@/api/meal'
  export default {
    data() {
      return {
        form: {}
      }
    },
    created() {},
    methods: {
      async submit() {
        await postSave({ form: this.form })

        this.$message({
          message: '操作成功！',
          type: 'success'
        })
        setTimeout(() => this.$router.push('/meal/list'), 500)
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
