<template>
  <el-header>
    <div class="img-box">
      <img src="../../assets/a.png" alt="" />
    </div>
    <div class="nav-box">
      <ul>
        <li v-for="item in headerList" :key="item.id">
          <span :class="item.icons">{{ item.names }}</span>
        </li>
      </ul>
    </div>
  </el-header>
</template>


<script>
export default {
  data() {
    return {
      headerList: []
    }
  },
  created() {
    this.$axios.get('/headerlist/query').then(res => {
      this.headerList = res.data.data.data
    })
  },
};
</script>


<style lang="scss" scoped>
.el-header {
  background: linear-gradient(to right, rgb(28, 28, 241), rgb(88, 88, 240));
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  img {
    margin-left: 50px;
    margin-top: 5px;
    margin-right: 55px;
  }
  .nav-box {
    ul {
      width: 1000px;
      li {
        width: 11%;
        height: 60px;
        float: left;
        color: white;
      }
      span {
        display: inline-block;
        height: 35px;
      }
      li:hover span {
        border-bottom: 3px solid greenyellow;
      }
    }
  }
}
</style>