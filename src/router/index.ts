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
      title: createTitle('Proctor Vue')
    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: createTitle('Log In')
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: createTitle('Sign Up')
    },
    component: () => import('../views/RegistrationForm.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    meta: {
      title: createTitle('Courses')
    },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/courses/:id',
    meta: {
      title: createTitle('Course')
    },
    component: () => import('../views/CoursePage.vue')
  },
  {
    path: '/courses/:id/exam',
    name: 'Exam',
    meta: {
      title: createTitle('Exam')
    },
    component: () => import('../views/ExamPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    meta: {
      title: createTitle('Page Not Found')
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

  if (to.name !== 'Login' && !store.state.user) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
