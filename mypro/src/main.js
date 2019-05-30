// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入element-ui
import elementUi from 'element-ui'
//引入element-ui的样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
//引入element-ui的js文件
import '../node_modules/element-ui/lib/index'
//使用element-ui
Vue.use(elementUi);

//引入自己封装的myAxios插件
import myAxios from './assets/js/myAxios'
//并且使用插件
Vue.use(myAxios);

//引入全局样式
import '../src/assets/css/index.css'


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app', //对应的是index.html中的div#app
  router, //挂载路由
  components: {App}, //创建一个私有组件
  template: '<App/>' //将App渲染到视图容器中
});
