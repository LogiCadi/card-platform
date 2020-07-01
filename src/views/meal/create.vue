<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="自定义套餐名称">
        <el-select style="width: 300px;" v-model="form.operator" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.operator" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原价（元）">
        <el-select style="width: 300px;" v-model="form.region_operator" placeholder="请选择">
          <el-option v-if="item.operator_id === form.operator" v-for="(item, index) in cfg.enum.region_operator" :key="index"
            :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐售价(元)">
        <el-select style="width: 300px;" v-model="form.region_operator_api" placeholder="请选择">
          <el-option v-if="item.region_operator_id === form.region_operator" v-for="(item, index) in cfg.enum.region_operator_api"
            :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡类型">
        <el-select style="width: 300px;" v-model="form.card_type" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.card_type" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用场景">
        <el-select style="width: 300px;" v-model="form.use_scence" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.use_scence" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡规格">
        <el-select style="width: 300px;" v-model="form.card_standard" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.card_standard" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上游套餐">
        <el-select style="width: 300px;" v-model="form.package" placeholder="请选择">
          <el-option v-for="(item, index) in cfg.enum.package" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="卡批次">
        <el-input v-model="form.batch" value="20200615-"></el-input>
      </el-form-item> -->
      <el-form-item label="CSV文件">
        <el-upload class="upload-demo" :action="VUE_APP_BASE_API + '/config/upload'" :on-success="e => { form.csv = e.data.url }">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="模板">
        <el-row>
          <el-button @click="downloadTpl()" size="small" type="primary">移动模板</el-button>
          <el-button @click="downloadTpl()" size="small" type="primary">联通模板</el-button>
          <el-button @click="downloadTpl()" size="small" type="primary">电信模板</el-button>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">录入</el-button>
        <!-- <el-button>取消</el-button> -->
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
