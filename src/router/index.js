/* eslint-disable */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Portfolio from '../views/Portfolio.vue'
import CareForU from '../views/CareForU.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { transition: 'home' },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { transition: 'about' },
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: { transition: 'portfolio' },
  },
  {
    path: '/careforu',
    name: 'CareForU',
    component: CareForU,
    meta: { transition: 'careforu' },
  }
]

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return {
            top: 0
        }
    }
})

export default router
