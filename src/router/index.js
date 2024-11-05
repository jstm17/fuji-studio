/* eslint-disable */

import { createRouter, createWebHistory } from 'vue-router'
import Studio from '../views/Studio.vue'
import Portfolio from '../views/Portfolio.vue'
import CareForU from '../views/CareForU.vue'
import Services from '../views/Services.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Studio',
    component: Studio,
    meta: { transition: 'home' },
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
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: { transition: 'home' },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { transition: 'home' },
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
