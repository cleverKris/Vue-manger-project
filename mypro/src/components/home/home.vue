<!--home组件-->
<template>
  <!--布局容器-->
  <el-container>
    <!--头部-->
    <el-header>
      <!--头部组件-->
      <topHead/>
    </el-header>
    <el-container>
      <!--左侧侧边栏-->
      <el-aside width="200px">
        <!--左侧侧边栏组件-->
        <Aside/>
      </el-aside>
      <!--内容区域-->
      <el-main>
        <!--路由的嵌套:home.vue中的子路由需要渲染的容器-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  //引入头部组件
  import topHead from '../layout/topHead/topHead'
  //引入左侧侧边栏组件
  import Aside from '../layout/Aside/Aside'

  export default {
    // //生命周期钩子:实例创建期间最后一个阶段
    // mounted() {
    //   //判断token是否存在
    //   if (!localStorage.getItem('token')) { //如果token不存在说明 没有进行登录的身份验证
    //     //提示框
    //     this.$message({
    //       type: 'warning',
    //       message: '你还没有登录'
    //     });
    //     //跳转到login组件
    //     // 方式1:
    //     // this.$router.push('/login');
    //     // 方式2:
    //     this.$router.push({name: 'login'});
    //   }
    // },
    //私有组件
    components: {
      topHead,
      Aside
    }
  }
</script>

<style scoped>
  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
