<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
//引入echarts
import echarts from "echarts";

export default {
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    //获取数据
    let result = await this.$http.get(`reports/type/1`);
    let { data, meta } = result.data;
    if (meta.status === 200) {
      this.dataList = data;
    } else {
      this.$message.error(meta.msg);
    }
    var obj = {
      title: {
        text: "堆叠区域图"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      }
    };

    //将数据源的数据 和 原有的数据进行合并
    var option = {
      ...obj,
      ...data
    };

    //由于返回的数据中 的 x轴结构 少了两个属性 所以需要补上
    option.xAxis[0].type = "category";
    option.xAxis[0].boundaryGap = false;

    // 绘制图表
    myChart.setOption(option);
  }
};
</script>

<style scoped>
#main {
  width: 800px;
  height: 400px;
}
</style>
