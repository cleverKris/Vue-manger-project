<!--公用的面包屑导航 其中的数据是使用父传子的方式获取的-->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!--使用已经在props中接收到的参数 直接像使用data数据一样-->
    <el-breadcrumb-item>{{ nav1 }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ nav2 }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    //子组件接收父组件传递过来的参数
    props: ['nav1', 'nav2']
  }
</script>

<style scoped>

</style>
