/*
 * @Author: Lexuec
 * @Date:   2018/8/6 16:14
 * @Last Modified by:   Lexuec
 * @Last Modified time: 2018/8/6 16:14
 */
"use strict";
let http = require('http');
let fs = require('fs');
let url = require('url');

//获取轮播图 /sliders
let sliders = require('./sliders');

//封装readFile
function read(cb){
  fs.readFile('./books.json','utf8',function(err,data){
    if(err || data.length===0){
      cb([]);//如果有错或者文件没有长度，就是空数组
    }else{
      cb(JSON.parse(data));//将读出来的数据装换为对象
    }
  })
}

function write(data,cb){
  fs.writeFile('./books.json',JSON.stringify(data),cb)
}


http.createServer((req,res)=>{
  //设置跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.setHeader('X-Powered-By','3.2.1');
  if (req.method == 'OPTIONS') {
    return res.end(); /*让options请求快速返回*/
  }
  let {pathname,query} = url.parse(req.url,true);
  if(pathname === '/sliders'){
    res.setHeader('Content-Type','application/json;charset=utf8');
    return res.end(JSON.stringify(sliders));
  };
  if(pathname==='/hot'){
    res.setHeader('Content-Type','application/json;charset=utf8');
    read(function(b){
      let hot = b.reverse().slice(0,6);
      res.end(JSON.stringify(hot));
    })
    return;
  }
  if(pathname==='/books'){
    console.log(req.method);
    let id = parseInt(query.id);
    switch (req.method){
      case 'GET':
        if(!isNaN(id)){
          read(function(books){
            let book = books.find(item=>item.bookId==id);
            if(!book)book={};//没找到就是undefined
            res.setHeader('Content-Type','application/json;charset=utf8');
            res.end(JSON.stringify(book))
          })
        }else{
          res.setHeader('Content-Type','application/json;charset=utf8');
          read(function(book){
            res.end(JSON.stringify(book.reverse()));
            return;
          });
        }
         break;
      case 'POST':

        let str = '';
        req.on('data',chunk=>{
          str+=chunk;
        });
        req.on('end',()=>{

          let book = JSON.parse(str);
          read(function(books){//添加Id

            book.bookId=books.length?books[books.length-1].bookId+1:1;
            books.push(book);//将新数据添加到books中，books在内存中
            write(books,()=>{
              res.end(JSON.stringify(book));
            })

          })
        })
        break;
      case 'PUT':
        if(id){
          let str='';
          req.on('data',chunk=>{
            str+=chunk;
          });
          req.on('end',()=>{
            let book = JSON.parse(str)//转化为对象
            read(function(books){
               books = books.map(item=>{
                 if(item.bookId==id){
                   return book;
                 }
                 return item;//其他书正常返回
               })
              write(books,function(){
                res.end(JSON.stringify(book));
              })
            })
          })
        }

        break;
      case 'DELETE':
        if(id){
          read(function(books){
           let arr=books.filter((item)=>item.bookId!=id);
            write(arr,function(){
              //没啥用
              res.end(JSON.stringify(arr))
            })
          })
        }


        break;
        return;
    }
  }
}).listen(3000);
