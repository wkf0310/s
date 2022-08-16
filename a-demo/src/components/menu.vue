<template>
  <div>
    <div class="menu">
      <ul>
        <li v-for="(item, index) in list"
         :key="index"
          @click="btn(index)"
          :class="{active:ids==index}"
          >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      list: ["学员管理", "讲师管理", "助教管理"],
      ids:0
    };
  },
  created() {},
  mounted() {},
  methods: {
    //   跳转
    btn(id) {
        this.ids=id
      if (id == 0) {
        this.$router.push("/lecturer");
      } else if (id == 1) {
        this.$router.push("/student");
      } else if (id == 2) {
        this.$router.push("/assistant");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.active{
    color: #39f;
}
ul {
  li {
    color: #000;
    margin: 20px;
  }
}
</style>
