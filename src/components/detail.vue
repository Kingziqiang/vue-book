<template>
    <div class="mask">
      <MHeader :back=true>详请页:</MHeader>
        <ul>
          <li>
            <label for="bookName">书的名称:</label>
            <input type="text" v-model="book.bookName" id="bookName">
          </li>
          <li>
            <label for="bookInfo">书的信息:</label>
            <input type="text" v-model="book.bookInfo" id="bookInfo">
          </li>
          <li>
            <label for="bookPrice">书的价格:</label>
            <input type="text" v-model.number="book.bookPrice" id="bookPrice">
          </li>
        </ul>
      <button @click="update()">确认修改</button>
    </div>
</template>

<script>
    import MHeader from "../base/MHeader.vue";
    import {getOneBook,updateBook} from "../api";
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
            //如果是空对象则跳转到列表页
            if(Object.keys(this.book).length===0)this.$router.push('/list');
          },
          async update(){
            await updateBook(this.did,this.book);
            alert('修改成功');
            //跳转回列表页
            this.$router.push('/list');
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
      overflow: hidden;
      ul {
        margin: 10px;
        padding: 5px;
        li{
          display:flex;
          width: 100%;
          padding: 10px;
          flex-direction: column;
          input {
            /*border: none;*/
            outline: none;
            margin: 10px 20px 0 0;
            font-size: 20px;
            padding:5px 2px;

          }
          label {
            font-weight: 700;
            font-size: 20px;
            line-height: 40px;
            height: 40px;
          }
        }
      }
      button{
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
