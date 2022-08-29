import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../components/AsideBar/Asidebar.vue'),
  },
  {
    path: '/',
    component: () => import('../components/AsideBar/Asidebar.vue'),
    redirect: '/study',
    children:[
      {
        path: '/study',
        name: '学员管理',
        component: () => import('../views/study.vue'),
      },
      {
        path: '/teacher',
        name: '讲师管理',
        component: () => import('../views/teacher.vue'),
      },
      {
        path: '/assistant',
        name: '助教管理',
        component: () => import('../views/assistant.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
