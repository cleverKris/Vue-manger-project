// 自己封装一个 moment 插件
import moment from 'moment'

//创建一个 moment 插件对象
let myMoment = {};

//为插件对象添加install方法
myMoment.install = function (Vue) {
  //定义全局过滤器
  Vue.filter('MomentFilter', function (value, str) {
    return moment(value).format(str);
  })
};


//暴露
export default myMoment
