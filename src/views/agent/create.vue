<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="上级代理商">
        <el-select style="width: 300px;" v-model="form.operator" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.operator" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="代理商名称">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="代理商别名">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="代理商类型">
        <el-select style="width: 300px;" v-model="form.card_type" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.card_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出卡收货人姓名">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="出卡收货人手机号">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="出卡收货地址">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="办公地址">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="联系人">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="联系人职务">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="联系电话">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="联系邮箱">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="代理商级别">
        <el-select style="width: 300px;" v-model="form.card_type" placeholder="请选择">
            <el-option v-for="(item, index) in cfg.enum.card_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算对象（不可修改）">
          <el-select style="width: 300px;" v-model="form.card_type" placeholder="请选择">
            <el-option v-for="(item, index) in cfg.enum.card_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实时分润">
          <el-select style="width: 300px;" v-model="form.card_type" placeholder="请选择">
            <el-option v-for="(item, index) in cfg.enum.card_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="保证金（元）">
          <el-input v-model="form.name" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="客户经理">
          <el-select style="width: 300px;" v-model="form.card_type" placeholder="请选择">
            <el-option v-for="(item, index) in cfg.enum.card_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="代理商简介">
          <el-input v-model="form.name" type="textarea" placeholder="购买页展示" style="width: 500px;" class="filter-item" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">添加</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
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
