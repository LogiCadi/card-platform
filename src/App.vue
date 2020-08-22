<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "App",
  created() {
    this.$.getConfig();
    this.$.getAllAgent();
    this.$.getAllUser();
  },
  methods: {},
};
</script>
