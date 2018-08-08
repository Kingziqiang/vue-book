<template>
    <div id="app">
      <MHeader :back=true>列表页</MHeader>
      <!--为content添加滚动事件-->
      <div class="content" ref="scroll" @scroll="getMore">
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
        <button class="btn" @click="getData()">{{loadMore}}</button>
      </div>
    </div>
</template>

<script>
    import MHeader from '../base/MHeader.vue';
    //用getpage按需加载代替getBooks全部加载
    import {getBooks,getRemoveBook,getPage} from '../api';
    export default {
        created(){
          this.getData();//获取图书数据
        },
        mounted(){
          //可以通过操作dom来来实现滚动事件,不建议
//          this.$refs.scroll.addEventListener('scroll',()=>{
//            console.log(1);
//          })
          //下拉刷新页面
          let curEle = this.$refs.scroll;
          let top = curEle.offsetTop;
          //move方法
          curEle.addEventListener('touchstart',(e)=>{
            if(curEle.scrollTop!=0 || curEle.offsetTop!=top) return;
            let startDistance = e.touches[0].pageY;
            let distance=0;
            //move方法
            let move =(e)=>{
              let target = e.touches[0].pageY;
              distance = target-startDistance;
              if(distance>0){
                if(distance<50){
                  curEle.style.top=distance+top+'px';
                }else {
                  distance=50;
                  curEle.style.top = distance+top+'px';
                }
                //console.log(distance);
              }else{
                curEle.removeEventListener('touchmove',move);
                curEle.removeEventListener('touchend',end);
              };
            };
            let end=(e)=>{
              clearInterval(this.timer);
              this.timer=setInterval(()=>{
                if(distance<=0){
                  clearInterval(this.timer);
                  distance=0;
                  //最后的偏移量
                  curEle.style.top = top+'px';
                  //放手后删除事件防止重复绑定
                  curEle.removeEventListener('touchmove',move);
                  curEle.removeEventListener('touchend',end);
                  //获取数据
                  this.books=[];//先清空数据
                  this.offset=0;
                  this.getData();
                  return;
                }
                distance-=1;
                curEle.style.top = distance+top+'px';
              },1)
            };
            curEle.addEventListener('touchmove',move,false);
            curEle.addEventListener('touchend',end,false);

          },false);


        },
        data() {
            //天添加loading是为了节流和防抖
            return {books:[],offset:0,hasMore:true,loading:false};
        },
        methods: {
          async getData(){
           if(this.hasMore && !this.loading){
             this.loading=true;//加载中
             let{books,hasMore} = await getPage(this.offset);
             this.books=[...books,...this.books];//新获取的书加上原来获取的书
             this.loading=false;//加载后
             this.hasMore =hasMore;
             this.offset=this.books.length;
             //alert(this.offset);
           }
          },
          getMore(){
            //定时器绑定在组件的实例上
            this.timer=setTimeout(()=>{
              //每次先清除定时器
              clearTimeout(this.timer);
              //卷去的高度 可视区域的高度  总高度
              let {scrollTop,clientHeight,scrollHeight}=this.$refs.scroll;
              let goBootom=scrollTop+clientHeight+30;
              //console.log(100);
              if(goBootom>scrollHeight){
                this.getData();
              }
            },60);
          },
          async removeBook(id){
            //删除后台数据
            await getRemoveBook(id);
            //删除前台数据
            //this.getData();多了一次请求
            this.books=this.books.filter((item)=>item.bookId!=id);
          },
        },
        computed: {
          loadMore(){
            return this.hasMore? "加载更多...":"没有更多了^_^"
          }
        },
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
      .btn{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: 40px;
        background: deepskyblue;
        color: white;
        border: none;
        outline: none;
        margin:15px 0;
        border-radius: 10px;
        font-size: 20px;
        width: 90%;
      }
    }
</style>
