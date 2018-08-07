<template>
    <div class="header">
        <slot></slot>
       <i v-if='back' @click="goBack" class="iconfont icon-fanhui"></i>
    </div>
</template>

<script>
    export default {
      props:{
        back:{
          type:Boolean,
          default:false
        },
      },
      methods:{
        goBack(){
          this.$router.go(-1);
        }
      },

    }
</script>

<style scoped lang="less">
    .header {
      position: relative;
      background: #afd9ee;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-weight: 700;
      width: 100%;
      i {
        position: absolute;
        left: 10px;
      }
    }
</style>
