<template>
  <div id="app">
    <router-view></router-view>
    <Tab></Tab>
  </div>
</template>


<script>
  import Tab from './base/Tab.vue';
export default {
  components:{
    Tab
  }

}
</script>

<style>
  *{margin:0;padding:0}
  ul,li{list-style:none}
  a {text-decoration: none}
  input,button {
    appearance: none;
  }
  .content {
    position: fixed;
    top:40px;
    bottom: 50px;
    overflow: auto;
    width: 100%;
  }
</style>
