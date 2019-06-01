# Vue-manger-project
vue &amp; element-ui &amp; vue-cli &amp; vue-router &amp; axios

> mypro 是前端Vue项目，后台的api-server文件夹暂未上传！

## Update

``` bash
# 5.31

  1.使用vue-cli搭建项目结构
  
  2.使用element-ui组件搭建login页面结构
  
  3.使用element-uiForm组件完成验证规则以及表单验证，并且设置弹出提示框的样式
  
  4.全局封装一个axios的插件，为Vue构造器的原型中添加$http方法，为了Vue的实例们可以调用并发送axios请求
  
  5.完成登录成功后跳转到home首页，并对直接 '/' 的路由进行重定向，访问 '/' 会跳转到home页面

# 6.1 happy children day! ^0^
  
  1.使用token完成身份验证
  
  2.使用element-ui中提供的组件完成home.vue组件的头部导航、左侧侧边栏的结构搭建
  
  3.完成了在home.vue中，点击左侧侧边栏的各个选项，在右侧主体内容部分显示对应的组件
  
    3.1路由的嵌套：home.vue和login.vue属于App.vue的私有组件，同时也是路由；用户列表users.vue也是home.vue中的子组件，同时也是它的路由

  4.由于后台提供的api除了登录功能外，其它都需要在请求时，携带token令牌，通过授权才能访问
  
    4.1使用axios的get请求，并且在请求的同时设置请求头存放token，请求服务器，获得所有用户数据并将其渲染3
    
    4.2使用axios的post发送请求给服务器，完成用户的新增功能

  Loading...
```
