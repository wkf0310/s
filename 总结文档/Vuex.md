#### 1.Vuex的概念

​	Vuex是专门为vue2设计的状态存储工具，解决多层组件通信的麻烦，方便组件之间共享数据，适用于大型项目，Vuex吸取了redux的单数据管理，去掉了redux的限制，更加适用于vue，虽然vue也能用其他的状态管理工具，但是会比较麻烦

 **市场上同类型的状态管理工具有**

​	1.Recoil

​	2.MobX

​	3.XState

​	4.Redux(with hooks)

​	5.Context

#### 2.Vuex的五大核心，调用及执行机制

​	**state: 用来存储数据的**

​		通过原始调用this.$stoer.state(参数)或映射函数 ...mapState[(参数)]，写在计算属性computed里面

​	**mutations: 同步任务，可直接修改state中的数据**

​	  	通过原始调用this.$stoer.commit(方法名，参数)或映射函数 ...mapMutations[(方法名，参数)]，写在方法methods中		

​	**actions: 异步任务，防止有两个任务请求同一个接口时造成返回数据混乱的现象**

​		通过原始调用this.$stoer.dispach(方法名，参数)或映射函数 ...mapActions[(方法名，参数)],写在方法methods中

​	**getters：类似于计算属性，可对state中的数据做出逻辑处理**

​		通过原始调用this.$stoer.getters(方法名，参数)或映射函数 ...mapGetters[(方法名，参数)]

​	**Vuex的执行机制**

​		通过dispach调用actions中的方法，再通过commit调用mutations中的方法，在mutatios中可以直接修改state的数据

​	![](C:\Users\asus\Desktop\笔记\img\vuex执行机制.png)

#### 3.Vuex的分模块处理

​	**分模块的好处：方便后期维护，可以更快更准确的找到对应的方法和数据**

​	**在vue项目中的用法**

​		1.在store文件夹中创建个mudles的文件，里面创建对应的js文件,定义state,mutations,actions等配置项，将其抛出，代码如下：

```js
// 模块下的js配置
const state = {
    routesList: []
}

const mutations = {
    // 保存点击过的所有列表信息
    addRouteList: (state,played) => {
        // console.log(played);
        state.routesList = state.routesList.filter(item => item !== played)
        state.routesList.push(played)
    },
    // 删除点击的tag信息
    delRouteList: (state,played) => {
        state.routesList = state.routesList.filter(item => item !== played)
    },
    // 清空所有
    clearInfo(state,played){
        state.routesList = []
    },
    // 删除其他tag
    delOther(state,played){
        state.routesList = state.routesList.filter(item => item.path == played)
    }
}

export default{
    namespaced: true,
    state,
    mutations
}
```

​	2.getters计算属性必须单独写在js文件中，写到模块中会报错

```js
const getters = {
    routeList: state => state.routeList,
    tabLists: state => state.tabs
}


export default getters
```

​	3.在index.js中将抛出的模块js文件引入然后在创建实例并整个抛出，代码如下：

```js
import Vue from 'vue'
import Vuex from 'vuex'
import routeList from './modules/routeList'
import getters from './getters'
import tabs from './modules/tabs'
import persistedState from 'vuex-persistedstate'
import aside from './modules/aside'
Vue.use(Vuex)



export default new Vuex.Store({
  plugins: [persistedState({storage: window.sessionStorage})],
  modules:{
    routeList,
    tabs,
    aside
  },
  getters
})
```

​	4.在项目中的使用,通过this.$store.commit/state/dispach('模块名/方法'，'参数')或者...mapMutations/mapActions[('模块名/方法')]来调用

```js
...mapActions(["tabs/getTabList"])
...mapMutations(['tabs/undateUnread'])
```

当需要用一个模块中的mutations或者actions中的多个方法，可以前边代码块，后边数组来调用

```js
 ...mapMutations("tabs", ["undateUnread", "undateReadList", "delReadLists","unsaveLists","unsaveReadLists"]),
```

#### 4.Vuex的存储

​	在Vuex中的页面刷新后，数据会丢失，对数据做持久化有两种方法，但最终的目的都是将数据存到本地存储或者会话存储中

​	**第一种： 利用localStorage或者sessionStorage直接将数据存进去**

**第二种： 利用插件vuex-persistedstate来存储,在index.js中的配置如下：**

```js
//引入插件
import persistedState from 'vuex-persistedstate'
//使用,存储到会话存储中
plugins[persistedState({storage:window.sessionStorage})],
```

#### 拓展

###### 	1.什么是状态管理模式

​		**组件状态管理大致分为三个组成部分**

​			1.状态 驱动应用的数据源

​			2.视图 以声明方式将状态映射到视图

​			3.操作 响应在视图上的用书输入导致的状态变化

![](C:\Users\asus\Desktop\笔记\img\状态管理模式.png)

​	**以上三点共同组成单向数据流的概念： 数据状态(state) 渲染视图(view)  视图承载事件 (actions),事件驱动状态改变**

**但是在多个组件共享状态时，单向数据流的简洁性很容易被破坏：**

​	多个视图依赖于同一状态

​	来自不同视图的行为需要变更同一状态

**总的来说:将组件的共享状态抽取出来，以全局单例模式进行统一管理，并规定组件只能以指定的方式才能修改这些状态，即是Vuex。**

###### 2.namespaced命名空间

​	在分模块抛出时，通过namespaced：true开启命名空间

​	**开启命名空间的作用：保护在state中的数据不会被污染，在共同开发项目时，即便两个人定义的变量名称一样，也不会被污染覆盖**