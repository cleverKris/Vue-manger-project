import Vue from 'vue'
//引入路由
import Router from 'vue-router'
//使用路由
Vue.use(Router);

//引入login组件
import login from '../components/login/login'
//引入home组件
import home from '../components/home/home'
//引入users组件
import users from '../components/users/users'

export default new Router({
  //组件对应的路由选项
  routes: [
    //访问home的第二种方式 根目录:'/',使用路由重定向
    // 方式1:
    // {path: '/', redirect: '/home'}
    // 方式2:
    {path: '/', redirect: {name: 'home'}},
    {path: '/login', component: login, name: 'login'}, //login组件对应的路由选项
    {
      path: '/home', component: home, name: 'home',
      //home父路由 对应的子路由
      children: [
        {path: '/users', name: 'users', component: users} //users组件对应的路由选项
      ]
    } //home组件对应的路由选项 name:别名

  ]
})
