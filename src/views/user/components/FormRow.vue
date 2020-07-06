<template>
  <el-row class="form-row">
    <el-col :span="24 / data.length" v-for="(item,index) in data" :key="index">
      <el-form-item :label="item.label">
        <el-input :value="item.value" :class="[item.value]" />
        <!-- <div class="input">{{ item.value }}</div> -->
        <div class="info" v-if="item.value === '✘' && item.info" @click="$emit('show', item.info)">查看说明</div>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
    },
    data() {
      return {
        modalShow: false,
      }
    },
    methods: {
      copy(value) {
        const input = document.createElement('input');
        input.value = value;
        document.body.appendChild(input);
        input.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        input.className = 'input';
        input.style.display = 'none';
        alert('复制成功');
      }
    }

  }
</script>

<style lang="scss">
  .form-row {
    margin: 0 20px;

    .el-form-item__label {
      text-align: center;
      background-color: #F4F4F4;
      padding: 0 10px;
      margin-right: -2px;
    }

    .el-form-item__content {
      display: flex;
    }

    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
      border-radius: 0;
      color: #333;
      font-weight: 600;
      cursor: inherit;
      border: 1px solid #efefef;
      border-left: none;
    }

    .el-input.is-disabled {
      padding-right: 20px;

      &.✔ .el-input__inner {
        color: #025802;
      }

      &.✘ .el-input__inner {
        color: #b50404;
      }
    }

    .info {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 40px;
      cursor: pointer;
      color: #409EFF;
      font-size: 12px;
    }
  }
</style>
