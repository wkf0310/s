# 使用vue3结构及配置管理



## 一、vue-cli2和vue-cli3的区别



- vue-cli3 是基于webpack4的, vue-cli2是基于webpack3
- vue-cli3的设计原则是"0配置", 移除了配置文件根目录下build和config等目录
- vue-cli3 提供了vue ui命令, 进行可视化配置, 操作更方便
- 替换了static文件夹为public文件夹, 并且index.html移动到public文件夹中



## 二、使用vue-cli3脚手架搭建项目

1. 创建项目

```
vue create efficient                             // efficient 项目名称
```

```
Vue CLI v5.0.8                                   // # vue-cli脚手架的版本
? Please pick a preset: (Use arrow keys)         // 请选择一个配置
❯ Default ([Vue 3] babel, eslint)			 // 默认配置,vue的版本是3.0, 默认安装了es6转es5,eslint代码格式化工具
  Default ([Vue 2] babel, eslint) // 默认配置,vue的版本是2.0, 默认安装了es6转es5,eslint代码格式化工具
  Manually select features   // 手动选择,我们需要指定哪些插件安装,哪些不安装, 就可以选择手动

```

这里由于默认模板没有啥展示的必要所以我们便选择手动配置。



2. 选择手动配置后,进行项目选项配置

```
Vue CLI v5.0.8
? Please pick a preset: Manually select features  //请选择项目配置
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed) // 选择你需要的配置放在项目里面,可以选择一个,也可以选择全部,按enter键结束
❯◉ Babel                              // 转换工具,将es6转换成es5
 ◯ TypeScript  // JavaScript的一个超集（添加了可选的静态类型和基于类的面向对象编程：类型批注和编译时类型检查、类、接口、模块、lambda 函数）
 ◯ Progressive Web App (PWA) Support   // 渐进式Web应用程序
 ◯ Router	                             // vue-router（vue路由）
 ◯ Vuex																 // vuex（vue的状态管理模式）
 ◯ CSS Pre-processors	                 // CSS 预处理器（如：less、sass）
 ◉ Linter / Formatter                  // 代码风格检查和格式化（如：ESlint）
 ◯ Unit Testing	                       // 单元测试（unit tests
 ◯ E2E Testing                         // e2e（end to end） 测试
```

​     (1) 对于pwa的解释

```
一是给项目添加一些webapp支持，比如在手机端支持发送到桌面图标，根据不同平台和浏览器尝试去掉浏览器自带的地址栏、底栏实现全屏体验，这个主要是视觉上和体验上的，没有什么实际功能。
实现方式就是勾选pwa支持后项目会生成manifest.json,在里面配置即可
二是增加可离线支持。其实可离线也不一定非要用pwa，有不少其他手段。可离线就是比如你的项目不是一定要全程联网才能实现功能，只要用户访问过一次你的网站，下一次进入时哪怕没有网络，你的项目也不会白屏，而是照常运行或者开放部分功能，或者给个断网提示等等。对于那些功能性网站挺有用的，举例来说什么在线计算器，在线算税小工具等。
通过配置项目生成的registerServiceWorker.js来注册serviceworker实现，具体操作还是很复杂的，详情百度.


Progressive Web App, 简称 PWA，是提升 Web App 的体验的一种新方法，能给用户原生应用的体验。PWA 能做到原生应用的体验不是靠特指某一项技术，而是经过应用一些新技术进行改进，在安全、性能和体验三个方面都有很大提升，PWA 本质上是 Web App，借助一些新技术也具备了 Native App 的一些特性，兼具 Web App 和 Native App 的优点。PWA 的主要特点包括下面三点：可靠 - 即使在不稳定的网络环境下，也能瞬间加载并展现体验 - 快速响应，并且有平滑的动画响应用户的操作粘性 - 像设备上的原生应用，具有沉浸式的用户体验，用户可以添加到桌面PWA 本身强调渐进式，并不要求一次性达到安全、性能和体验上的所有要求，开发者可以通过 PWA Checklist 查看现有的特征。


搜索链接: https://juejin.cn/post/6844904033522548743

```

​     (2) 对于单元测试的理解

   那些需要写单元测试,那些不需要写,取决于代码对数据的处理,当数据处理的复杂性较高的时候,需要用到单元测试,只有页面展示,并不需要单元测试

​    https://juejin.cn/post/7039108357554176037

   (3)E2E单元测试

   https://blog.csdn.net/u012961419/article/details/123821205

