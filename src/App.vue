<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import { getConfig } from '@/api/common'
  import { getList as getAgentList } from '@/api/agent'
  import { getList as getUserList } from '@/api/user'
  import Vue from 'vue'
  export default {
    name: 'App',
    created() {
      this.getConfig()
      this.getAllAgent()
      this.getAllUser()
    },
    methods: {
      async getAllAgent() {
        Vue.prototype.allAgent = (await getAgentList({ size: 9999 })).data.list
      },
      async getAllUser() {
        Vue.prototype.allUser = (await getUserList({ size: 9999 })).data.list
      },
      async getConfig() {
        const res = await getConfig()
        Vue.prototype.cfg = res.data
      }
    }
  }
</script>
