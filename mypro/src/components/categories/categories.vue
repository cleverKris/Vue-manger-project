<template>
  <el-card>
    <!--面包屑导航-->
    <breadNav :nav1="'商品管理'" :nav2="'商品分类'"/>
    <!--添加分类按钮-->
    <el-row class="addBtnRow">
      <el-col>
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!--表格数据-->
    <el-table :data="pageList" style="width: 100%">
      <!--element-tree-grid插件-->
      <!--treeKey="cat_id"      当前数据的唯一标识  -->
      <!--parentKey="cat_pid"   当前元素的父元素   -->
      <!--levelKey="cat_level"  当前元素的级别-->
      <el-table-tree-column
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        prop="cat_name" label="分类名称"
        treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level"
      ></el-table-tree-column>
      <el-table-column label="级别">
        <template slot-scope="scope">
          {{ scope.row.cat_level === 0 ? '一级' : scope.row.cat_level === 1 ? '二级' : '三级'}}
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效': '有效' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      :page-sizes="pageSizeArr"

      @current-change="currentChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </el-card>
</template>

<script>
  //引入面包屑导航
  import breadNav from '../layout/breadNav/breadNav'

  export default {
    data() {
      return {
        tableData: [], //所有商品分类数据
        //分页组件相关---------------------
        pageList: [], //分页的数据源
        total: 0, //数据的总数
        pageSize: 5, //页容量
        currentPage: 1,//当前页
        pageSizeArr: [5, 10, 15], //所有可选的页容量
      }
    },
    methods: {
      //获取所有商品分类的数据
      async getAllCategories() {
        let result = await this.$http.get(`categories`);
        let {data, meta} = result.data;
        if (meta.status === 200) {
          this.tableData = data;

          //得到数据的总条数
          this.total = data.length;
          //第一次得到分页数据
          this.getPageList();

        } else {
          this.$message.error(meta.msg);
        }
      },
      //分页相关-----------------------
      //得到分页的数据源
      getPageList() {
        //计算开始和结束的数据
        /*
        * console.log(this.tableData, start, end);
        * 第1页 显示的数据 0-5   数组的slice切割方法 (0,5)   实际是0-4   不包括5
        * 第2页 显示的数据 5-10  数组的slice切割方法 (5,10)  实际是5-9   不包括10
        * 第3页 显示的数据 10-15 数组的slice切割方法 (10,15) 实际是10-14 不包括15
        * 以此类推......
        * */
        //   开始 =          当前页 - 1       *  页容量
        let start = (this.currentPage - 1) * this.pageSize;
        //   结束 =   当前页       *  页容量
        let end = this.currentPage * this.pageSize;

        //分页的数据源
        this.pageList = this.tableData.slice(start, end);
      },
      //当当前页发生改变时触发
      currentChange(val) {
        //console.log(val); //改变的当前页

        //修改当前页
        this.currentPage = val;
        //重新获取分页数据
        this.getPageList();

      },
      //当页容量发生改变时触发
      sizeChange(val) {
        //console.log(val); //修改之后的页容量

        //修改页容量
        this.pageSize = val;
        //重新获取分页数据
        this.getPageList();

      }
    },
    created() {
      this.getAllCategories();
    },
    components: {
      breadNav
    }
  }
</script>

<style scoped>
  .addBtnRow {
    margin-top: 10px;
  }
</style>
