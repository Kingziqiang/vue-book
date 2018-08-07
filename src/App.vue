<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

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
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: all 0.3s linear;

  }
  .fade-leave-active {
    transition: all 0.3s linear;
    opacity: 0;
  }
</style>
