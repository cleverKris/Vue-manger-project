<template>
  <!--登录框-->
  <div class="loginBox">
    <!--:model="ruleForm" 绑定属性(如果不绑定不会实时更新验证规则的效果的显示)  :rules="rules" 添加验证规则-->
    <!--ref="ruleForm" 使用ref绑定该元素-->
    <el-form :model="ruleForm" :rules="rules" label-position="top" status-icon ref="ruleForm" label-width="100px"
             class="demo-ruleForm">
      <h3>用户登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="loginBtn" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    //数据
    data: function () {
      return {
        ruleForm: { //ruleForm对象 存放着username & password
          username: '',
          password: ''
        },
        //验证规则
        rules: {
          username: [
            //不能为空         如果为空的提示文本        触发的时机
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }

      }
    },
    //方法
    methods: {
      //为登录按钮注册点击事件
      login() {
        //vue中使用ref来操作dom,使用validate方法验证表单中所有元素表单的验证是否符合要求
        this.$refs.ruleForm.validate(valid => {
          //valid:是一个boolean值,所有元素都符合验证规则则为true,反之false
          if (valid) {
            //如果valid为true,说明表单中的元素都符合验证规则
            //那么开始发送请求
            //统一设置过axios的请求路径,相当于:http://localhost:8888/api/private/v1/login
            //提交的参数为 当前页面 双向数据绑定的一个对象 对象中存放着用户名和密码
            this.$http.post('/login', this.ruleForm).then(result => {
              let {data, meta} = result.data;
              if (meta.status === 200) {
                //自定义弹出提示框
                this.$message({
                  message: meta.msg,
                  type: 'success'
                });

                //跳转到 home
                this.$router.push('/home');
              } else {
                this.$message.error(meta.msg);  //用户不存在 or 密码错误
              }
            });


          } else {
            this.$message.error('请输入用户名或密码');
          }
        })
      }
    }
  }
</script>

<style scoped>
  /* 登陆框 */
  .loginBox {
    width: 500px;
    position: absolute; /* 子绝 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 20px;
    padding: 40px;
  }

  /* 登录按钮 */
  .loginBtn {
    width: 100%;
  }
</style>
