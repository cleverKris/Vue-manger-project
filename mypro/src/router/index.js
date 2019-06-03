//专属路由文件
import Vue from 'vue'

//引入了vue-router
import Router from 'vue-router'
//使用vue-router
Vue.use(Router);

//引入login.vue组件
import login from '../components/login/login'
//引入home.vue组件
import home from '../components/home/home'
//引入users.vue组件
import users from '../components/users/users'
//引入rights.vue组件
import rights from '../components/rights/rights'
//引入roles.vue组件
import roles from '../components/roles/roles'


//暴露路由对象
export default new Router({
  //这是组件对应的路由选项
  routes: [
    //对根目录的路径访问进行处理 使用路由重定向 指向 /home
    //方式1:
    //{path: '/', redirect: '/home'}
    //方式2:
    {path: '/', redirect: {name: 'home'}},
    {path: '/login', component: login, name: 'login'}, //login组件对应的路由选项
    //home组件对应的路由选项  name:别名
    {
      path: '/home', component: home, name: 'home', children: [
        {path: '/users', component: users, name: 'users'}, //home的子路由 users
        {path: '/rights', component: rights, name: 'rights'}, //home的子路由 rights
        {path: '/roles', component: roles, name: 'roles'} //home的子路由 roles
      ]

    }

  ]
})


/*
* 之前路由的写法
* 1.let routes = [ {},{},{} ] 路由选项
* 2.let router = new Router({ routes:routes })
* 3.暴露 export default router
* 4.在main.js中挂载到视图容器上 router
* */
