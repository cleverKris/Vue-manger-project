<template>
  <div id="container">

  </div>
</template>

<script>
  export default {
    methods: {
      //创建地图对象
      ready: function () {
        var map = new BMap.Map('container');
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 14);
        map.addControl(new BMap.MapTypeControl());
        map.enableScrollWheelZoom(true);
        map.enableDoubleClickZoom(true);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
      }
    },
    mounted() {
      //并调用
      this.ready();
    }
  }
</script>

<style scoped>
  /* 为地图容器设置高度 */
  #container {
    height: 100%;
  }
</style>
