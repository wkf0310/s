##### 1.1： 拆分组件

​		为了让代码看起来更简洁，逻辑更清晰，所以将一些可复用的组件和相同逻辑的代码单独封装，方便调用，coponents文件夹中一般用来存放公共组件及样式，views里存放私有组件，

**在父组件中的代码**

```html
<div>
    <header-box/>
</div>
```

```js
<script>
 export default {
  components: {
    HeaderBox: () => import('./Header.vue')
  },
};
</script>
```

**注意：注册组件的名字不能使用关键字，驼峰命名法**

##### 1.2： keep-alive的使用

​	**keep-alive的概念**

​     keep-alive的作用是用来缓存一些活动不规则的组件，组件在切换时会默认进行销毁，有的项目中需要我们将刚完成的组件进行缓存，比如刚提交的表单数据，这时候就需要用到keep-alive

   在我刚完成的项目中用到路由切换视图，为了减少性能的消耗，所以我将路由视图进行缓存。

```html
<keep-alive>
      <router-view></router-view>
</keep-alive>
```

  **keep-alive的属性：**

​	includes-字符串或正则表达式，当名称一样时组件会被缓存

​	excludes-字符串或正则表达式，名称不一样时组件不会缓存

​	max-数字，最多可以缓存多少组件。

##### 1.3： mock假数据的使用

​	安装： npm install mockjs

​	在项目根目录创建mock文件夹，创建index.js文件，配置如下：

```js
// 首先引入Mock
const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '200-600'
});

let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
    if (key === './index.js') return;
    configArray = configArray.concat(files(key).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
    }
});
```

第二步： 创建存放数据的js文件，包含自定义的请求状态值，请求成功的状态以及请求的数据，最后通过export default导出，配置如下：

```js
const asideList = {
    status: 200,
    type: 'success',
    data: [
        {
            id: "/study",
            name: "学员管理",
            path: "/study",
        },
        {
            id: "/teacher",
            name: "讲师管理",
            path: "/teacher",
        },
        {
            id: "/assistant",
            name: "助教管理",
            path: "/assistant",
        },
    ]
}
export default{
    'get|/asidelist/query': (options) =>{
        return {
            status: 200,
            message: 'success',
            data: asideList
        }
    },
}
```

第三步： 在main.js中通过require引入，配置如下

```js
require('../mock/index.js')
```

最后在页面用axios请求路径，拿到数据

##### 1.4： 格式化时间

​	**1.1： 利用moment插件格式化时间**

​			安装： npm install moment

​			局部引入： 在需要的组件中用import引入

```js
import moment from 'moment'
```

​			全局引入： 在main.js中用import引入

​			使用方法：

1.用全局过滤器过滤，代码如下

```js
Vue.filter('dateFormat', function (date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
})
```

```html
<el-table-column prop="create_at" label="创建时间" align="center">
	<template slot-scope="scope">
        <!-- {{ new Date(Number(created_at)).toLocaleString() }} -->
        {{ scope.row.create_at | dateFormat(scope.row.create_at * 1000) }}
          </template>
</el-table-column>
```

2.通过new Date转换为本地时间，代码如下

```html
<el-table-column prop="create_at" label="创建时间" align="center">
    <template slot-scope="scope">
            {{ new Date(Number(scope.row.created_at)*1000).toLocaleString() }}
    </template>
</el-table-column>
```

3.将moment挂载到继承上使用

```html
<template slot-scope="{ row: { created_at } }">
    {{ $moment(created_at) }}
</template>

//main.js
Vue.prototype.$moment = moment
```

4.组件内部注册moment插件

```html
<template slot-scope="{ row: { created_at } }">
     {{ created_at | dateFormat(created_at) }}
</template>
```

```js
 <script>
  import moment from 'moment'
  filters: {
     dateFormat: (value) => {
       return moment(value * 1000).format("YYYY-MM-DD          HH:mm:ss");
     },
   },
 </script>
```

5.原生js封装

```
if(unixtimestamp.length < 13) {
           unixtimestamp = unixtimestamp*1000
        }
         console.log(unixtimestamp,'unixtimestamp');
        var unixtimestamp = new Date(unixtimestamp);
        var year = 1900 + unixtimestamp.getYear();
        var month = "0" + (unixtimestamp.getMonth() + 1);
        var date = "0" + unixtimestamp.getDate();
        var hour = "0" + unixtimestamp.getHours();
        var minute = "0" + unixtimestamp.getMinutes();
        var second = "0" + unixtimestamp.getSeconds();
        return (
          year +
          "-" +
          month.substring(month.length - 2, month.length) +
          "-" +
          date.substring(date.length - 2, date.length) +
          " " +
          hour.substring(hour.length - 2, hour.length) +
          ":" +
          minute.substring(minute.length - 2, minute.length) +
          ":" +
          second.substring(second.length - 2, second.length)
        );
```



##### 1.5： js中0的特殊性

​    对0 取反值为true,在项目中判断条件遇到 0需要考虑这个特性

![](D:\p10\p9考试a卷\img\屏幕截图 2022-08-17 105959.png)

##### 1.6  template的使用

​	template作为一个作用域插槽(占位符)在页面中进行显示，它的slot-scope属性可以让我们更方便的拿到数据

**第一种使用情况，经常使用**

```
<el-table-column prop="create_at" label="创建时间" align="center">
    <template slot-scope="scope">
            {{ new Date(Number(scope.row.created_at)*1000).toLocaleString() }}
   </template>
</el-table-column>
```

**第二种情况，有template作用域的时候会优先显示并覆盖其他内容**

```
<el-table-column prop="name" label="操作" align="center">
          <el-button type="text">详情</el-button>
          <el-button type="text">编辑</el-button>
            <template slot-scope="scope">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </template>
          <el-button type="text">删除</el-button>
          <el-button type="text">重置密码</el-button>
</el-table-column>
```

![](D:\p10\p9考试a卷\img\屏幕截图 2022-08-17 112820.png)

**解决办法，用template标签将所有button按钮全部包裹，让它们在同一个作用域插槽内即可**

```
<template slot-scope="scope">
            <el-button type="text">详情</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button type="text">删除</el-button>
            <el-button type="text">重置密码</el-button>
</template>
```

![](D:\p10\p9考试a卷\img\屏幕截图 2022-08-17 113230.png)

##### 拓展知识点

​    **用this.$route可以拿到当前路由的完整信息**

```html
<template>
  <div class="header-box">{{ this.$route.name }}</div>
</template>


<script>
export default {
  created() {
    console.log(this.$route);
  },
}
</script>
```

![](D:\p10\p9考试a卷\img\屏幕截图 2022-08-17 113959.png)