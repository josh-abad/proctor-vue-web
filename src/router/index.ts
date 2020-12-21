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
    children: [
      {
        path: '',
        component: () => import('../views/CoursesPage.vue')
      },
      {
        path: ':courseId',
        props: true,
        meta: {
          title: createTitle('Course'),
          requiresAuth: true
        },
        component: () => import('../views/CoursePage.vue')
      },
      {
        path: ':courseId/exams/:examId',
        props: true,
        meta: {
          title: createTitle('Attempts'),
          requiresAuth: true
        },
        component: () => import('../views/AttemptsPage.vue')
      },
      {
        path: ':courseId/exams/:examId/:attemptId',
        name: 'Exam',
        props: true,
        meta: {
          title: createTitle('Exam'),
          requiresAuth: true
        },
        component: () => import('../views/ExamPage.vue')
      }
    ],
    component: () => import('../views/courses/Main.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      title: createTitle('Settings'),
      requiresAuth: true
    },
    component: () => import('../views/SettingsPage.vue')
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
