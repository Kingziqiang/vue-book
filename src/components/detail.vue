<template>
    <div class="mask">
      <MHeader :back=true>详请页</MHeader>
        <ul>
          <li>
            <label for="bookName">书的名称</label>
            <input type="text" v-model="book.bookName" id="bookName">
          </li>
          <li>
            <label for="bookInfo">书的信息</label>
            <input type="text" v-model="book.bookInfo" id="bookInfo">
          </li>
          <li>
            <label for="bookPrice">书的价格</label>
            <input type="text" v-model.number="book.bookPrice" id="bookPrice">
          </li>
        </ul>
    </div>
</template>

<script>
    import MHeader from "../base/MHeader.vue";
    import {getOneBook} from "../api";
    export default {
        created(){//页面加载完成获取数据
          this.getData();
        },
      watch:{//只要路径变化重新获取数据
          $route(){
            this.getData();
          }
      },
        data() {
            return {book:{}};
        },
        methods: {
          async getData(){
            this.book= await getOneBook(this.did);
          }
        },
        computed: {
          did(){
            return this.$route.params.did
          }
        },
        components: {MHeader},
    }
</script>

<style scoped lang="less">
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      z-index: 1;
      li{
        display:flex;

      }
    }
</style>
