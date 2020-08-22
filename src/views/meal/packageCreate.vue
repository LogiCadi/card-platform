<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="运营商">
        <el-select style="width: 300px;" v-model="form.operator" placeholder="请选择">
          <el-option v-for="(item, index) in $.cfg.enum.operator" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区运营商">
        <el-select style="width: 300px;" v-model="form.region_operator" placeholder="请选择">
          <el-option v-if="item.operator_id === form.operator" v-for="(item, index) in $.cfg.enum.region_operator" :key="index"
            :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐名字">
        <el-input v-model="form.name" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐别名(显示在微信公众号购买套餐)">
        <el-input v-model="form.alias" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐价格(元)">
        <el-input v-model="form.price" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="套餐周期(月)">
        <el-input v-model="form.period" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="通话分钟(分)">
        <el-input v-model="form.mins" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="短信条数(条)">
        <el-input v-model="form.msg_count" style="width: 500px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="是否上架">
        <el-select style="width: 300px;" v-model="form.is_added" placeholder="请选择">
          <el-option v-for="(item, index) in $.cfg.enum.is_added" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否推荐">
        <el-select style="width: 300px;" v-model="form.recommend" placeholder="请选择">
          <el-option v-for="(item, index) in $.cfg.enum.recommend" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { postSave } from '@/api/package'
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
        setTimeout(() => this.$router.push('/package/list'), 500)
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
