import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '../views/IndexPay.vue'

const routes = [
  {
    path: '/',
    name: 'IndexView',
    component: IndexView
  },
  {
    path: '/indexSuccess',
    name: 'IndexSuccess',
    component: () => import('../views/IndexSuccess.vue')
  },
  {
    path: '/indexOrder',
    name: 'IndexOrder',
    component: () => import('../views/IndexOrder.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
