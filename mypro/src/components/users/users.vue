<!--users.vue组件-->
<template>
  <el-card>
    <!--面包屑导航-->
    <breadNav :nav1="'用户管理'" :nav2="'用户列表'"/>
    <!--搜索框和添加用户的按钮-->
    <el-row class="searchAddRow">
      <!--搜索框-->
      <el-col :span="6">
        <el-input v-model="searchValue" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <!--添加用户按钮-->
      <el-col :span="18">
        <el-button class="addBtn" type="success" plain @click="showAddDialog">添加用户</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :border="true" :data="tableData" style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="username" label="姓名">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <!--用户状态 开关按钮-->
      <el-table-column prop="mg_state" label="用户状态">
        <!--使用template 渲染数据中的 boolean值-->
        <template slot-scope="scope">
          <!--{{ scope.row }}  当前行的数据源 -->
          <el-switch @change="changeStatus(scope.row.id,scope.row.mg_state)" v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>

      </el-table-column>
      <!--按钮-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"
                     @click="showEditUserData(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"
                     @click="showRolesData(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delUser(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增的Dialog对话框-->
    <el-dialog title="新增用户" :visible.sync="addDialogFormVisible">
      <!--大表单-->
      <el-form :rules="rules" ref="addtableForm" :model="formObj">
        <!--表单子元素-->
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="formObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="formObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">新 增</el-button>
      </div>
    </el-dialog>
    <!--修改的Dialog对话框-->
    <el-dialog title="修改用户" :visible.sync="editDialogFormVisible">
      <!--大表单-->
      <el-form :rules="rules" ref="edittableForm" :model="formObj">
        <!--表单子元素-->
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="formObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话" :label-width="formLabelWidth">
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPutUser">修 改</el-button>
      </div>
    </el-dialog>
    <!--√ 分配角色 的Dialog对话框-->
    <el-dialog title="分配角色" :visible.sync="checkDialogFormVisible">
      <!--大表单-->
      <el-form :model="formObj">
        <!--表单子元素-->
        <el-form-item label="用户名" :label-width="formLabelWidth">
          {{ formObj.username }}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!--select组件 下拉框-->
          {{ formObj.rid }}
          <el-select v-model="formObj.rid" placeholder="请选择">
            <!--针对rid为-1时的操作-->
            <el-option :value="-1" :label="'请选择'">
            </el-option>
            <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="putRolesData">确定 分配</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  //引入面包屑组件
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    //数据
    data() {
      return {
        //表格的数据源
        tableData: [],
        pagenum: 1,//当前显示的页码
        pagesize: 10, //页容量
        addDialogFormVisible: false, //控制新增对话框的显示与隐藏
        editDialogFormVisible: false, //控制修改对话框的显示与隐藏
        checkDialogFormVisible: false, //控制分配角色对话框的显示与隐藏
        formLabelWidth: '100px',//添加对话框中文本的宽度
        formObj: { //用户数据源
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        //为新增Dialog对话框中的文本框设置验证规则
        rules: {
          username: [
            // 不能为空             如果为空提示文本      当失去焦点时触发
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ]
        },
        searchValue: '', //搜索框中的内容
        options: [] //下拉框中的数据
      }
    },
    //方法
    methods: {
      //获取所有用户列表的数据
      async getAllUsersList() {
        let result = await this.$http.get(`users?query=${this.searchValue}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.tableData = data.users;
        }
      },
      //为添加用户按钮添加点击事件
      showAddDialog() {
        //初始化数据源中的数据
        this.formObj = {};
        //显示添加用户对话框
        this.addDialogFormVisible = true;
      },
      //为新增按钮绑定点击事件
      addUser() {
        //使用ref操作大表单,查看它的子元素是否符合表验证规则
        this.$refs.addtableForm.validate(async valid => {
          if (valid) {
            //说明全部都符合验证规则
            //使用axios发送post请求
            let result = await this.$http.post(`users`, {
              username: this.formObj.username,
              password: this.formObj.password,
              email: this.formObj.email,
              mobile: this.formObj.mobile,
            });
            let {data, meta} = result.data;
            if (meta.status === 201) {
              this.$message({
                message: meta.msg,
                type: 'success'
              });
              //关闭新增Dialog对话框
              this.addDialogFormVisible = false;
              //重新渲染页面
              this.getAllUsersList();
            } else {
              this.$message.error(meta.msg);
            }

          } else {
            this.$message({
              message: '请填写完整信息',
              type: 'warning'
            });
          }
        })
      },
      //为搜索按钮绑定点击事件
      search() {
        this.getAllUsersList();
      },
      //为编辑按钮绑定点击事件,根据id渲染当前需要修改的用户信息
      async showEditUserData(id) {
        //显示修改Dialog对话框
        this.editDialogFormVisible = true;

        //根据id查询用户信息
        let result = await this.$http.get(`users/${id}`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.formObj = data; //*** 操作了一次formObj ***
        } else {
          this.$message.error(meta.msg);
        }
      },
      //为修改按钮绑定点击事件
      editPutUser() {
        this.$refs.edittableForm.validate(async valid => {
          if (valid) {
            let result = await this.$http.put(`users/${this.formObj.id}`, {
              email: this.formObj.email,
              mobile: this.formObj.mobile
            });
            let {data, meta} = result.data;
            if (meta.status === 200) {
              this.$message({
                type: 'success',
                message: meta.msg
              });

              //关闭修改Dialog对话框
              this.editDialogFormVisible = false;
              //重新渲染页面
              this.getAllUsersList();
            } else {
              this.$message.error(meta.msg);
            }
          } else {
            this.$message({
              type: 'warning',
              message: '请填写完整信息'
            })
          }
        })
      },
      //为删除按钮绑定点击事件
      delUser(id) {
        this.$confirm('您确定要删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(async () => {
          let result = await this.$http.delete(`users/${id}`);
          let {data, meta} = result.data;
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: meta.msg
            });

            //重新渲染页面
            this.getAllUsersList();
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
      //修改用户状态
      async changeStatus(id, status) {
        let result = await this.$http.put(`users/${id}/state/${status}`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          });

          //重新渲染页面
          this.getAllUsersList();
        } else {
          this.$message.error(meta.msg);
        }

      },
      //渲染下拉框中的数据
      async getRolesList() {
        let result = await this.$http.get(`roles`);
        let {data, meta} = result.data;
        this.options = data;
      },
      //为 √ 绑定点击事件 根据id 查询获得当前点击的用户名 和 rid(角色对应的值)
      async showRolesData(id) {
        //显示分配角色Dialog对话框
        this.checkDialogFormVisible = true;

        //根据id查询用户信息
        let result = await this.$http.get(`users/${id}`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.formObj = data; //*** 操作了一次formObj ***
        } else {
          this.$message.error(meta.msg);
        }
      },
      //为分配角色Dialog对话框中的 提交 按钮绑定点击事件
      async putRolesData() {
        //console.log(this.formObj); //可以拿到id值 和 修改后的rid
        let result = await this.$http.put(`users/${this.formObj.id}/role`, {
          rid: this.formObj.rid
        });
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: meta.msg
          });

          //关闭对话框
          this.checkDialogFormVisible = false;
          //刷新页面
          this.getAllUsersList();
        } else {
          this.$message.error(meta.msg);
        }
      }

    },
    //生命周期钩子
    created() {
      this.getAllUsersList();
      this.getRolesList();
    },
    //定义私有私有组件
    components: {
      breadNav
    }
  }
</script>

<style scoped>
  /* 搜索框和添加用户的行 */
  .searchAddRow {
    margin-top: 10px;
  }

  /* 添加用户的按钮 */
  .addBtn {
    margin-left: 10px;
  }
</style>
