<template>
  <el-card>
    <!--面包屑导航-->
    <!--使用组件-->
    <bread-nav :nav1="'权限管理'" :nav2="'角色列表'"/>
    <!--添加角色按钮-->
    <el-row class="addBtnRow"> <!--row:行-->
      <el-col :span="8"> <!--col:列 :span="8" 一行中24份占8份-->
        <el-button type="primary" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :data="tableData" style="width: 100%" :border="true">
      <!--展开行-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- {{ scope.row }} 当前行的数据源 -->
          <!-- 1.添加一个最外层行,一个外层行对应的是一个 -->
          <el-row v-for="item1 in scope.row.children">
            <!--1.1一级权限-->
            <el-col :span="4">
              <el-tag closable>{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!--1.2-->
            <el-col :span="20">
              <!--2.右侧外层行-->
              <el-row v-for="item2 in item1.children">
                <!--2.1二级权限-->
                <el-col :span="6">
                  <el-tag closable type="success">{{ item2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!--2.2三级权限-->
                <el-col :span="18">
                  <el-tag class="t-level" type="warning" closable v-for="item3 in item2.children">
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
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  //引入子组件
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    data() {
      return {
        tableData: [] //角色列表中的数据
      }
    },
    methods: {
      //获取角色列表中的数据
      async getAllRolesData() {
        let result = await this.$http.get('roles');
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.tableData = data;
        }
      }
    },
    created() {
      this.getAllRolesData();
    },
    //定义子组件(私有组件)
    components: {
      breadNav
    }
  }
</script>

<style scoped>
  /* 添加角色按钮 */
  .addBtnRow {
    margin-top: 10px;
  }

  /* 三级权限 */
  .t-level {
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
