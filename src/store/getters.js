/*
 * @Author: Lexuec
 * @Date:   2018/8/10 11:56
 * @Last Modified by:   Lexuec
 * @Last Modified time: 2018/8/10 11:56
 */
"use strict";
const getters ={
  sum:(state)=>state.bookList.reduce((pre,next)=>pre + next.bookCount
    ,0)

};

//导出对象
export default getters;
