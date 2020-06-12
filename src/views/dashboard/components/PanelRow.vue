<template>
  <el-row :gutter="40" class="panel-group">
    <el-col class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ title }}今日完成审核</div>
          <div class="card-panel-row">
            <div class="card-panel-tips">截至5分钟前</div>
            <!-- <count-to :start-val="0" :end-val="countArr[0]" :duration="2600" class="card-panel-num" /> -->
            <div class="card-panel-num">{{ countArr[0] || 0 }}</div>
          </div>
        </div>

        <div class="card-panel-description right">
          <div class="card-panel-text">待审核</div>
          <div class="card-panel-row">
            <div class="card-panel-tips">截至5分钟前</div>
            <!-- <count-to :start-val="0" :end-val="countArr[1]" :duration="2600" class="card-panel-num orange" /> -->
            <div class="card-panel-num">{{ countArr[1] || 0 }}</div>
          </div>
        </div>

        <el-button v-if="title === '客服'" v-permission="['role:account:cc']" @click="$router.push(`/openacc/serv/table`)"
          v-waves class="card-panel-btn" type="primary" icon="el-icon-s-order">去审核</el-button>
        <el-button v-if="title === 'LR'" v-permission="['role:account:lr']" @click="$router.push(`/openacc/lr/table`)"
          v-waves class="card-panel-btn" type="primary" icon="el-icon-s-order">去审核</el-button>
        <el-button v-if="title === 'RO'" v-permission="['role:account:ro']" @click="$router.push(`/openacc/ro/table`)"
          v-waves class="card-panel-btn" type="primary" icon="el-icon-s-order">去审核</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'
  import waves from '@/directive/waves' // waves directive
  import permission from '@/directive/permission/index.js' // 权限判断指令
  export default {
    directives: {
      waves,
      permission
    },
    components: {
      CountTo
    },
    props: {
      title: '',
      countArr: null
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 138px;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-around;

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3;
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3;
      }

      .card-panel-icon-wrapper {
        float: left;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-row {
          display: flex;
          align-items: center;
          position: relative;
        }

        .card-panel-tips {
          position: absolute;
          white-space: nowrap;
          right: 80px;
          color: #999;
          font-size: 10px;
          font-weight: 300;
        }

        .card-panel-num {
          font-size: 20px;

          &.orange {
            color: #FF6F0F;
          }
        }

        &.right {
          margin-right: 15%;
        }


      }

      .card-panel-btn {
        position: absolute;
        right: 10%;
      }
    }
  }

  // @media (max-width: 550px) {
  //   .card-panel-description {
  //     display: none;
  //   }

  //   .card-panel-icon-wrapper {
  //     float: none !important;
  //     width: 100%;
  //     height: 100%;
  //     margin: 0 !important;

  //     .svg-icon {
  //       display: block;
  //       margin: 14px auto !important;
  //       float: none !important;
  //     }
  //   }
  // }
</style>
