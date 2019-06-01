<!--头部组件-->
<template>
  <!--栅格化布局-->
  <el-row>
    <!--logo图片-->
    <el-col :span="4" class="headStyle">
      <div class="grid-content bg-purple">
        <img src="../../../../static/logo.png" alt="">
      </div>
    </el-col>
    <!--标题-->
    <el-col :span="16" class="headStyle">
      <div class="grid-content bg-purple-light">
        <h1>电商后台管理系统</h1>
      </div>
    </el-col>
    <!--退出按钮-->
    <el-col :span="4" class="headStyle login">
      <div class="grid-content bg-purple">
        <a href="#" @click.prevent="loginout">退出</a>
      </div>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    methods: {
      //为退出按钮注册一个点击事件
      loginout() {
        //自定义退出提示框的样式 使用element-ui
        this.$confirm('您确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          });
          //清空token
          localStorage.removeItem('token');
          //跳转到登录页面
          this.$router.push({name: 'login'});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '退出已取消'
          });
        });


      }
    }
  }
</script>

<style scoped>
  /* 头部中的样式 */
  /* 图片 标题 退出按钮 统一样式: */
  .headStyle {
    height: 60px;
  }

  .login {
    text-align: right;
  }

  .login a {
    text-decoration: none;
    color: green;
  }
</style>
