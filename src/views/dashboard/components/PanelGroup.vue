<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :md="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ countArr[0].text }}</div>
          <div class="card-panel-num">{{ countArr[0].num || 0 }}</div>
        </div>
      </div>
    </el-col>
    <el-col :md="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="list" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ countArr[1].text }}</div>
          <div class="card-panel-num">{{ countArr[1].num || 0 }}</div>
        </div>
      </div>
    </el-col>
    <el-col :md="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ countArr[2].text }}</div>
          <div class="card-panel-num">{{ countArr[2].num || 0 }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import permission from '@/directive/permission' // 权限判断指令

  export default {

    directives: {
      permission
    },
    props: {
      countArr: {}
    },
    methods: {}
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
        }

        .card-panel-btn {
          margin-right: 40px;
        }
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
