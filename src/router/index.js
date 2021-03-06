import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
//改用路由懒加载
// import Home  from '../components/home.vue';
// import List  from '../components/list.vue';
// import Detail  from '../components/detail.vue';
// import Add  from '../components/add.vue';
// import Collect  from '../components/collect.vue';

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    //添加路由元信息
    {
      path:'/home',
      component:()=>import('../components/home.vue'),
      meta:{keepAlive:true,title:'首页'}//设置缓存，默认不缓存
      },
    {
      path:'/list',
      component:()=>import('../components/list.vue'),
      meta:{title:'列表页'}
    },
    {path:'/add',
      component:()=>import('../components/add.vue'),
      meta:{title:'添加页'}
    },
    {path:'/detail/:did',
      component:()=>import('../components/detail.vue'),
      name:'detail',
      meta:{title:'详请页'}
    },
    {path:'/collect',
      component:()=>import('../components/collect.vue'),
      meta:{title:'收藏'}
    },
    {path:'*',
      redirect:'/home'
    }
  ]
})
