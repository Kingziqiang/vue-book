<template>
    <div id="app">
      <MHeader :back="true">添加页</MHeader>
      <div class="content">
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
          <li>
            <label for="bookCover">书的的封面:</label>
            <input type="text" v-model="book.bookCover" id="bookCover">
          </li>
        </ul>
        <button @click="postData">确认添加</button>
      </div>
    </div>
</template>

<script>
  import MHeader from "../base/MHeader.vue";
  import {addBook} from "../api";
    export default {
        data() {
            return {book:{}};
        },
        methods: {
          async postData(){
            if(Object.keys(this.book).length===0) return alert('书名不能为空！！');
            await addBook(this.book);
            alert("添加成功");
            this.$router.push('/list');
          }
        },
        computed: {

        },
        components: {
          MHeader
        },
    }
</script>

<style scoped lang="less">
  ul {
    overflow: hidden;
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
</style>
