<template>
  <!--根元素-->
  <el-card>
    <!--面包屑导航-->
    <!--使用组件-->
    <bread-nav :nav1="'权限管理'" :nav2="'权限列表'"/>

    <!--表格-->
    <!--:data="tableData" : 数据源-->
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级" width="180">
        <!-- scope.row  : 当前行的数据源 -->
        <template slot-scope="scope">
          {{ scope.row.level ==='0'?'一级':(scope.row.level === '1'?'二级':'三级') }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  //引入子组件
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    //数据
    data() {
      return {
        tableData: [] //所有权限列表
      }
    },
    //方法
    methods: {
      //获取所有权限列表
      async getRightList() {
        let result = await this.$http.get(`rights/list`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.tableData = data;
        }
      }
    },
    created() {
      this.getRightList();
    },
    //定义子组件(私有组件)
    components: {
      breadNav
    }
  }
</script>

<style scoped>

</style>
