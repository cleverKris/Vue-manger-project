//自己封装的一个 axios 插件
//引入Vue构造函数
import Vue from 'vue'
//引入axios
import axios from 'axios'

//创建插件对象
let myAxios = {};

//为插件对象添加一个install方法
//params1:Vue构造函数
myAxios.install = function (Vue) {
  //统一设置axios请求路径
  axios.defaults.baseURL = `http://localhost:8888/api/private/v1`;
  //给Vue构造函数对应的原型中添加方法
  Vue.prototype.$http = axios;  //将来Vue构造函数实例化的对象 可以访问 并且访问时通过this.$http.get() = axios.get()
};


//导出插件对象
export default myAxios
