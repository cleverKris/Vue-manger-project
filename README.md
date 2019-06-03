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
    
# 6.3

  1.完成用户列表的增删改查
  
  2.完成用户状态的修改，但是发现即使当用户状态修改为启用时(绿色)，登录后台管理系统也会被拒绝，原因是因为：该用户并未被分配角色，也就代表的没有足够的权限
  
  3.在用户列表中完成分配角色，每个角色都对应着不同的权限，每级权限意味着访问页面时，所展示的信息会有差异，权限越高可访问可操作性越高
  
  4.使用请求拦截器interceptors完成axios除了在login路由之外统一设置请求头的操作
  
  5.使用ES7的语法，async & await 优化了所有代码因为异步操作-回调函数而阅读性不高的问题
  
  6.完成了rights.vue-权限管理-权限列表的所有数据渲染
  
  7.完成了roles-vue-权限管理-角色列表所有数据的渲染
  
    7.1使用element-ui中提供的table组件中的展开行 ">" ，使用三层循环嵌套的 row > col 关系完成以'list列表'显示权限结构图

  8.封装了 breadNav.vue 面包屑导航，并使用组件之间的传参 > 父传子接的方式完成各个组件中的面包屑导航

  Loading...
```
