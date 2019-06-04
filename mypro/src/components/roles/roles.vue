<template>
  <el-card>
    <!--面包屑导航-->
    <breadNav :nav1="'权限管理'" :nav2="'角色列表'"/>
    <!--添加角色按钮-->
    <el-row class="addBtnRow">
      <el-col>
        <el-button plain @click="showAddDialog">添加角色</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :border="true" :data="tableData" style="width: 100%">
      <!--展开行-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!--1.最外层的行-->
          <el-row v-for="item1 in scope.row.children">
            <!--1.1一级权限-->
            <el-col :span="4">
              <el-tag @close="myClose(scope.row.id,item1.id,scope)" closable>{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!--1.2 右侧的一列 包含着二级权限以及三级权限-->
            <el-col :span="20">
              <el-row v-for="item2 in item1.children">
                <!--二级权限-->
                <el-col :span="6">
                  <el-tag @close="myClose(scope.row.id,item2.id,scope)" type="success" closable>{{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!--三级权限-->
                <el-col :span="18">
                  <el-tag @close="myClose(scope.row.id,item3.id,scope)" type="warning" closable
                          v-for="item3 in item2.children"
                          class="thirdLevel">
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
          <!--{{ scope.row }}-->
          <el-button type="primary" icon="el-icon-edit" plain size="mini"
                     @click="showEditDialog(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="showTree(scope)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delRoles(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加角色Dialog对话框-->
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form :rules="rules" :model="formObj">
        <el-form-item prop="roleName" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="formObj.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="formObj.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postAddRoles">添 加</el-button>
      </div>
    </el-dialog>
    <!--修改角色Dialog对话框-->
    <el-dialog title="编辑角色" :visible.sync="editDialogFormVisible">
      <el-form :rules="rules" :model="formObj">
        <el-form-item prop="roleName" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="formObj.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="formObj.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="editRoles">修 改</el-button>
      </div>
    </el-dialog>
    <!--权限分配的Dialog对话框-->
    <el-dialog title="权限分配" :visible.sync="rolesDialogFormVisible">
      <!--
          :data:  数据源(数组)
                  特点:如果数据源中有children 会以递归的方式去生成数据 展示
          :props: (对象)指定数据源中 显示的文本属性 以及 子选项的属性
                 { label:'指定数据源中 显示的文本属性' ,children: '子选项的属性' }
          show-checkbox:显示多选框

          :default-expanded-all : 展开所有项true
          :default-expanded-keys="[2, 3]"

          特点: 为父元素选中 子元素默认被选中
          node-key : 设置当前节点的唯一标识
          :default-checked-keys : 设置默认选中(传入权限的id)
      -->
      <el-tree :data="rightsList" show-checkbox :props="props" :default-expand-all="true"
               :default-checked-keys="defaultChecked"
               ref="tree" node-key="id"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="setRights">提交 权限</el-button>
      </div>
    </el-dialog>


  </el-card>
</template>

<script>
  //引入面包屑子组件
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    //数据
    data() {
      return {
        tableData: [],//表格的数据源
        addDialogFormVisible: false, //控制添加角色的Dialog对话框的显示和隐藏
        editDialogFormVisible: false, //控制修改的Dialog对话框的显示和隐藏
        rolesDialogFormVisible: false,//控制权限分配的Dialog对话框
        //数据源
        formObj: {
          roleName: '',
          roleDesc: ''
        },
        formLabelWidth: '100px', //控制对话框中的文本宽度
        //验证规则
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          roleDesc: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ]
        },
        //权限分配对话框中的内容
        rightsList: [], //所有的权限数据
        props: { //指定数据源中 显示的文本属性 以及 子选项的属性
          label: 'authName',
          children: 'children'
        },
        defaultChecked: [], //默认选中的id
        rolesId: '', //当前需要进行权限分配的角色id
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
      },
      //为添加角色按钮绑定点击事件
      showAddDialog() {
        //清空之前的数据
        this.formObj = {};
        //显示添加角色对话框
        this.addDialogFormVisible = true;

      },
      //为添加按钮绑定点击事件
      async postAddRoles() {
        let result = await this.$http.post(`roles`, {
          roleName: this.formObj.roleName,
          roleDesc: this.formObj.roleDesc
        });
        let {data, meta} = result.data;
        if (meta.status === 201) {
          this.$message({
            type: 'success',
            message: meta.msg
          });
          //关闭对话框
          this.addDialogFormVisible = false;

          //刷新页面
          this.getAllRolesData();
        } else {
          this.$message.error(meta.msg);
        }
      },
      //点击编辑按钮 渲染当前需要修改的数据 到对话框中
      async showEditDialog(id) {
        //打开对话框
        this.editDialogFormVisible = true;

        let result = await this.$http.get(`roles/${id}`);
        let {data, meta} = result.data;
        if (meta.status === 200) { // *** 操作了一次 formObj ***
          this.formObj = data;
          /*
          * formObj:-----------------------------
          * roleDesc:技术负责人
          * roleId:30
          * roleName: '主管'
          * rolePermissionDesc: '各种可以管理的权限'
          * */
        } else {
          this.$message.error(meta.msg);
        }
      },
      //点击修改按钮 提交修改的数据
      async editRoles() {
        let result = await this.$http.put(`roles/${this.formObj.roleId}`, {
          roleName: this.formObj.roleName,
          roleDesc: this.formObj.roleDesc
        });
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'  //因为响应回的文本语义有问题 此处自定义了
          });
          //刷新页面
          this.getAllRolesData();
        } else {
          this.$message.error(meta.msg);
        }
        //关闭对话框
        this.editDialogFormVisible = false;
      },
      //删除角色
      delRoles(id) {
        this.$confirm('您确定要删除此角色吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(async () => {
          let result = await this.$http.delete(`roles/${id}`);
          let {data, meta} = result.data;
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: meta.msg
            });

            //刷新页面
            this.getAllRolesData();
          } else {
            this.$message.error(meta.msg);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //为标签的 'x' 注册关闭事件
      async myClose(rolesid, rightid, scope) {
        let result = await this.$http.delete(`roles/${rolesid}/rights/${rightid}`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          scope.row.children = data;   //更新当前行的数据源
          this.$message({
            type: 'success',
            message: meta.msg
          });

        } else {
          this.$message.error(meta.msg);
        }

      },
      //为 √ 按钮 注册点击事件
      async showTree(scope) {
        //清空之前残留的权限
        this.defaultChecked = [];

        //保存当前需要进行权限分配的角色的id
        this.rolesId = scope.row.id;


        this.rolesDialogFormVisible = true;
        //发送请求
        let result = await this.$http.get(`rights/tree`);
        let {meta, data} = result.data;
        if (meta.status === 200) {
          this.rightsList = data; //所有权限数据

          //设置默认选中的权限 只需要操作三级权限即可
          scope.row.children.forEach(item1 => { //一级权限
            item1.children.forEach(item2 => { //二级权限
              item2.children.forEach(item3 => { //三级权限
                //console.log(item3.id); //得到当前行的选中的所有三级权限的id
                //加入到 :default-checked-keys  默认选中的id的数组中
                this.defaultChecked.push(item3.id);
              })
            })
          })

        } else {
          this.$message.error(meta.msg);
        }

      },
      //为权限分配的Dialog 确定按钮 绑定点击事件
      async setRights() {
        //得到当前需要进行权限分配的是角色id是 this.rolesId
        //得到新设置的权限id
        //console.log('全选的:' + this.$refs.tree.getCheckedKeys());
        //console.log('半选的:' + this.$refs.tree.getHalfCheckedKeys());
        //使用展开运算符进行数组的合并
        let setRightsId = [...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()];
        //数组转为字符串
        let str = setRightsId.join(',');

        //发送请求给服务器
        let result = await this.$http.post(`roles/${this.rolesId}/rights`, {
          rids: str
        });
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          });

          //重新获取数据
          this.getAllRolesData();
        } else {
          this.$message.error(meta.msg);
        }

        //无论修改成功与否,都要关闭对话框
        this.rolesDialogFormVisible = false;
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
  /* 添加角色按钮 */
  .addBtnRow {
    margin: 5px 0;
  }

  /* 三级权限 */
  .thirdLevel {
    margin-right: 10px;
    margin-bottom: 10px;
  }

</style>
