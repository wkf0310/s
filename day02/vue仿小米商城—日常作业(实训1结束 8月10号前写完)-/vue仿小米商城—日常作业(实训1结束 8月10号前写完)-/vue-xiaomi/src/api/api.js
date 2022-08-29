import server from './http.js' //导入axios

//首页轮播
const carousel=()=>{
   let data= server.post('/resources/carousel')
   return data
}
const login=(msg)=>{
   let data= server.post('/users/login',msg)
   return data
}
const shoppingCart=(msg)=>{
   let data= server.post('/user/shoppingCart/getShoppingCart',msg)
   return data
}
export  {carousel,login,shoppingCart}
