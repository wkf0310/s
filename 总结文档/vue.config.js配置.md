### 配置

```js
module.exports = {
productionSourceMap: false，//生产环境的构造
publicPath: '.',//根目录
outputDir: 'dist'，//打包输出文件地址
assetsDir: 'assets ' ,//放置生成的静态资源js、css.img、fonts)的(相对于 outputDir的)目录。devServer: { //dev环境下，webpack-dev-server相关配置
port: 8090, //开发运行时的端口
host: '0.0.0.0'，//开发运行时域名，设置成*0.0.0.0' ,在同一个局域网下，如果你的项目在运行，同时可以通过你的
http://ip:port/...访问你的项目
https: false，//是否启用https
open: true,//npm run serve 时是否直接打开浏览器冕
//如果你的前端应用和后端API服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到API服务器。这个问题可以通过vue. config.j5中的devServer.proxy 选项来配置。
//配置代理
//默认值是一个字符串或对象stringl0bject
//设置eslint校验错误信息,显示, warning信息不显示
overlay: {
warnings: false,errors: true
}，
configureWebpack:
proxy: {
" / api ':{
changeOrigin:true，//配置代理默认开启target方式secure:false,如果是http接口，需要配置该参数
target: PROXY_API_BASE_URL,
pathRewrite:{
"A/api": ""}
}，
" /webapps ' :{
target: PROXY_BASE_URL,pathRewrite:{
"/webapps":"/webapps"
}

```

```js
对应的nginx的配置
http {
include        mime.types;
default-type   application/octet-stream;
sendfile       on;
server {
listen         8081;
server_name    192.168.10.8;
location / {
     root E:/code/ web/dist;
    index index.html;
    try_files $ugi Suri/ /index.html;
}
location /api/ {
    proxy_pass http://192.168.10.9:8090/ ;#必须斜杠/结尾
    proxy_set header X-Forwarded-Proto $scheme;
    proxy_set_header Host              $http_host;
    proxy_set_header X-Real-IP         $remote_addr;
}
error_page 500 502 503 504 /50x.html;
location = /5ox.html {
root html;
}
}
}
```

```js
module.exports={
//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求index的 HTML是被 Vue CLI 自动生成的。如果你无法使用Vue CLI 生成的index HTML，你可以通过将这个选项设为 false来关闭文件名哈希。
//默认值是true
filenameHashing:false,
//在 multi-page (多页)模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
//其值应该是一个对象,对象的key是入口的名字,value是;
//一个指定了entry，template，filename，title和 chunks的对象(除了entry 之外都是可选的);或一个指定其entry的字符串。
//pages用于多页配置,默认时undefined
//注:当在 多页应用模式下构建时,webpack 配置会包含不一样的插件（这时会存在多个html-webpock-plugin 和 preloed-webpack-plugin的实例)。如果你试图修改这些插件的选项，请确认运行 vue inspect.
//默认值是undefined
pages:{
   index:{
 //page的入口文件
   entry : "src/index/main.js"，
 //模板文件来源
    template: "public/index.html""，
//在dist/index. html的输出文件
     filename : "index.html""，
 //当使用页面的title选项时，
 //template中的title标签需要是<%= htmlWebpackPlugin.options.title %>
   title:"Index Page",
//在这个页面中包含的块，默认情况下会包含
//提取出来的通用chunk和ivendor chunk
chunks: [" chunk-vendors " , ' chunk-common' ,"index"]
}，
//当使用只有入口的字符串格式时，
//模板文件默认是'public/subpaqe.html"
    
 //是否在保存的时候使用‘eslint-loader’进行检查。有效的值:‘ture’ l 'false'l '"error"当设置为‘"error""时，检查出的错误会触发编译失败。
//默认值是true
lint0nSave: true,
//是否使用包含运行时编译器的Vue构建版本。设置为 true 后你就可以在Vue 组件中使用template 选项了，但是这会让你的应用额外增加10kb 左右。
//默认值是false
 runtimeCompiler:false,
//默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过Babel显式转译一个依赖，可以在这个选项中列出来。
//默认值是空数组口
transpileDependencies : ""，
//如果你不需要生产环境的 source map，可以将其设置为false 以加速生产环境构建。
//默认值:true
productionSourceMap; false,
//设置生成的 HTML 中 <link rel="stylesheet">和<script>标签的 crossorigin属性
 //默认值是:undefined
crossorigin: ""，
//在生成的 HTML中的<link rel="stylesheet">和<script>标签上启用Subresource Integrity (SRI)。如果你构建后的文件是部署在CDN 上的，启用该选项可以提供额外的安全性。
//默认值是:false
integrity :false
}
}

    

```

