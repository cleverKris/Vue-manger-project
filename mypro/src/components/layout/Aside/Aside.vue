<template>
  <!--菜单栏-->
  <!--:router="true" : 开启vue-router模式-->
  <el-menu :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo"
           background-color="rgb(211,220,230)" text-color="#333"
           active-text-color="rgb(53,73,94)">
    <!--菜单栏的子选项-->
    <el-submenu index="1">
      <!--设置导航的一级菜单-->
      <template slot="title">
        <!--slot:title菜单栏的标题-->
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <!--index="/users" : 等同于请求路由-->
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
      <el-menu-item index="/roles">
        <i class="el-icon-menu"></i>
        <span>角色列表</span>
      </el-menu-item>
      <el-menu-item index="/rights">
        <i class="el-icon-menu"></i>
        <span>权限列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
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
        <span>订单管理</span>
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

</style>
