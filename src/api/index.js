/*
 * @Author: Lexuec
 * @Date:   2018/8/6 16:45
 * @Last Modified by:   Lexuec
 * @Last Modified time: 2018/8/6 16:45
 */
"use strict";
import axios from 'axios';
//添加默认的请求的路径
axios.defaults.baseURL = 'http://localhost:3000';

//响应拦截器
axios.interceptors.response.use((res)=>{
  return res.data;
  //在这里统一拦截结果，把结果处理成res.data
});
//获取轮播图的数据，返回一个promise对象
export  let getSliders =()=>{
  return axios.get('/sliders');
}

//获取热门图书的接口

export  let getHotBooks =()=>{
  return axios.get('/hot');
};

//获取图书的接口
export  let getBooks =()=>{
  return axios.get('/books');
};

//删除一本图书的接口
export let getRemoveBook =(id)=>{
  return axios.delete(`/books?id=${id}`);
};

export let getOneBook = (id)=>{
  return axios.get(`/books?id=${id}`);
}
