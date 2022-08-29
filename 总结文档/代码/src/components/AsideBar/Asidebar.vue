<template>
  <div class="home-wrapper">
    <header-box/>
    <el-container>
      <aside-box/>
      <content-box/>
    </el-container>
  </div>
</template>


<script>
// import HeaderBox from "./Header.vue";
// import AsideBox from "./Aside.vue";
// import ContentBox from "./Content.vue";
export default {
  components: {
    HeaderBox: () => import('./Header.vue'),
    AsideBox: () => import('./Aside.vue'),
    ContentBox: () => import('./Content.vue'),
  },
};
</script>


<style>
.home-wrapper {
  width: 100%;
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>