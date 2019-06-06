<template>
  <!--菜单栏-->
  <!--:router="true" : 开启vue-router模式-->
  <el-menu :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo"
           background-color="rgb(211,220,230)" text-color="#333"
           active-text-color="rgb(53,73,94)">
    <!--菜单栏的子选项-->
    <el-submenu :index="item1.path" v-for="(item1,index1) in menusList" :key="index1">
      <!--设置导航的一级菜单-->
      <template slot="title">
        <!--slot:title菜单栏的标题-->
        <i class="el-icon-location"></i>
        <span>{{ item1.authName }}</span>
      </template>
      <!--二级菜单-->
      <!--index="/users" : 等同于请求路由-->
      <el-menu-item v-for="(item2,index2) in item1.children" :index=" '/' + item2.path " :key="index2">
        <i class="el-icon-menu"></i>
        <span>{{ item2.authName }}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        menusList: [] //导航数据
      }
    },
    methods: {
      async getMenus() {
        let result = await this.$http.get(`menus`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.menusList = data;
        } else {
          this.$message.error(meta.msg);
        }
      }
    },
    created() {
      this.getMenus();
    }
  }
</script>

<style scoped>

</style>
