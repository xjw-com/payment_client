import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '../views/IndexPay.vue'

const routes = [
  {
    path: '/',
    name: 'indexView',
    component: IndexView
  },
  {
    path: '/indexSuccess',
    name: 'indexSuccess',
    component: () => import('../views/IndexSuccess.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
