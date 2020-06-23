<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {
    getConfig
  } from '@/api/common'
  import Vue from 'vue'
  export default {
    name: 'App',
    created() {
      this.getConfig()
    },
    methods: {
      async getConfig() {
        // 动态配置
        const res = await getConfig()
        Vue.prototype.cfg = res.data
      }
    }
  }
</script>
