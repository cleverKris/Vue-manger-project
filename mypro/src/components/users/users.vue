<template>
  <!--添加一个根组件 el-card:将信息聚合在卡片容器中展示-->
  <el-card>
    <!--添加一个面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--to:等同于路由跳转对象  '/':根目录 但是由于使用了路由重定向 所以会跳转到 /home-->
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--使用Layout布局作为搜索框的根元素-->
    <!--添加一个搜索框-->
    <el-row class="searchBtnRow">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <!--添加用户的按钮-->
      <el-col :span="16">
        <!--为添加用户绑定点击事件-->
        &nbsp;<el-button type="success" plain @click="addDialogForm = true">添加用户</el-button>
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
          <!--开关按钮-->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <!--操作按钮-->
      <!--plain:透明色 size大小:medium / small / mini-->
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
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


  </el-card>
</template>

<script>
  export default {
    //数据
    data: function () {
      return {
        searchValue: '', //搜索框中的内容
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
        addDialogForm: false, //控制Dialog对话框是否显示的boolean值

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
        this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`, {
          headers: { //请求头 发送token
            Authorization: window.localStorage.getItem('token')
          }
        }).then(result => {
          let {data, meta} = result.data;
          if (meta.status === 200) {
            this.tableData = data.users;
          } else {
            this.$message.error('获取当前用户数据失败,请稍后重试');
          }
        })
      },
      //为提交按钮注册点击事件
      postAddForm() {
        //使用ref操作dom,判断表单中的所有元素的输入的数据是否合法
        this.$refs.addForm.validate(valid => {
          if (valid) {
            //使用axios发送post请求到服务器,该接口需要传入token令牌
            //参数1:请求地址 参数2:请求的参数{} 参数3:请求的相关配置{}
            this.$http.post('users', this.formObj, {
              headers: {  //在请求头中设置
                Authorization: window.localStorage.getItem('token')
              }
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
      }


    },
    //生命周期函数 在created中调用methods中的方法
    created() {
      this.getuserListData();
    }
  }
</script>

<style scoped>
  /* 搜索框和登录按钮 */
  .searchBtnRow {
    margin-top: 15px;
  }
</style>