(4).scss预处理https://www.jianshu.com/p/81aec65cccea

3. 选择vue的版本

   ```
   ? Choose a version of Vue.js that you want to start the project with
     3.x
   ❯ 2.x
   				// 选择一个vue的版本
   ```

4. 使用hash还是hitory路由

   ```
   Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)N
   // 选择hash路由
   ```

5. 选择css预处理的方式

   ```
   ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys) // css预处理器  这里选择第一个Sass/SCSS (with dart-sass)
   ❯ Sass/SCSS (with dart-sass)
     Less
     Stylus
   
   ```

6. 语法检测工具

   ```
   ? Pick a linter / formatter config: (Use arrow keys) // 语法检测工具
   ❯ ESLint with error prevention only // 仅错误预防
     ESLint + Airbnb config  // config Airbnb配置
     ESLint + Standard config // config 标准配置
     ESLint + Prettier // 该配置应该比较完善
   ```

7. 语法检测方式

   ```
   ? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed
   ❯◉ Lint and fix on commit  // 代码除了语法错误导致的 error 外不会提示 warning。而是在当前项目进行 git commit 操作的时候，通过 githook，在 pre-commit 阶段执行 lint 和 fix 操作，自动帮我们把有语法错误的地方修改为符合规范。
    ◯ Lint on save  // 代码文件中有代码不符合 lint 规则时，会在 compile 阶段提示 warning。如果出现了语法错误，会直接在页面上显示 error
    
   ```

8. Where do you prefer placing config for Babel, ESLint, etc.?配置文件放在那里呢?

   ```
   Where do you prefer placing config for Babel, ESLint, etc.?配置文件放在那里呢?
   In dedicated config files     //:独立文件
   In package.json               //: 放到package.json中
   通常我们都选择独立的配置文件, 方便管理
   ```

   

9. ### Save this as a preset for future projects? (y/N) 是否将刚刚的配置保存到项目中?

   ```
   Save this as a preset for future projects? (y/N) N
   ```

   如果选择是: 下次在配置选项的时候, 除了default,manually,还会多一个我们保存的项目配置.

   - Y: 如果以后搭建项目都希望是这个配置就选择y
   - N: 不希望保存配置
     下次在创建项目的时候, 我们就可以自动选择之前保存的项目特征
     ![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da655b97e4c545d796b0c97284729469~tplv-k3u1fbpfcp-watermark.image)

   **如果我们设置了很多自定义配置,如何取消呢?**

   在/Users/用户名/.vuerc, 修改这个文件

   ```
   {
     "useTaobaoRegistry": false,
     "presets": {
       "mySet": {
         "useConfigFiles": true,
         "plugins": {
           "@vue/cli-plugin-babel": {}
         },
         "vueVersion": "2"
       }
     }
   }
   ```

   里面有个选项是presets. 下面就是我们保存的设置.设置名称是mySet.这个配置只安装一个插件:@vue/cli-plugin-babel

## 三、下面我们来看一下vue-cli3项目中各个文件的含义

1. node_modules: npm构建的组件都在这个文件夹里面

2. public: 里面存放公共资源. 目前有index.html和

3. src: 存放源代码

4. .browserslitstrc: 浏览器适配配置

```
> 1%
last 2 versions
not dead
```

适配市场份额大于1%的最后两个版本, 不适配已经过期的版本

5. gitignore: 忽略文件

```
node_modules
/dist
```

重点看这个, 忽略node_modules文件和/dist构建后的文件. 通过运行npm run serve就可以生成这两个文件了

6. babel.config.js: babel插件设置

```
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```

通常, 不修改这个文件的内容

7. package.json: npm配置文件

```
{
  "name": "03-vuecli3",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "vue-template-compiler": "^2.6.11"
  }
}
```

这个比vue-cli2的devDependencies配置文件少了很多. 而多了一个下面这个配置:

```
"@vue/cli-service": "~4.5.0",
```

这个配置的作用是: 管理dev环境的依赖. vue-cli3使用这个配置以后, 简化了配置文件.

8. package-lock.json: 真实使用的插件的版本号.

​      在package.json配置文件中, 我们会使用~或者^来模糊匹配版本号, 而这个文件里就是精确指明使用的详细版本号了

## 四、代码规范的校验

  ### 4.1 集成editorconfig配置

​         EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

​        VSCode需要安装一个插件：EditorConfig for VS Code

