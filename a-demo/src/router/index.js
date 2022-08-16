import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: '/assistant',
        name: 'assistant',
        name:'助教管理',
        component: () => import('../views/assistant.vue')
      },
      {
        path: '/lecturer',
        name: 'lecturer',
        name:'学员管理',
        component: () => import('../views/lecturer.vue')
      },
      {
        path: '/student',
        name: 'student',
        name:'讲师管理',
        component: () => import('../views/student.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
