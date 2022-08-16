<template>
  <div>
      <div class="box">
          <div class="left">
              <img src="/top.png" alt="">
          </div>
          <div class="content">
              <ul>
                  <li v-for="item,index in list" :key="index">
                      <i :class="item.icon"></i>
                      {{item.title}}
                  </li>
              </ul>
          </div>
          <div class="right">
              <img src="/favicon.ico" alt="">
              <i class="el-icon-caret-bottom"></i>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
        list:[
            {   
                title:'用户',
                icon:'el-icon-user'
            },
            {   
                title:'教学',
                icon:'el-icon-s-shop'
            },
            {   
                title:'题库',
                icon:'el-icon-s-management'
            },
            {   
                title:'运营',
                icon:'el-icon-refrigerator'
            },
            {   
                title:'营销',
                icon:'el-icon-menu'
            },
            {   
                title:'商品',
                icon:'el-icon-s-finance'
            },
            {   
                title:'财务',
                icon:'el-icon-s-open'
            },
            {   
                title:'统计',
                icon:'el-icon-picture-outline-round'
            },
            {   
                title:'系统',
                icon:'el-icon-setting'
            },
        ]
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
    .box{
        display: flex;
        height: 60px;
        background-image: linear-gradient(-90deg, #3a94f9,#2b4ac8 );
        align-items: center;
        color: #eee;
        line-height: 60px;
        .left{
            margin-left: 30px;
            img{
                position: relative;
                top: 8px;
            }
        }
        ul{
            display: flex;
            margin-left: 50px;
            li{
                margin-right: 35px;
            }
        }
        .right{
            position: absolute;
            right: 30px;
            img{
                border-radius: 50%;
                position: relative;
                top: 10px;
            }
        }
    }
</style>
