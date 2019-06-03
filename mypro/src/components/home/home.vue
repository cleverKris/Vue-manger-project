<template>
  <div class="homeCon">
    <el-container>

      <!--头部区域-->
      <el-header>
        <top-head/>
      </el-header>

      <el-container>

        <!--侧边栏区域-->
        <el-aside width="200px">
          <Aside/>
        </el-aside>

        <!--主体内容区域-->
        <el-main class="rightMain">
          <!--将来要渲染到home中的容器-->
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>


  </div>
</template>

<script>
  //引入头部和侧边栏组件 并设置为私有化组件
  import Aside from '../layout/Aside/Aside'
  import topHead from '../layout/topHead/topHead'

  export default {
    //已经渲染好页面的阶段
    mounted() {
      // console.log(localStorage.getItem('token'));  //如果没有token则为null
      if (!localStorage.getItem('token')) { //如果token不存在
        this.$message.error('您还没有登录');
        // 方式1:
        // this.$router.push('/login');
        this.$router.push({name: 'login'});
      }
    },
    //私有组件
    components: {
      Aside,
      topHead
    }
  }
</script>

<style scoped>
  /* 最外层的根元素 */
  .homeCon {
    height: 100%;
  }

  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }

  /* 侧边栏 */
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    background-color: rgb(233, 238, 243);
  }

  /* 主体内容 */
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }

</style>
