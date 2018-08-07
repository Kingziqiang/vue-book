<template>
    <div id="app">
      <MHeader :back=true>列表页</MHeader>
      <div class="content">
        <ul>
          <router-link tag="li" v-for="(item,index) in books" :to="{name:'detail',params:{did:item.bookId}}" :key="index">
            <div>
              <img :src="item.bookCover" alt="">
            </div>
            <div>
              <h4>{{item.bookName}}</h4>
              <p>{{item.bookInfo}}</p>
              <b>{{item.bookPrice}}</b>
              <button @click.stop="removeBook(item.bookId)">删除</button>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
</template>

<script>
    import MHeader from '../base/MHeader.vue';
    import {getBooks,getRemoveBook} from '../api';
    export default {
        created(){
          this.getData();//获取全部图书数据
        },
        data() {
            return {books:[]};
        },
        methods: {
          async getData(){
           this.books = await getBooks();
          },
          async removeBook(id){
            //删除后台数据
            await getRemoveBook(id);
            //删除前台数据
            //this.getData();多了一次请求
            this.books=this.books.filter((item)=>item.bookId!=id);
          },
        },
        computed: {},
        components: {MHeader},
    }
</script>

<style scoped lang="less">
    .content {
        li{
          display: flex;
          padding: 8px;
          img{
            width:130px;
            height: 150px;
          }
          h4{
            padding:5px 0;
          }
          p {
            line-height:24px;
          }
          b{
            padding:10px 0;
            display: block;
          }
          button {
            width: 50px;
            height: 30px;
            color: white;
            border-radius: 10px;
            border: none;
            outline: none;
            background: firebrick;
          }
        }
    }
</style>
