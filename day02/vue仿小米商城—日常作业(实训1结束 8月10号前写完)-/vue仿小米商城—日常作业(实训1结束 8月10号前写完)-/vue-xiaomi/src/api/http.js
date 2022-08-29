import axios from 'axios'
// import { Message } from 'element-ui' //在js文件中，需单独引入提示

//axios常用封装有哪些？
const server=axios.create({
    // baseURL:'/api', //根路径
    baseURL:'http://101.132.181.9/api',
    timeout:5000, //超时时间
})

//请求拦截器-接口请求的前置拦截，主要放一些请求头协议
server.interceptors.request.use(config=>{
    //放请求头协议
    // let token=localStorage.getItem('token')
    // if(token){
    //     config.headers.Authorization=token
    // }
   
    return config

    },error=>{
        //用pormise把失败的结果导出去，
         Promise.reject(error)
    }
)


//响应拦截器-接口的响应结果，主要放一些常见错误代码处理
server.interceptors.response.use(res=>{
   
    return res
    },error=>{
         //用pormise把失败的结果导出去，
         Promise.reject(error)
    }
)

export default server

































// const server = axios.create({
//     baseURL: 'http://127.0.0.1:8888/api/private/v1',
//     // baseURL: process.env.VUE_APP_API,
//     timeout: 5000
// })
// //请求拦截
// server.interceptors.request.use(config => {
//     //给请求头统一加token，不用每次进后台，每个页面都加了
//     // if (localStorage.getItem('token')) {
//     //     config.headers.Authorization = localStorage.getItem('token');
//     // }
//     return config
// }, error => {
//     Promise.reject(error)
// })
// //响应拦截
// server.interceptors.response.use(res => {
//     //根据自己后端返回状态码，设置统一的错误提醒
// //   if (res.data.meta.status !== 200) {
// //     Message.error({
// //       duration:2000,
// //       message: res.data.meta.msg
// //     })
// //   }
//   return res.data

// }, error => {
//     Promise.reject(error)
// })
// export default server