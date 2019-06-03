<template>
  <!--添加一个根组件 el-card:将信息聚合在卡片容器中展示-->
  <el-card>
    <!--添加一个面包屑导航-->
    <!--使用组件-->
    <bread-nav :nav1="'用户管理'" :nav2="'用户列表'"/><!--to:等同于路由跳转对象  '/':根目录 但是由于使用了路由重定向 所以会跳转到 /home-->

    <!--使用Layout布局作为搜索框的根元素-->
    <!--添加一个搜索框-->
    <el-row class="searchBtnRow">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
          <!--搜索按钮-->
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <!--添加用户的按钮-->
      <el-col :span="16">
        <!--为添加用户绑定点击事件-->
        &nbsp;<el-button type="success" plain @click="alertAdd">添加用户</el-button>
      </el-col>
    </el-row>

    <!--添加表格-->
    <!--data为数据源-->
    <!--border为表格边框-->
    <el-table :border="true" :data="tableData" style="width: 100%">
      <!--id-->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!--用户状态-->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!--{{ scope.row }} -->  <!-- scope.row当前行的数据源 -->
          <!--{{ scope.row.mg_state }} 可以查看到当前状态是true还是false-->
          <!--开关按钮-->
          <el-switch @change="updateStatus(scope.row.id,scope.row.mg_state)" v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <!--操作按钮-->
      <!--plain:透明色 size大小:medium / small / mini-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--{{ scope.row.id }} 可以查看当前用户对应的id-->
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="editUser(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="checkUser(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delUser(scope.row.id)"></el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--新增嵌套表单的Dialog对话框-->
    <el-dialog title="添加用户" :visible.sync="addDialogForm">
      <!-- :rules="rules" :绑定验证规则-->
      <!-- ref='  ' :使用ref操作dom -->
      <el-form ref="addForm" :model="formObj" :rules="rules">
        <!--各个需要新增的文本框-->
        <!--prop 验证规则名-->
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="formObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话" :label-width="formLabelWidth">
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="postAddForm">提 交</el-button>
      </div>
    </el-dialog>

    <!--修改嵌套表单的Dialog对话框-->
    <el-dialog title="修改用户" :visible.sync="editDialogForm">
      <el-form :model="formObj">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <!-- :disabled="true" 禁用文本框-->
          <el-input :disabled="true" v-model="formObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="putEditForm">提 交</el-button>
      </div>
    </el-dialog>

    <!--分配角色嵌套表单的Dialog对话框-->
    <el-dialog title="分配角色" :visible.sync="checkDialogForm">
      <el-form :model="formObj">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          {{ formObj.username }}
        </el-form-item>

        <!--对应的是所有角色的下拉菜单-->
        <el-form-item label="角色" :label-width="formLabelWidth">
          {{ formObj.rid }}
          <!--v-model的值为当前被选中的el-option的 value 属性值-->
          <el-select v-model="formObj.rid" placeholder="请选择">
            <!--当rid值为-1(未设置时) 应该显示对应的文本为请选择-->
            <el-option :value="-1" label="请选择"></el-option>
            <!--label:设置的是option中显示的文本  value:设置的是option的value属性-->
            <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkDialogForm = false">取 消</el-button>
        <el-button type="primary" @click="putUserRole">提 交</el-button>
      </div>
    </el-dialog>


  </el-card>
</template>

<script>
  //引入子组件
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    //数据
    data: function () {
      return {
        pagenum: 1,     //当前显示的页码
        pagesize: 10,  //当前页容量
        tableData: [], //表格中绑定的数据源 是一个数组
        formObj: { //新增表单的双向数据绑定
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        formLabelWidth: '100px', //文本框前文本的宽度
        addDialogForm: false, //控制新增Dialog对话框是否显示的boolean值
        editDialogForm: false, //控制修改Dialog对话框是否显示的boolean值
        checkDialogForm: false, //控制分配角色Dialog对话框是否显示的boolean值
        searchValue: '', //搜索框中的内容
        options: [], //角色分配下拉框中的所有数据
        selectedValue: '',//当前被选中的el-option的 value 属性值

        //设置验证规则
        rules: {
          username: [
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
        }
      }
    },
    //方法
    methods: {
      //得到用户列表中的所有数据
      getuserListData() {
        //请求的接口(带参数)
        this.$http.get(`users?query=${this.searchValue}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
          .then(result => {
            let {data, meta} = result.data;
            if (meta.status === 200) {
              this.tableData = data.users;
            } else {
              this.$message.error('获取当前用户数据失败,请稍后重试');
            }
          })
      },
      //弹出添加用户框
      alertAdd() {
        //弹出添加用户框
        this.addDialogForm = true;
        //清除当前formObj中的数据
        this.formObj = {};
      },
      //为提交按钮注册点击事件
      postAddForm() {
        //使用ref操作dom,判断表单中的所有元素的输入的数据是否合法
        this.$refs.addForm.validate(valid => {
          if (valid) {
            //使用axios发送post请求到服务器,该接口需要传入token令牌
            //参数1:请求地址 参数2:请求的参数{} 参数3:请求的相关配置{}
            this.$http.post('users', {
              username: this.formObj.username,
              password: this.formObj.password,
              email: this.formObj.email,
              mobile: this.formObj.mobile
            })
              .then(result => {
                let {data, meta} = result.data;
                if (meta.status === 201) {
                  //弹出提示框
                  this.$message({
                    type: 'success',
                    message: meta.msg
                  });

                  //重新获取用户列表中的所有数据
                  this.getuserListData();

                  //关闭新增的Dialog对话框
                  this.addDialogForm = false;
                  //清空Dialog中的数据
                  this.formObj.username = '';
                  this.formObj.password = '';
                  this.formObj.email = '';
                  this.formObj.mobile = '';

                } else {
                  this.$message.error(meta.msg);
                }
              })
          } else {
            this.$message.error('您输入的信息有误');
          }
        })
      },
      //为删除按钮注册点击事件
      delUser(id) {
        //自定义删除提示框样式 使用element-ui
        this.$confirm('您确定要删除此条用户数据吗', '删除', {
          confirmButtonText: '是的,我要删除',
          cancelButtonText: '我再想想',
          type: 'error'
        }).then(() => {
          this.$http.delete(`users/${id}`).then(result => {
            let {data, meta} = result.data;
            if (meta.status === 200) {
              this.$message({
                type: 'success',
                message: meta.msg
              });

              //重新获得所有用户列表的数据
              this.getuserListData();
            } else {
              this.$message.error('删除失败');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });

      },
      //监听开关按钮的改变
      updateStatus(id, status) {
        this.$http.put(`users/${id}/state/${status}`).then(result => {
          let {data, meta} = result.data;
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: meta.msg
            });
            //刷新数据
            this.getuserListData();
          } else {
            this.$message.error(meta.msg);
          }

        })
      },
      //搜索
      search() {
        //请求参数是query
        //直接调用getuserListData
        this.getuserListData();
      },
      //点击编辑按钮 打开修改面板  根据id获取当前行编辑的用户信息
      editUser(id) {
        //打开修改面板
        this.editDialogForm = true;

        this.$http.get(`users/${id}`).then(result => {
          let {data, meta} = result.data;
          if (meta.status === 200) {
            //将数据源进行双向数据绑定
            this.formObj = data;
          } else {
            this.$message.error(meta.msg);
          }
        })
      },
      //修改:点击确定按钮 提交修改的数据
      putEditForm() {
        this.$http.put(`users/${this.formObj.id}`, {
          email: this.formObj.email,
          mobile: this.formObj.mobile
        }).then(result => {
          let {data, meta} = result.data;
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: meta.msg
            });

            //关闭修改面板
            this.editDialogForm = false;
            //重新渲染数据
            this.getuserListData();

          } else {
            this.$message.error(meta.msg);
          }
        })
      },
      //为√ 分配角色按钮注册点击事件
      checkUser(id) {
        //显示分配角色的Dialog面板
        this.checkDialogForm = true;

        //1.根据id获取用户信息
        this.$http.get(`users/${id}`).then(result => {
          let {data, meta} = result.data;
          if (meta.status === 200) {
            this.formObj = data; //将获取到的数据都双向绑定到formObj中 (有rid)
          } else {
            this.$message.error(meta.msg);
          }

        })
      },
      //渲染下拉菜单中的数据(角色分配),在页面一加载的时候就调用
      getAllRoleData() {
        this.$http.get(`roles`).then(result => {
          let {data, meta} = result.data;
          if (meta.status === 200) {
            this.options = data;
          } else {
            this.$message.error(meta.msg);
          }
        })
      },
      //点击按钮分配用户角色
      putUserRole() {
        //console.log(this.formObj); //查看当前点击的formObj的数据(重点看id和rid)
        this.$http.put(`users/${this.formObj.id}/role`, {
          rid: this.formObj.rid
        }).then(result => {
          let {data, meta} = result.data;
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: meta.msg
            });


            //重新渲染数据
            this.getuserListData();
          } else {
            this.$message.error(meta.msg);
          }

          //关闭分配角色对话框
          this.checkDialogForm = false;
        })

      }


    },
    //生命周期函数 在created中调用methods中的方法
    created() {
      this.getuserListData();
      this.getAllRoleData();
    },
    //定义子组件(私有组件)
    components: {
      breadNav
    }
  }
</script>

<style scoped>
  /* 搜索框和登录按钮 */
  .searchBtnRow {
    margin-top: 15px;
  }
</style>
