import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegistrationForm.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/courses/:id',
    component: () => import('../views/CoursePage.vue')
  },
  {
    path: '/courses/:id/exam',
    component: () => import('../views/ExamPage.vue')
  },
  {
    path: '/exam-test',
    component: () => import('../views/ExamPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
