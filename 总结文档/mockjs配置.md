###  第三部分   Mock的配置

第一步: 下载mockjs 和express
npm install mockjs express nodemon

### 第二步: 配置json数据

  1  第一步: 新建common文件夹,
  2  第二步: 在common文件下新建
  1  登录接口 login.json
  3   


//登录返回信息

{
 "token":"12wsdff3333333"
}


       \2. loginRead.json


{
 "id": 1,
 "ip": "123.456.77",
 "name": "admin",
 "device": "PC",
 "logintime": "2012-22-33",
 "place": "北京",
}

### 第三步: 编写express服务,在根目录下新增mock文件夹,新建,server.js文件

let express = require('express') //引入express
let Mock = require('mockjs') //引入mock
const loginData = require('./common/login.json')
const loginsearch = require('./common/loginsearch.json')
let app = express() //实例化express

/**登录接口 */
app.use('/user/login', function (req, res) {
 console.log(req, 'req')
 res.json(
  Mock.mock({
   status: 200,
   msg: '登录成功',
   loginData
 })
)
})

/**登录日志 */
app.use('/home/loginsearch', function (req, res) {
 res.json(
  Mock.mock({
   status: 200,
   msg: '登录成功',
   loginsearch
 })
)
})

app.listen('8090', () => {
 console.log('监听端口 8090')
})



### 第四步: 配置package.json

"scripts": {
   // 启动服务
    "serve": "vue-cli-service serve",
     // 启动服务和node服务
    "serve:dev": "vue-cli-service serve & nodemon ./mock/serve.js",
     // 启动test环境项目
    "serve:test": "vue-cli-service serve --mode testing",
     // 打包
    "build": "vue-cli-service build",
     // test环境打包
    "build:test": "vue-cli-service build --mode testing",
     // dev环境打包
    "build:dev": "vue-cli-service build --mode development",
     // 优化代码
    "lint": "vue-cli-service lint",
     // prettier优化代码
    "prettier": "prettier --write .",
     // git格式化
    "prepare": "husky install",
     // git commit 上传描述
    "commit": "cz",
     // 启动mock数据
    "nodemockserve": "nodemon ./mock/serve.js"
  }, 



###  第五步、vue.config.json的配置

const { defineConfig } = require('@vue/cli-service')
let port = 8888

module.exports = defineConfig({
//第三方依赖是否需要转移,避免出现第三方的转移
transpileDependencies: true,
//是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
lintOnSave: false,
//代理端口配置
devServer: {
// 代理的地址
port,

proxy: {
// change xxx-api/login => mock/login
// detail: https://cli.vuejs.org/config/#devserver-proxy

[process.env.VUE_APP_BASE_API]: {

target: process.env.VUE_APP_MOCK_ENABLE === 'true' ? `[http://localhost:9999`](http://localhost:9999`/) : process.env.VUE_APP_CONSOLE_URL,
changeOrigin: true,
pathRewrite: {

['^' + process.env.VUE_APP_BASE_API]: ''

}
}
}
}
}) 





1111

 // "scripts": {

 //  "serve:dev": "vue-cli-service serve & nodemon ./mock/mock.js",

 //  "serve:test": "vue-cli-service serve --mode testing",

 //  "serve:stage": "vue-cli-service serve --mode staging",

 //  "build": "vue-cli-service build",

 //  "build:test": "vue-cli-service build --mode testing",

 //  "build:stage": "vue-cli-service build --mode staging",

 //  "lint": "vue-cli-service lint",

 //  "prettier": "prettier --write .",

 //  "prepare": "husky install",

 //  "commit": "cz"

 // },