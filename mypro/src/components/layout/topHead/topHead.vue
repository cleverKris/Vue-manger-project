<!--头部组件-->
<template>
  <el-row class="homeHeaderRow">
    <el-col :span="4" class="homeHeaderCol">
      <div class="grid-content bg-purple">
        <img src="../../../assets/logo.png" alt="" style="width: 60px">
      </div>
    </el-col>
    <el-col :span="16" class="homeHeaderCol">
      <div class="grid-content bg-purple-light">
        <h1>电商后台管理系统</h1>
      </div>
    </el-col>
    <el-col :span="4" class="homeHeaderCol loginOut">
      <div class="grid-content bg-purple">
        <a href="#" @click.prevent="loginOut">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    methods: {
      //为退出按钮注册点击事件
      loginOut() {
        //自定义提示框
        this.$confirm('您确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功'
          });


          //清除token
          localStorage.removeItem('token');
          //跳转到login页面
          this.$router.push({name: 'login'});
          //console.log(localStorage.getItem('token')); //null 代表已经清除成功
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
  /* 头部一整行 */
  .homeHeaderRow {
    height: 60px;
  }

  /* 头部三个区域 */
  .homeHeaderCol {
    height: 100%;
  }

  /* 退出按钮 */
  .loginOut {
    text-align: right;
  }

  .loginOut a {
    text-decoration: none;
    color: green;
  }
</style>
