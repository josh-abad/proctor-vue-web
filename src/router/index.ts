import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const createTitle = (pageName: string): string => {
  return `${pageName} - Proctor Vue`
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: createTitle('Proctor Vue'),
      requiresAuth: true
    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: createTitle('Log In'),
      requiresAuth: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: createTitle('Sign Up'),
      requiresAuth: false
    },
    component: () => import('../views/RegistrationForm.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    meta: {
      title: createTitle('Courses'),
      requiresAuth: true
    },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/courses/:id',
    meta: {
      title: createTitle('Course'),
      requiresAuth: true
    },
    component: () => import('../views/CoursePage.vue')
  },
  {
    path: '/courses/:id/exam',
    name: 'Exam',
    meta: {
      title: createTitle('Exam'),
      requiresAuth: true
    },
    component: () => import('../views/ExamPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    meta: {
      title: createTitle('Page Not Found'),
      requiresAuth: false
    },
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title

  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
