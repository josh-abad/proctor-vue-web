import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { Role } from '@/types'
import NProgress from 'nprogress'

const createTitle = (pageName: string): string => {
  return `${pageName} - Proctor Vue`
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: createTitle('Home'),
      authorize: [] as Role[]
    },
    component: () => import('../views/Home.vue')
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
      title: createTitle('Courses'),
      authorize: [] as Role[]
    },
    children: [
      {
        path: '',
        component: () => import('../views/CoursesPage.vue')
      },
      {
        path: 'new',
        meta: {
          authorize: ['admin'] as Role[]
        },
        component: () => import('../views/CourseCreationPage.vue')
      },
      {
        path: ':courseId',
        props: true,
        meta: {
          title: createTitle('Course')
        },
        children: [
          {
            path: 'students',
            props: true,
            meta: {
              transition: 'slide-left'
            },
            component: () => import('../components/CourseStudents.vue')
          },
          {
            path: 'overview',
            alias: '',
            props: true,
            meta: {
              transition: 'slide-right'
            },
            component: () => import('../components/CourseOverview.vue')
          }
        ],
        component: () => import('../views/CoursePage.vue')
      },
      {
        path: ':courseId/exams/new',
        props: true,
        meta: {
          title: createTitle('Create Exam'),
          authorize: ['coordinator', 'admin'] as Role[]
        },
        component: () => import('../views/ExamCreationPage.vue')
      },
      {
        path: ':courseId/exams/:examId',
        props: true,
        meta: {
          title: createTitle('Attempts')
        },
        component: () => import('../views/AttemptsPage.vue')
      },
      {
        path: ':courseId/exams/:examId/:attemptId',
        name: 'Exam',
        props: true,
        meta: {
          title: createTitle('Exam')
        },
        component: () => import('../views/ExamPage.vue')
      }
    ],
    component: () => import('../views/courses/Main.vue')
  },
  {
    path: '/students',
    name: 'Students',
    props: true,
    meta: {
      title: createTitle('Students'),
      authorize: ['coordinator', 'admin'] as Role[]
    },
    children: [
      {
        path: '',
        component: () => import('../views/StudentsPage.vue')
      },
      {
        path: ':studentId/enroll',
        component: () => import('../views/EnrollmentPage.vue')
      }
    ],
    component: () => import('../views/students/Main.vue')
  },
  {
    path: '/webcam',
    name: 'Webcam',
    meta: {
      title: createTitle('Webcam'),
      authorize: [] as Role[]
    },
    component: () => import('../components/Webcam.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      title: createTitle('Settings'),
      authorize: [] as Role[]
    },
    component: () => import('../views/SettingsPage.vue')
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
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title

  const { authorize } = to.meta

  if (authorize) {
    if (!store.getters.isLoggedIn) {
      return next({ name: 'Login', query: { redirect: to.fullPath } })
    }

    if (authorize.length && !authorize.includes(store.getters.userRole)) {
      return next({ path: '/' })
    }
  }

  next()
})

export default router
