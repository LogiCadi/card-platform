<template>
  <div class="dashboard-container">
    <panel-group :countArr="[
      {text: '累计完成', num: 2030},
      {text: '今日完成', num: 423},
      {text: '今日申请', num: 23},
    ]" />


    <el-row class="line-chart">
      <line-chart :chart-data="lineChartData" />
    </el-row>
<!--    <panel-row title="客服" :countArr="[res.csToday, res.csApply]" />
    <panel-row title="LR" :countArr="[res.lrToday, res.lrApply]" />
    <panel-row title="RO" :countArr="[res.roToday, res.roApply]" /> -->

  </div>

</template>

<script>
  // import {
  //   mapGetters
  // } from 'vuex'
  import permission from '@/directive/permission' // 权限判断指令
  import PanelGroup from './components/PanelGroup'
  import PanelRow from './components/PanelRow'
  import LineChart from './components/LineChart'
  // import {
  //   getDashboard
  // } from '@/api/dashboard'

  export default {
    name: 'Dashboard',
    components: {
      PanelGroup,
      PanelRow,
      LineChart
    },
    // directives: {
    //   permission
    // },
    data() {
      return {
        re: null,
        lineChartData: [
          [100, 120, 161, 174, 195, 200, 405],
          [120, 82, 91, 154, 162, 140, 145],
          [78, 120, 50, 99, 170, 100, 100]
        ],
        res: {}
      }
    },
    // computed: {
    //   ...mapGetters(['roles'])
    // },
    created() {
      // this.loadData()
    },
    methods: {
      // async loadData() {
      //   // this.res = Object.assign(
      //   //   (await getDashboard(null, 'deposit')).result,
      //   //   (await getDashboard()).result
      //   // )
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;

      .line-chart {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      }
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
