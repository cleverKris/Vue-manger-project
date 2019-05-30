<template>
  <div id="app">


    <!--将来要渲染的容器-->
    <router-view/>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  #app {
    position: relative; /* 父相 */
    width: 100%;
    height: 100%;
  }
</style>
