/* eslint-disable */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import About from '../views/AboutPage.vue'
import Works from '../views/WorksPage.vue'
import CareForU from '../views/CareForU.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { transition: 'nested' },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { transition: 'fade' },
  },
  {
    path: '/works',
    name: 'Works',
    component: Works,
    meta: { transition: 'works' },
  },
  {
    path: '/careforu',
    name: 'CareForU',
    component: CareForU,
    meta: { transition: 'careforu' },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
