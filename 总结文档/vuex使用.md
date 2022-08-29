### 什么是渐进式框架

不需要全部一次性加载，用什么装什么就行，没有太强的依赖。

# vuex 是什么。

vuex 是 vue 的状态管理工具 管理项目中的公共数据 能够在所有的组件中使用
一共有五大核心
state 存放公共数据的地方 通过 this.$store.state.xxx调用
mutations 修改 state 的地方 只有这里能修改 通过this.$store.commit 调用
getters 相当于是之前的计算属性 通过 this.$store.getters 调用
actions 执行异步操作的地方 通过 this.$store.dispatch 调用
modules 模块化



## vuex 的弊端

vue他不会自动化持久存储刷新页面就会丢失，想要数据持久化，需要安装持久化插件。

vuex-persistedstate持久化存储

也可以使用本地存储，自己手动存储。



## vuex 的执行机制

我在项⽬当中如果要改变 state 的状态,我们⼀般是在组件⾥⾯调⽤ this.$store.dispatch ⽅式来触发 actions ⾥⾯的⽅法,在 actions⾥⾯的⽅法通过 commit 来调⽤ mutations ⾥⾯定义的⽅法来改变 state,同时这也是 vuex 的执⾏机制



##  modules分模块

当 vuex 里数据很多的时候我们可以分模块管理数据
建立不同的 js 文件 作为我们的模块文件
每一个模块里都有 state 等其他的四大核心
把这个 js 文件引入到 store/index.js 中 在 modules 中注册

使用模块里的数据的时候
this.$store.state.xx(模块名字).arr(state 数据名字)

如果使用模块里的 mutations 方法
首先在模块里跟 state 同级的地方开启一个命名空间 namespaced:true
使用的时候 this.$store.commit("a(模块名字)/add（模块里方法的名字）")

### vuex 的辅助函数 是 vuex 的语法糖

mapState 展开在计算属性里
mapGetters 展开在计算属性里
mapMutation 展开在方法里
mapAction 展开在方法里

用的时候都先 import 引入

vue3中已经取消vuex的赋值函数



### 生命周期函数有哪些

创建阶段

- beforeCreate
  实例创建之前 这个时候什么都没有 data methods 都不能用 也没有 this

- created
  创建之后 也是最早的可以使用 data 和 methods 的钩子函数 这个时候有 this 了
- beforeMount
  组件挂载之前

- mounted
  组件挂载之后
  这个时候能拿到 dom 节点使用

运行阶段 只要修改 data 就会触发

- beforeUpdate
  数据变了 视图还没变
- updated
  数据变了 视图也变了

销毁阶段

- beforeDestory
  组件销毁之前 是最后一个能使用 data 和 methods 的钩子函数
- destoryed
  组件销毁之后

除了这八个 还有 三个
如果用 keep-alive 缓存了组件 就会有 actived deactived 这两个钩子函数
activated 组件激活
deactivated 组件停用
errorCaptured 子组件出错的时候会触发这个钩子函数



### vue的路由模式

分为哈希路由和history两种模式，哈希模式请求带#号，history模式不带#号，哈希请求数据会显示在请求中，并且传输数据小，history不包含在请求中，比较安全，传输量大。哈希请求不会刷新整个页面，history请求的url必须和后端一致。

history原理  pushState和replaceState

哈希原理  



### 路由导航守卫

有三种，全局，组件，单个。

全局是：

beforeResolve 路由解析守卫

beforeEach 路由进入之前
afterEach 路由进入之后

组件:

beforeRouteEnter 路由进入之前
beforeRouteUpdate 路由更新之前
beforeRouteLeave 路由离开之前

单个:

beforeEnter 路由进入之前

都有三个参数

to,from,next 

to是去哪，from从哪来，next放行

### keep-alive 重点

是vue的内置组件，缓存不活动的组件，一般用于缓存刚填好的表单数据。

会生成两个钩子函数 activated（激活） deactivated（停用）这两个钩子函数

身上带有两个属性  include 属性和 exclude 属性

### 插槽

插槽就是将自定义内容展示出来，分为具名插槽，匿名插槽，作用域插槽。直接写在父的子组件是不会显示出来的，需要用到slot插槽标签。具名插槽需要用到name属性。

### vue 双向数据绑定原理?

vue.js 则是采⽤ 数据劫持 结合 发布者-订阅者 模式的⽅式，
通过 Object.defineProperty() 来劫持各个属性的 setter ， getter ，
在数据变动时发布消息给订阅者，触发相应的监听回调。
这个时候就可以实现数据的双向绑定

里面有三个参数   对象，名，set，get方法



### v-for 与 v-if 的优先级那个⾼

在vue2中需要看情况来说明，没有准确的说明谁的优先级高。



### 监听white

watch 监听路由的变化
监听路由的话就是监听 $router

watch 监听 数据的变化
watch 有三个参数 deep immediate handler
当我们不需要 deep 和 immediate 的时候 就可以简写为一个函数 这个函数就是 handler



### 计算属性computed

计算属性 computed 计算属性 有缓存功能就是当跟他有关的值发生变化的时候才会重新计算 还有一个特点就是必须要有 return 值 return 就是把计算的结果 return 出去

