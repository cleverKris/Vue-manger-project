<!--login组件-->
<template>
  <!--根元素 Form表单-->
  <div class="box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" status-icon label-width="100px"
             class="demo-ruleForm">
      <!--标题-->
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
        ruleForm: {
          username: '',
          password: ''
        },
        //验证规则
        rules: {
          username: [
            //  不能为空        如为空提示文本          在失去焦点时验证规则
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
        //使用ref操作dom
        //使用validate方法判断该表单中所有元素是否符合它们自己的验证规则
        //params1: valid 是一个boolean值 如果所有元素都符合验证规则则为true 反之为false
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // 那么验证通过就使用axios发送请求
            this.$http.post('login', this.ruleForm).then(result => {
              let {data, meta} = result.data;
              if (meta.status === 200) {
                //自定义弹出登录框样式 使用element-ui中的message
                this.$message({
                  message: meta.msg,
                  type: 'success'
                });

                //将token保存起来
                localStorage.setItem('token', data.token);

                //跳转 /home
                this.$router.push('/home');
              } else {
                this.$message.error(meta.msg); //用户名不存在 or 密码错误
              }
            })
          } else {
            this.$message.error('验证不通过');
          }
        })
      }
    }
  }
</script>

<style scoped>
  /* 表单 */
  .box {
    width: 500px;
    position: absolute; /* 子绝 */
    top: 50%;
    left: 50%;
    background-color: #fff;
    border-radius: 20px;
    padding: 40px;
    transform: translate(-50%, -50%);
  }

  /* 登录按钮 */
  .loginBtn {
    width: 100%;
  }

</style>
