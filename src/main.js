// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

//导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
//引入样式require styles
import 'swiper/dist/css/swiper.css';
//使用插件
Vue.use(VueAwesomeSwiper);

//导入懒加载插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://p1.so.qhimgs1.com/bdr/_240_/t01b7881611994fe68d.jpg',
  loading: './static/loading.gif',
  attempt: 1
});
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title;
  next();
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
