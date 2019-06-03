<template>
  <div id="app">

    <!--将来要渲染的视图容器-->
    <router-view/>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  #app {
    position: relative; /* 父相 */
    width: 100%; /* 继承index.html中的body */
    height: 100%;
  }
</style>
