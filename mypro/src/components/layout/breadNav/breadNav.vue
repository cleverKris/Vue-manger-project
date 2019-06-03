<!--面包屑导航-->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
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
