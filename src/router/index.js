import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '../views/IndexProduct.vue'

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
    path: '/indexDownLoad',
    name: 'IndexDownLoad',
    component: () => import('../views/IndexDownload.vue')
  },
  {
    path: '/indexOrder',
    name: 'IndexOrder',
    component: () => import('../views/IndexOrder.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
