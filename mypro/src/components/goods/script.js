//引入面包屑导航
import breadNav from '../layout/breadNav/breadNav'

export default {
  //数据
  data() {
    return {
      tableData: [], //表格的数据源
      query: '', //查询参数
      pagenum: 1, //当前页码
      pagesize: 10, //页容量
      total: 0, //数据总数
      pagesizes: [10, 20, 30], //页容量选项
    }
  },
  //方法
  methods: {
    //获取所有商品列表数据
    async getAllGoodsData() {
      let result = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      let {data, meta} = result.data;
      if (meta.status === 200) {
        this.tableData = data.goods;  //得到数据源

        this.total = data.total; //得到总数
      } else {
        this.$message.error(meta.msg);
      }
    },
    //分页组件
    //改变当前页时触发
    handleCurrentChange(val) {
      this.pagenum = val; //修改当前页
      this.getAllGoodsData(); //重新获取数据
    },
    //改变页容量时触发
    handleSizeChange(val) {
      this.pagesize = val; //修改页容量
      this.getAllGoodsData(); //重新获取数据
    },
    //为搜索框的搜索按钮绑定点击事件
    search() {
      //根据搜索内容 重新获取数据
      this.getAllGoodsData();
    },
    //为添加商品按钮绑定点击事件
    toAddPage() {
      //跳转到 /goods/add 的路由下
      this.$router.push(`/goods/add`);
    }
  },
  created() {
    this.getAllGoodsData();
  },
  //私有组件
  components: {
    breadNav
  }
}
