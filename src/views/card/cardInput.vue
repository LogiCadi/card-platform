<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="运营商">
        <el-select v-model="form.operator" placeholder="请选择运营商">
          <el-option v-for="(item, index) in cfg.enum.operator" :key="index" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区运营商">
        <el-select v-model="form.regionOperator" placeholder="请选择地区运营商">
          <el-option v-if="item.operatorId === form.operator" v-for="(item, index) in cfg.enum.regionOperator" :key="index"
            :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营商">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // cfg: this.apiConfig,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    created() {
      console.log(this.enum)
      this.fetchData()
    },
    methods: {
      async fetchData() {

      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="scss">
  .app-container {
    padding: 40px 5%;

    .line {
      text-align: center;
    }
  }
</style>
