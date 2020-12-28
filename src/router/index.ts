import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

const createTitle = (pageName: string): string => {
  return `${pageName} - Proctor Vue`
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: createTitle('Home'),
      requiresAuth: true
    },
    component: () => import('../views/Home.vue')
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
        path: 'new',
        component: () => import('../views/CourseCreationPage.vue')
      },
      {
        path: ':courseId',
        props: true,
        meta: {
          title: createTitle('Course')
        },
        component: () => import('../views/CoursePage.vue')
      },
      {
        path: ':courseId/exams/new',
        props: true,
        meta: {
          title: createTitle('Create Exam')
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
      requiresAuth: true
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
