/* eslint-disable */

import { createRouter, createWebHistory } from 'vue-router'
import Studio from '../views/Studio.vue'
import Studio2 from '../views/Studio2.vue'
import Portfolio from '../views/Portfolio.vue'
import CareforU from '../views/CareforU.vue'
import Reah from '../views/Reah.vue'
import Joyty from '../views/Joyty.vue'
import Services from '../views/Services.vue'
import Curtainjs2 from '../views/Curtainjs2.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Studio',
    component: Studio2,
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
    name: 'CareforU',
    component: CareforU,
    meta: { transition: 'work' },
  },
  {
    path: '/reah',
    name: 'Reah',
    component: Reah,
    meta: { transition: 'work' },
  },
  {
    path: '/joyty',
    name: 'Joyty',
    component: Joyty,
    meta: { transition: 'work' },
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
  },
  {
    path: '/test',
    name: 'Test',
    component: Curtainjs2,
    meta: { transition: 'portfolio' },
  },
  {
    path: '/test2',
    name: 'Test2',
    component: Curtainjs2,
    meta: { transition: 'home' },
  }
  
]

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
      // Si une position sauvegardée existe (back/forward), on y retourne
      if (savedPosition) {
        return savedPosition;
      } else {
        // Sinon, on retourne en haut de la page
        return { top: 0 };
      }
    },
    
})

export default router
