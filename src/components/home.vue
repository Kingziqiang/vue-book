<template>
    <div id="app">
      <MHeader >首页</MHeader>
      <loading v-if="loading"></loading>
      <template v-else>
        <div class="content">
          <Swiper :swiperSlides="sliders"></Swiper>
          <div class="container">
            <h3>热门图书</h3>
            <ul>
              <li v-for="(book,index) in hotBooks">
                <img :src="book.bookCover" alt="">
                <b>{{book.bookName}}</b>
              </li>
            </ul>
          </div>
        </div>
      </template>

    </div>
</template>

<script>
  //1.创建组件 2.注册组件 3.父组件中使用
  import MHeader from '../base/MHeader.vue';
  import Swiper from '../base/Swiper.vue';
  import loading from '../base/loading.vue';
// 获取接口
//import {getSliders,getHotBooks} from '../api';
  import {getAll} from '../api';
    export default {
       created(){
         //this.getSlid();//获取轮播图数据
         //this.getHot();//获取热门图书数据
         this.getData();
        },
      data(){
          return {
            sliders:[],
            hotBooks:[],
            loading:true
          }
      },
      methods:{
        //语法糖代替then
       //async getSlid(){
       //  this.sliders= await getSliders();
       // },
       // async getHot(){//将数据放到sliders中
       //   this.hotBooks = await getHotBooks();
       // },
        async getData(){
          let [sliders, hotBooks] = await getAll();//返回[sliders,books]
          this.sliders=sliders;
          this.hotBooks=hotBooks;
          this.loading=false;
        }


      },
        components: {
          MHeader,Swiper,loading
        },
    }
</script>

<style scoped lang="less">
  .container {
    width: 90%;
    margin: 0 auto;
    h3 {
      color:#555;
      padding:5px 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap;/*默认不换行*/
      li{
        text-align: center;
        width: 50%;
        padding:5px 0;
        img{
          width: 100%;
          }
        }
      }
    }
</style>
