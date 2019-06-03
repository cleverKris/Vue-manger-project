<template>
  <el-card>
    <!--面包屑导航-->
    <breadNav :nav1="'权限管理'" :nav2="'角色列表'"/>
    <!--表格-->
    <el-table :border="true" :data="tableData" style="width: 100%" class="myTable">
      <!--展开行-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!--1.最外层的行-->
          <el-row v-for="item1 in scope.row.children">
            <!--1.1一级权限-->
            <el-col :span="4">
              <el-tag closable>{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!--1.2 右侧的一列 包含着二级权限以及三级权限-->
            <el-col :span="20">
              <el-row v-for="item2 in item1.children">
                <!--二级权限-->
                <el-col :span="6">
                  <el-tag type="success" closable>{{ item2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!--三级权限-->
                <el-col :span="18">
                  <el-tag type="warning" closable v-for="item3 in item2.children" class="thirdLevel">
                    {{ item3.authName }}
                  </el-tag>
                </el-col>

              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  //引入面包屑子组件
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    //数据
    data() {
      return {
        tableData: [] //表格的数据源
      }
    },
    //方法
    methods: {
      //获取角色列表所有数据
      async getAllRolesData() {
        let result = await this.$http.get('roles');
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.tableData = data;
        } else {
          this.$message.error(meta.msg);
        }
      }
    },
    created() {
      this.getAllRolesData();
    },
    //私有组件
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

  /* 三级权限 */
  .thirdLevel {
    margin-right: 10px;
    margin-bottom: 10px;
  }

</style>
