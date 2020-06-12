<template>
  <el-tabs tab-position="right" v-model="tabTitle" @tab-click="tabHandle">
    <el-tab-pane v-for="(item, index) in formTitles" :key="index" :label="item" :name="item" />
  </el-tabs>
</template>

<script>
  // 侧边tabs随页面scroll变化
  // 点击tab可平滑滚动到指定tab
  export default {
    data() {
      return {
        formTitles: [],
        tabTitle: '', // tab栏标题
      }
    },
    methods: {
      init() {
        this.generatorTabPos()
        this.comparePos()
        this.listen()
      },
      tabHandle(e) {
        // 点击tab，页面滚动到指定标题位置
        for (let v of this.scrollPosition) {
          if (this.tabTitle === v.title) {
            this.removeListen()
            setTimeout(() => this.listen(), 1000)
            document.querySelector(`#${v.title}`).scrollIntoView({
              block: 'start',
              behavior: 'smooth'
            })
            break
          }
        }
      },
      generatorTabPos() {
        // 生成标题文本
        let arr = []
        for (let v of document.querySelectorAll('h3')) {
          arr.push(v.innerText)
        }
        this.formTitles = arr
        // 统计所有标题的位置
        this.scrollPosition = []
        for (let v of this.formTitles) {
          this.scrollPosition.push({
            title: v,
            pos: document.querySelector(`#${v}`).offsetTop
          })
        }
      },
      comparePos() {
        // 当页面滚动时
        // 比对页面滚动距离与标题位置
        const scrollTop = document.querySelector('.app-wrapper').scrollTop
        for (let v of this.scrollPosition) {
          if (scrollTop - 100 < v.pos) {
            // 当前滚动标题区域，将tabTitle切换
            this.tabTitle = v.title
            break
          }
        }
      },
      listen() {
        // 监听scroll
        window.addEventListener('scroll', this.comparePos, true)
      },
      removeListen() {
        // 关闭监听scroll
        window.removeEventListener('scroll', this.comparePos, true)
      },
    }
  }
</script>

<style>
</style>
