<template>
  <el-card>
    <!--面包屑导航-->
    <breadNav :nav1="'权限管理'" :nav2="'权限列表'"/>
    <!--表格-->
    <el-table :border="true" :data="tableData" style="width: 100%" class="myTable">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <template slot-scope="scope">
          {{ scope.row.level === '0' ? '一级' : (scope.row.level === '1' ? '二级' : '三级') }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    //数据
    data() {
      return {
        tableData: [] //表格中的数据源
      }
    },
    //方法
    methods: {
      //获取所有权限数据
      async getAllRightsData() {
        let result = await this.$http.get(`rights/list`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.tableData = data;
        } else {
          this.$message.error(meta.msg);
        }
      }
    },
    //生命周期钩子 created是最早可以访问data和methods的阶段
    created() {
      this.getAllRightsData();
    },
    //定义私有组件
    components: {
      breadNav
    }
  }
</script>

<style scoped>
  /* 表格 */
  .myTable {
    margin-top: 10px;
  }
</style>