![在这里插入图片描述](https://img-blog.csdnimg.cn/e93aeb38884342babfa64ee4b1b07abb.png)

​       新建.editorconfig文件 

```
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = tab # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行
 
[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false

```

### 4. 2 使用prettier工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

  1. 安装prettier

     ```
     npm install prettier -D
     ```

  2. 配置.prettierrc文件：

     useTabs：使用tab缩进还是空格缩进，选择false；
     tabWidth：tab是空格的情况下，是几个空格，选择2个；
     printWidth：当行字符的长度，推荐80，也有人喜欢100或者120；
     singleQuote：使用单引号还是双引号，选择true，使用单引号；
     trailingComma：在多行输入的尾逗号是否添加，设置为 none；
     semi：语句末尾是否要加分号，默认值true，选择false表示不加；

     ```
     {
       "useTabs": false,
       "tabWidth": 2,
       "printWidth": 80,
       "singleQuote": true,
       "trailingComma": "none",
       "semi": false
     }
     ```

  3. 创建.prettierignore忽略文件

     ```
     /dist/*
     .local
     .output.js
     /node_modules/**
     
     **/*.svg
     **/*.sh
     
     /public/*
     ```

  4. VSCode需要安装prettier的插件

![在这里插入图片描述](https://img-blog.csdnimg.cn/3ba1447638474804acc25c0d6b3d41be.png)

5. 测试prettier是否生效

   - 测试一：在代码中保存代码；
   - 测试二：配置一次性修改的命令；

   在package.json中配置一个scripts：

       "prettier": "prettier --write ."



   然后命令行执行，可以将所有文件都格式化

   ```
npm run prettier
   ```

   

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/73ed79f48f8b42158c8bcc6ee4a9cb72.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5YWJ5piO5bCP5a2m546L5bCP6Zuo,size_14,color_FFFFFF,t_70,g_se,x_16)

### 4.3、eslint

1.在前面创建项目的时候，我们就选择了ESLint，所以Vue会默认帮助我们配置需要的ESLint环境。

2.VSCode需要安装ESLint插件：

![image-20210722215933360](https://img-blog.csdnimg.cn/img_convert/b6fea218aa6bfd74605ca6dcbc9be237.png)

3.解决eslint和prettier冲突的问题：

安装插件：vue在创建项目时，如果选择prettier，那么这两个插件会自动安装

```
npm i eslint-plugin-prettier eslint-config-prettier -D
```


在.eslintrc.js最下面，添加prettier插件'plugin:prettier/recommended'，表示eslint也使用prettier里配置的规范

```
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],

```

### 4.4、git Husky和eslint

​    虽然我们已经要求项目使用eslint了，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：

​    也就是我们希望保证代码仓库中的代码都是符合eslint规范的；

​    那么我们需要在组员执行 git commit 命令的时候对其进行校验，如果不符合eslint规范，那么自动通过规范进行修复；

​    那么如何做到这一点呢？可以通过Husky工具：

​    husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用husky呢？

这里我们可以使用自动配置命令：

```
npx husky-init && npm install
```

这里会做三件事：

1.安装husky相关的依赖：

![image-20210723112648927](https://img-blog.csdnimg.cn/img_convert/a3f84d35b46922ef271904134ade511b.png)



2.在项目目录下创建 .husky 文件夹：

```
npx huksy install
```

![image-20210723112719634](https://img-blog.csdnimg.cn/img_convert/1a2effceee946f61607665d616250289.png)



3.在package.json中添加一个脚本：

```
"perpare": "husky install"
```



![image-20210723112817691](https://img-blog.csdnimg.cn/img_convert/7872635488d19d57e56c261a80d7ab79.png)

接下来，我们需要去完成一个操作：在进行commit时，执行lint脚本：

![image-20210723112932943](https://img-blog.csdnimg.cn/img_convert/3a7216e8b7fa5f154b4b842dc98bb6b1.png)

这个时候我们执行git commit的时候会自动对代码进行lint校验。



### 4.5、git commit规范

1. 代码提交风格

   通常我们的git commit会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

   ![img](https://img-blog.csdnimg.cn/img_convert/757687fa02bef713253ae65834d80ea4.png)

​       但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

2. Commitizen 是一个帮助我们编写规范 commit message 的工具；
   1.安装Commitizen

   ```
   npm install commitizen -D
   ```

   2.安装cz-conventional-changelog，并且初始化cz-conventional-changelog：

   ```
    npx commitizen init cz-conventional-changelog --save-dev --save-exact
   ```



   这个命令会帮助我们安装cz-conventional-changelog：

![image-20210723145249096](https://img-blog.csdnimg.cn/img_convert/d319df41def5d6f732bb7b097c1660e1.png)

并且在package.json中进行配置：

![img](https://img-blog.csdnimg.cn/img_convert/c8bc11fcbed7cdba6462fb57dd6341a3.png)

这个时候我们提交代码需要使用 npx cz：

- 第一步是选择type，本次更新的类型

  ```
  | Type | 作用 | 
  | :-----| ----: | 
  | feat | 新增特性 (feature) | 
  | fix | 修复 Bug(bug fix) | 
  | docs | 修改文档 (documentation) | 
  | style | 代码格式修改(white-space, formatting, missing semi colons, etc) | 
  | refactor | 代码重构(refactor) | 
  | perf | 改善性能(A code change that improves performance) | 
  | test | 测试(when adding missing tests) | 
  | build| 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） | 
  | ci | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 | 
  | chore | 变更构建流程或辅助工具(比如更改测试环境) | 
  | revert | 代码回退 | 
  
  ```

- 第二步选择本次修改的范围（作用域）

  ![image-20210723150147510](https://img-blog.csdnimg.cn/img_convert/5ed43afd2660af66f23cee49f4565928.png)

  

- 第三步选择提交的信息

  ![image-20210723150204780](https://img-blog.csdnimg.cn/img_convert/396008622b8a74ea69de4de04d541d89.png)

- 第四步提交详细的描述信息

  ![image-20210723150223287](https://img-blog.csdnimg.cn/img_convert/d9aba087b0fea36292c1bb22f712eca5.png)

- 第五步是否是一次重大的更改

  ![image-20210723150322122](https://img-blog.csdnimg.cn/img_convert/32e13baf9608ce9a3e69ff6b92dd4b60.png)

- 第六步是否影响某个open issue

![image-20210723150407822](https://img-blog.csdnimg.cn/img_convert/a7cc236754932fb6d6f57876cb203b97.png)

我们也可以在scripts中构建一个命令来执行 cz：

```
"commit": "cz"
```

### 4.6 代码提交验证

如果我们按照cz来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

- 我们可以通过commitlint来限制提交；

1.安装 @commitlint/config-conventional 和 @commitlint/cli

```
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建commitlint.config.js文件，配置commitlint

```
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用husky生成commit-msg文件，验证提交信息：

```
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

## 注意: git husky的官网: https://typicode.github.io/husky/#/



## 五、eslint和prettier,以及vscode的配置

window: 使用ctrl+p打开,并且搜索setting.json

mac: 下使用command+p打开所有,并且所搜setting.json

```
// prettier 格式化配置
    "javascript.format.placeOpenBraceOnNewLineForControlBlocks": false, // 函数左括号{是否换行
      "javascript.format.insertSpaceBeforeFunctionParenthesis": true, // 让函数(名)和后面的括号之间加个空格
      "prettier.printWidth": 80,
      "prettier.tabWidth": 2,
      "prettier.useTabs": true,
      "prettier.singleQuote": true,
      "prettier.jsxSingleQuote": true,
      "prettier.quoteProps": "consistent",
      "prettier.trailingComma": "all",
      "prettier.bracketSpacing": true,
      "prettier.jsxBracketSameLine": false,
      "prettier.arrowParens": "always",
      "prettier.semi": true,
      "prettier.requirePragma": false,
      "prettier.insertPragma": false,
      "prettier.proseWrap": "preserve",
      "prettier.htmlWhitespaceSensitivity": "ignore",
      "prettier.endOfLine": "auto",
      "prettier.vueIndentScriptAndStyle": true,
      // https://prettier.io/docs/en/options.html 官方文档
      // https://juejin.im/post/5a7d70496fb9a063317c47f1 中文翻译
      // https://segmentfault.com/a/1190000012909159
      // https://www.jianshu.com/p/4be58a69b20f
      // ---------------------------------------------------
     
      // ---------------------------------------------------
      // ESLint 配置代码检查
      "eslint.format.enable": false,
      "eslint.alwaysShowStatus": false,
      "eslint.quiet": false, // 忽略检查
      "eslint.validate": [
          "javascript",
          "javascriptreact",
          "typescript",
          "typescriptreact",
          "vue",
      ],
      "eslint.run": "onSave",
      "eslint.options": {
          "extensions": [
              ".js",
              ".vue",
          ],
      },
      "editor.codeActionsOnSave": { // 启用 eslint 自动修复
          "source.fixAll.eslint": true
      }
```


