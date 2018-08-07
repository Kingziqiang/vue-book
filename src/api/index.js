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

//获取一本图书的接口
export let getOneBook = (id)=>{
  return axios.get(`/books?id=${id}`);
};
//修改某一本图书的接口
/**
 * @param id 要修改图书的编号
 * @param data 修改的内容（请求体）
 * @returns {AxiosPromise<any>}  返回promise对象
 */
export let updateBook = (id,data)=>{
  return axios.put(`/books?id=${id}`,data);
};

//添加书籍
export let addBook = (data)=>{
  return axios.post('/books',data);
};

//整合轮播图和热门图书的接口
export let getAll = ()=>{
  return axios.all([getSliders(),getHotBooks()]);
};


