<template>
  <div>
    <!-- 头部 -->
    <el-container>
      <el-header>
        <heads></heads>
      </el-header>
      <el-container>
        <el-aside width="170px">
          <menus></menus>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import heads from "../components/heads.vue";
import menus from "../components/menu.vue"
export default {
  name: "",
  components: {
    heads,
    menus
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.el-header{
  text-align: center;
  margin: 0;
  padding: 0;
}

.el-aside {
  color: #000000;
  // text-align: center;
  // line-height: 200px;
  margin: 0;
  padding: 0;
}

.el-main {
  // background-color: #e9eef3;
  color: #000;
  // text-align: center;
  // line-height: 160px;
  margin: 0;
  padding: 0;
}
</style>
