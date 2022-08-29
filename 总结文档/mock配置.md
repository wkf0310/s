# 第一步 ：安装 mockjs 和 express和热更新nonde插件 nodemon

```js
npm i mockjs express nodemon
```

# 第二步：配置vue.config.js

```js
devServer: {
		port: 8089, // 端口号
		https: false,
		host: "0.0.0.0",
		open: true,
		// 配置代理
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				changeOrigin: true, //开启跨域
				target:
					[process.env.VUE_APP_MOCK_ENABLE] === "true"
						? "http://localhost:8089"
						: [process.env.VUE_APP_CONSOLE_URL],
				pathRewrite: {
					[process.env.VUE_APP_BASE_API]: ""
				}
			}
		}
	}

```

# 第三步：配置mock启动服务

```js
let Mock = require("mockjs") //引入mockjs
let express = require("express") //引入express 
let app = express() //实例化express
let login = require("./common/login.json") //登录数据
//获取图片验证码
app.use("/user/imgcode/", function (req, res) {
	res.json(
		Mock.mock({
			code: "200",
			msg: "获取成功",
			img: Mock.Random.dataImage("50x20", Mock.mock({ regexp: /\w{4}/ }).regexp)
		})
	)
})
//获取登录接口
app.use("/user/login/", function (req, res) {
	res.json(
		Mock.mock({
			code: "200",
			msg: "获取成功",
			data: login
		})
	)
})
//启动服务
app.listen("8089", () => {
	console.log("监听端口,8089")
})
```

# 第四步：更改启动命令

```js
"scripts": {
		"serve:dev": "vue-cli-service serve & nodemon ./mock/mock.js",
		"build": "vue-cli-service build",
		"lint": "vue-cli-service lint",
		"prettier": "prettier --write .",
		"prepare": "husky install",
		"commit": "cz"
	},
//"serve:dev": "vue-cli-service serve & nodemon ./mock/mock.js",
```