### 对应上面的解释

```js

//1.该文件应该导出一个包含了选项的对象:
module.exports={
//这个值也可以被设置为空字符串〔""）或是相对路径（('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
//默认值是:"/"
publicPath:"./”，
//把开发服务器架设在根路径,可以使用一个条件式的值:
publicPath:process.en8.NODE_ENV=== ' production' ?' /production-sub-path/' :"/"，
//举个实例使用方式:
publicPath:process.env .NODE_ENV===' production'?'192.168.60.110:8080' :"192.168.60.112:8080' ,
//输出文件目录，
//当运行vue-cli-service build时生成的生产环填构建文件的日录。注意目标日录在构建之前会被清除《构建时传入--no-clean可关闭该行为).
//就认值是dist
outputDir: "dist"",
//放置生成的静态资源（js、css、 img、 fonts）的目录。注意︰从生成的资源覆写filenme 或 chunkFilencme时,assetsDir 会被忽略。
//默认值是空""
assetsDir : "static",
//指定生成的 index.html 的输出路径〔相对于outputDir)。也可以是一个绝对路径。
//默认值是index . html
indexPath: "index. html"
}

```

### 4插件及规则的配置

```js

在 vue.config.js 如果要新增/修改webpack 的 plugins或者 rules ，有2种方式。
configureWebpack方式
configureWebpack是相对比较简单的一种方式
·它可以是一个对象∶和 webpack 本身配置方式是一致，该对象将会被 webpack-merge合并入最终的 webpack 配置它也可以是一个函数:直接在函数内部进行修改配置
configureWebpack:{
rules:[],
plugins:[]
configurcWicbpack: Cconfig) =>{
//例如，通过到断运行环境，设置mode
 config.mode - 'production'
}

```

### chainWebpack 方式

```js

chainWebpack链式操作(高级),接下来所有的配置我都会在该选项中进行配置
chainWebpack(config) {
config.module 
.ruleC 'vue')
.use('vue-loader ')
.loader(C' vue-loader ')
.tap( options => {
     options.compilerOptions.preserveWhitespace = true 
    return options
})
.end()
}
1/从上述的例子可以知道如果,新增一个rules ,那么大概语法为
config.module
  .rule(name).
  .use(name)
  .loader(loader)
  .options(options)
  .end()

```

### 最终版本 可以启动的vue.config.js

```js
const { defineConfig ]= require("evue/cli-service")
    let port - 8888
    module.exports = defineConfigcig({
//第三方依赖是否需要转移,逦免出现第三方的转移
     transpileDependencies: true,
//是否在开发环境下通过eslint-loader在每次保存时lint 代码。这个值会在 evue/cli-plugin-eslint被安装之后生效。
      lintOnSave: false,
//代理端口配置
devServer: {
    //代理的地址
    port,
    //配置代理
    proxy: {
   //change xxx-opi/login o mock/login
   // detai1: https://cli.vuejs.org/config/#devserver-proxy
        [process.erv . vUE_APP_BASE_API]:{
        target:
        process.erv . WUE_APP_MOCK_ENABLE === true
        ?"http:.//localhost:${port}/mock
       : 'process.env .VUE_APP_CONSOLE_URL"，
         changeOrigin: true,
       pathRewrite: {
        ["A” + process.env.WUE_APP_BASE_API]:""
        }
}
})”

```

