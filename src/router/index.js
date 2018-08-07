import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import Home  from '../components/home.vue';
import List  from '../components/list.vue';
import Detail  from '../components/detail.vue';
import Add  from '../components/add.vue';
import Collect  from '../components/collect.vue';

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
    {path:'/list',component:List},
    {path:'/add',component:Add},
    {path:'/detail/:did',component:Detail,name:'detail'},
    {path:'/collect',component:Collect},
    {path:'*',redirect:'/home'}

  ]
})
