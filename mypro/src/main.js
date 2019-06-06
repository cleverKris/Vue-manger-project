// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' //引入了App.vue
import router from './router'  //引入了路由

//引入element-ui
import elementUi from 'element-ui'
//使用element-ui
Vue.use(elementUi);
//引入element-ui的css样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
//引入element-ui的js文件
import '../node_modules/element-ui/lib/index'

//引入自定义axios插件
import myAxios from './assets/js/myAxios'
//使用插件
Vue.use(myAxios);

//引入element-tree-grid插件
import ElTreeGrid from 'element-tree-grid'
//定义为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid);

//引入自定义moment插件
import myMoment from './assets/js/myMoment'
//使用插件
Vue.use(myMoment);

//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//使用富文本编辑器
Vue.use(VueQuillEditor);

//全局引用地图组件
import BMap from 'BMap'


//引入自定义全局样式
import './assets/css/index.css'

Vue.config.productionTip = false;

new Vue({
  el: '#app',  //绑定的视图容器: index.html中的div#app
  router,      //挂载路由
  components: {App},   //私有组件;在最上面引入了App.vue --> App:{ template: }
  template: '<App/>'   //使用template 将<App/>(组件的缩写) 渲染到index.html中
});
