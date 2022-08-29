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

## 

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