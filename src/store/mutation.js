/*
 * @Author: Lexuec
 * @Date:   2018/8/10 13:11
 * @Last Modified by:   Lexuec
 * @Last Modified time: 2018/8/10 13:11
 */
"use strict";
import * as Types from './mutation-types';

const  mutations = {
  //添加到收藏页
  [Types.ADDCOLLECT](state,book){
    //如果有这本书则加1，如果没有则放进bookList去
    let curBook =state.bookList.find(item=>item.bookId==book.bookId);
    if(curBook){
      curBook.bookCount+=1;//还要更新原数组，光改属性无效
      state.bookList = [...state.bookList];
    }else{
      book.bookCount=1;
      //改变数组要用变异方法，就是改变原数组或者更换原数组
      state.bookList.push(book);
      //state.bookList=[...state.bookList,...book];
    }
    //window.localStorage.setItem('val',JSON.stringify( state.bookList));
  },
  //增加
  [Types.CHANGEADD](state,book){
    let bookList= state.bookList.filter(item=>{
      if(item.bookId==book.bookId){
        return item.bookCount++;
      }
      return item;
    });
    state.bookList=bookList;
  },
  [Types.CHANGESUB](state,book){
    let bookList= state.bookList.filter(item=>{
      if(item.bookId==book.bookId){
        return item.bookCount--;
      };
      return item;
    });
    state.bookList=bookList;
  },

  //当减到1时再减就是清除了
  [Types.DELETE](state,book){
    let a = state.bookList.filter(item=>{
      if(item.bookId!=book.bookId){
        return item;
      }
    });
    console.log(a);
    state.bookList=a;
  },
  //清空
  [Types.CLEAR](state){
    state.bookList=[];
  },
};

export default mutations;
