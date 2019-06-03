//这是我们自己封装的 axios 插件
import axios from 'axios' //引入axios

//创建一个插件对象
let myAxios = {};

//为插件对象添加一个install方法
//params1:Vue构造器
myAxios.install = function (Vue) {
  //为Vue构造器的原型添加一个$http方法 使得Vue构造器的实例对象(组件)可以使用this.$http.get() = axios.get()
  Vue.prototype.$http = axios;
  //统一设置axios请求路径
  axios.defaults.baseURL = `http://localhost:8888/api/private/v1/`;

  //添加一个请求拦截器
  axios.interceptors.request.use(function (config) {
    //console.log(config); //所有的配置信息
    //当接口为login时 不需要设置请求头
    if (config.url !== 'login') {
      //统一设置请求头
      // 此时应该由config发送请求 所以需要给config设置请求头
      // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      config.headers.common['Authorization'] = localStorage.getItem('token');
    }
    //发送请求
    return config;
  });


};

//导出插件对象
export default myAxios
