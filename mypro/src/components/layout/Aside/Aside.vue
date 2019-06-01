<!--侧边栏组件-->
<template>
  <!--:router="true" : 开启vue-router模式 -->
  <el-menu :router="true" :unique-opened="true" default-active="2" class="mymenu el-menu-vertical-demo"
           background-color="#fff"
           text-color="#444">
    <!-- 子选项 -->
    <el-submenu index="1">
      <!-- 子选项的标题 -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <!-- 子选项中的子选项：二级选项 -->
      <!--index="/users" : 设置点击跳转的路由-->
      <el-menu-item index="/users">
        <i class="el-icon-menu"></i>
        <span>用户列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span>角色列表</span>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span>权限列表</span>
      </el-menu-item>

    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管事</span>
      </template>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span>分类参数</span>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span>商品分类</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管事</span>
      </template>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span>订单列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span>数据报表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {}
</script>

<style scoped>
  .mymenu {
    height: 100%;
  }
</style>
