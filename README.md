## 项目用到less,bootstrap,vuex,axios

```
  npm install less less-loader vuex axios bootstrap
```
- mock模拟数据
- api 代表的是所有的接口
- base 基础组件
- components 页面组件

## 热门图书的功能
- 先写服务端，确保数据能正常返回
- 增加api方法，实现调取数据的功能
- 在那个组件中应用这个api,如果是一个基础组件需要用这些数据，在使用
这个组件的父级中调用这个方法，将数据传递给基础组件

##
- 写一个基础组件
  1. 创建一个.vue文件
  2. 在需要使用这个组件的父组件中引入这个组件
  3. 在组件中注册
  4. 以标签的形式引入
