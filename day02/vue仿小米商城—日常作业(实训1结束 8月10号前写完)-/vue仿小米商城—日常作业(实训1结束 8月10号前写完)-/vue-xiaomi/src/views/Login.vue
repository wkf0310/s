<template>
     <div>首页</div>
</template>


<script>


import  {carousel,login,shoppingCart}  from "@/api/api.js"

export default {
  data() {
    return {
      
    }
  },
  created(){
      //  carousel().then(res=>{
      //     console.log('首页轮播数据',res);
      //  })   

      //登录演示
      login({userName: "zhaixiankui", password: "zxk123456"}).then(res=>{
          console.log('登录成功数据',res);
          localStorage.setItem('user',JSON.stringify(res.data.user))
             console.log('11');
            //每次需要获取登录的，获取下才能拿数据
            let user=JSON.parse(localStorage.getItem('user'))
              console.log('22',user);
              if(user){
                    shoppingCart({user_id:user.user_id}).then(res=>{
                      console.log('获取购物车成功',res);
                        
                  })
              }
       }) 
       
  },
  
  methods: {
    
  },
  
}
</script>
<style lang="scss" scoped>

</style>