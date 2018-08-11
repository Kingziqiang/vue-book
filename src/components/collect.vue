<template>
    <div id="app">
      <MHeader :back="true">收藏页</MHeader>
      <div class="content">
        <ul>
          <li v-for="item in bookList">
            <div>
              <img v-lazy="item.bookCover" alt="">
            </div>
            <div>
              <h4>{{item.bookName}}</h4>
              <p>{{item.bookInfo}}</p>
              <b>{{item.bookPrice}}</b>
              <div class="btnClick">
                <button @click="sub(item)">&minus;</button>
                {{item.bookCount}}
                <button @click="add(item)">+</button>
              </div>
            </div>
          </li>
          <li>
            <button class="btn">一共收藏了{{sum}}本书</button>
          </li>
          <li>
            <button class="btn" @click="clear">删除所有图书</button>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import MHeader from "../base/MHeader.vue";
  import { mapGetters } from 'vuex'
  import { mapState } from 'vuex'
  export default {
        date() {
            return {};
        },
        methods: {
          add(book){
            this.$store.commit('CHANGEADD',book);
          },
          sub(book){
            if(book.bookCount===1){
              this.$store.commit('DELETE',book);
            }
              this.$store.commit('CHANGESUB',book);
          },
          clear(){
            this.$store.commit('CLEAR');
          }
        },
        computed: {
          bookList:{
          get(){
            let aa= window.localStorage.getItem('val');
            //return JSON.parse(aa);
           return this.$store.state.bookList;
           },
           set(value){
            return value;
           }
          },
          //...mapState(['bookList','count']),
          ...mapGetters(['sum']),
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
    background: deepskyblue;
  }
  .btnClick {
    display: flex;
    justify-content: space-around;
  }
  }
  .btn{
    position: relative;
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
