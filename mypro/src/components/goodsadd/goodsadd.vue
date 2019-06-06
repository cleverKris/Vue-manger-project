<template>
  <el-card>
    <!--面包屑导航-->
    <breadNav :nav1="'商品管理'" :nav2="'商品列表'"/>
    <!--消息提示框-->
    <el-alert class="myAlert" title="添加商品信息" type="info" center show-icon></el-alert>
    <!--完成步骤条-->
    <!--
        align-center: 居中
        :active: 设置当前激活步骤
    -->
    <el-steps align-center :active="active" finish-status="success" class="mySteps">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!--tab标签页-->
    <!--
        @tab-click:点击标签页时触发
        tab-position:设置标签的位置
        value:默认选中
    -->
    <el-tabs value="first" class="myTabs" @tab-click="handleClick" tab-position="left">
      <!--1.基本信息-->
      <el-tab-pane label="基本信息" name="first">
        <!--表单-->
        <el-form label-position="top" :rules="rules" :model="addFormObj" status-icon label-width="100px">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input type="text" v-model="addFormObj.goods_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-input type="text" v-model="addFormObj.goods_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-input type="text" v-model="addFormObj.goods_weight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-input type="text" v-model="addFormObj.goods_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            {{ menuSelect }}
            <el-cascader
              :options="menuOptions"
              :props="menuProp"
              v-model="menuSelect"></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!--2.商品参数-->
      <el-tab-pane label="商品参数" name="second">
        <div v-for="item in manyData" class="canshuRow">
          <p class="canshuName">{{ item.attr_name }}</p>
          <div>
            <el-checkbox border v-model="checked" v-for="item1 in item.attr_vals.split(',')">{{ item1 }}
            </el-checkbox>
          </div>
        </div>


      </el-tab-pane>
      <!--3.商品属性-->
      <el-tab-pane label="商品属性" name="third">
        <div v-for="item in onlyData" class="canshuRow">
          <p class="canshuName">{{ item.attr_name }}</p>
          <el-input v-model="item.attr_vals" placeholder="请输入内容"></el-input>
        </div>


      </el-tab-pane>
      <!--4.商品图片-->
      <el-tab-pane label="商品图片" name="fourth">
        <!--
              action:必须的参数 上传的地址 需传入完整的地址
              list-type:文件列表的类型
              file-list:上传的文件列表 [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]

              如果直接这样写:会上传失败 需要手动设置请求头
              headers:设置上传请求的头部 {}

              这个时候就纳闷了 为什么{{ fileList }}始终是一个空数组 其实是需要手动在上传成功钩子中手动追加的
              on-success:文件上传成功时的钩子               function(response, file, fileList)
              on-remove:文件列表移除文件时的钩子            function(file, fileList)
              on-preview:点击文件列表中已上传的文件时的钩子	  function(file)
        -->
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture"
          :file-list="fileList"
          :headers="setHeaders"
          :on-success="uploadSuccess"
          :on-remove="removeImg"
          :on-preview="preview"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        {{ fileList }}
      </el-tab-pane>
      <!--5.商品内容-->
      <el-tab-pane label="商品内容" name="fifth">
        <el-button type="primary" @click="addGoods">添加商品</el-button>
        <quill-editor v-model="content">
        </quill-editor>

      </el-tab-pane>
    </el-tabs>

    <!--图片预览的对话框-->
    <el-dialog title="图片预览" :visible.sync="ImgDialogFormVisible">
      <!--在vue中 使用ref操作dom-->
      <!--解决方式1-->
      <!--<img ref="showImg" :src="imgUrl">-->
      <!--解决方式2-->
      <img ref="showImg">

      <!--使用element-ui中的image组件-->
      <!--<el-image :src="imgUrl"></el-image>-->

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ImgDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
  //引入面包屑导航
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    data() {
      return {
        active: 0, //步骤条的标识
        addFormObj: { //基本信息中的数据源
          goods_name: '',
          goods_price: '',
          goods_weight: '',
          goods_number: ''
        },
        //基本信息中的验证规则
        rules: {
          goods_name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'}
          ],
          goods_price: [
            {required: true, message: '请输入商品价格', trigger: 'blur'}
          ],
          goods_weight: [
            {required: true, message: '请输入商品重量', trigger: 'blur'}
          ],
          goods_number: [
            {required: true, message: '请输入商品数量', trigger: 'blur'}
          ]

        },
        menuOptions: [], //级联菜单中的所有数据
        menuProp: {
          value: 'cat_id', //当前选项对应的值
          label: 'cat_name', //当前选项显示的文本信息
          expandTrigger: 'hover' //hover触发
        },
        menuSelect: [], //当前级联菜单选中的数据 可以设置默认值
        manyData: [], // 商品参数的数据
        onlyData: [], //商品属性的数据
        checked: true, //商品参数的多选框默认选中

        //商品图片
        fileList: [], //文件上传的集合
        setHeaders: { //设置上传的请求头
          Authorization: localStorage.getItem('token')
        },
        ImgDialogFormVisible: false, //控制的是图片预览对话框的显示与隐藏
        imgUrl: '', //预览图片的路径

        content: '', //富文本编辑器中的内容

      }
    },
    methods: {
      //tabs标签页的点击事件
      //参数1:tab   vue实例
      //参数2:event 事件源对象
      async handleClick(tab, event) {
        //将选项卡中的下标修改成当前点击的index值
        // console.log(tab.index); string
        this.active = +tab.index;

        if (this.active === 1 || this.active === 2) {
          if (this.menuSelect.length === 0) {
            this.$message.error('请选择商品分类');
            return;
          }

          //执行到这 说明选择了商品分类 那么应该根据 选择的商品分类 [1,3,6] 去发送请求到服务器
          //console.log(this.menuSelect); //[1, 3, 6]

          //拿到最后一个id
          let id = this.menuSelect[this.menuSelect.length - 1];
          //设置一个参数 知道当前点击的是 商品参数还是商品属性
          let sel = this.active === 1 ? 'many' : 'only';

          //发送请求
          let result = await this.$http.get(`categories/${id}/attributes?sel=${sel}`);
          let {data, meta} = result.data;
          if (meta.status === 200) {
            //根据当前点击的tabs选项卡 来存储数据
            sel === 'many' ? this.manyData = data : this.onlyData = data;
          } else {
            this.$message.error(meta.msg);
          }

          //可以查看到针对不同的tabs选项卡 获取到不同的数据
          // console.log(this.manyData);
          // console.log(this.onlyData);

        }

      },
      //获取级联菜单中的所有数据
      async getAllMenusData() {
        let result = await this.$http.get(`categories?type=3`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.menuOptions = data;
        } else {
          this.$message.error(meta.msg);
        }
      },
      //图片上传-----------------------------
      //该方法是将上传成功的文件保存到 fileList 中
      uploadSuccess(response, file, fileList) {
        // console.log(response); //服务器响应回来的数据 tmp_path:生成的图片名称 url:上传后图片所在的服务器的路径
        // console.log(file); //本次上传文件信息(包含了response)
        // console.log(fileList); //上传的所有文件信息(包含了response&file)
        let {data, meta} = response;
        if (meta.status === 200) {
          this.fileList.push({ //将上传成功的文件保存到fileList中
            name: response.data.tmp_path,
            url: response.data.url
          });

          this.$message({
            type: 'success',
            message: meta.msg
          });
        } else {
          this.$message.error(meta.msg);
        }
      },
      //文件列表移除文件时的方法
      removeImg(file, fileList) {
        // console.log(file); //本次删除的文件的信息  file.name就是当前删除的文件的文件名
        // console.log(fileList); //文件列表移除的所有信息

        //循环遍历 this.fileList, 在数组每一项中找到 当前删除的文件名
        for (var i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].name === file.name) {
            this.fileList.splice(i, 1);  //从i开始删除1项
          }
        }
      },
      //点击文件列表中已上传的文件会触发
      preview(file) {
        //创建一个Dialog对话框 将图片预览在对话框中
        this.ImgDialogFormVisible = true; //显示对话框

        //console.log(file); //当前选中的图片信息

        //1.使用element-ui中的el-image
        //this.imgUrl = file.url;


        //2.使用ref操作dom
        //注意:通过dom去操作vue的页面 页面是不会有数据响应式效果
        //解决方法:
        //        1.将src中的图片数据放到data中
        //         this.imgUrl = file.url;
        //        2.等页面重新渲染时执行这个dom操作 $$nextTick方法(与生命周期有关的方法)
        this.$nextTick(() => {
          this.$refs.showImg.src = file.url;
        })


      },
      //为添加商品 按钮绑定点击事件
      async addGoods() {
        let postAddObj = {
          goods_name: this.addFormObj.goods_name,
          goods_cat: this.menuSelect.join(','),
          goods_price: this.addFormObj.goods_price,
          goods_number: this.addFormObj.goods_number,
          goods_weight: this.addFormObj.goods_weight,
          goods_introduce: this.content
        };

        let result = await this.$http.post('goods', postAddObj);

        let {data, meta} = result.data;
        if (meta.status === 201) {
          this.$message({
            type: 'success',
            message: meta.msg
          });

          //跳转到goods
          this.$router.push('/goods');
        } else {
          this.$message.error(meta.msg);
        }
      }
    },
    created() {
      this.getAllMenusData();
    },
    components: {
      breadNav
    }
  }
</script>

<style lang="less">
  /* less中定义变量 */
  @mt: 20px; /* 上外边距 */

  .myAlert,
  .mySteps,
  .myTabs {
    margin-top: @mt;
  }

  /* 设置步骤条中的文本 */
  .el-step__title {
    font-size: 12px !important;
  }

  /* 商品参数中参数的标题名 */
  .canshuName {
    font-size: 14px;
  }

  /* 商品参数中 各行参数的间隙 */
  .canshuRow {
    margin-bottom: 50px;
  }

  /* 富文本编辑器高度 */
  .ql-editor {
    height: 300px;
  }
</style>
