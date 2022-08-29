<template>
  <el-aside width="150px">
    <el-menu :default-active="paths" class="el-menu-vertical-demo" router>
      <el-menu-item
        :index="item.path"
        v-for="(item, index) in asideList"
        :key="index"
      >
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>


<script>
export default {
  data() {
    return {
      asideList: [],
      paths: "",
    };
  },
  created(){
    this.$axios.get('/asidelist/query').then(res => {
      this.asideList = res.data.data.data
      // console.log(this.asideList);
    })
  }
};
</script>

<style lang="scss" scoped>
.el-aside {
  text-align: center;
  height: 100%;
  overflow: hidden;
}
</style>