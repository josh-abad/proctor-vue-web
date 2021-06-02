import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { Role } from '@/types'
import useTitle from '@/composables/use-title'

const { setTitle } = useTitle()

const createTitle = (pageName: string): string => {
  return `${pageName} - Proctor Vue`
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Proctor Vue',
      authorize: [] as Role[]
    },
    component: () => import('../views/Home/Home.vue')
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
        name: 'Courses Page',
        component: () => import('../views/courses/CoursesPage/CoursesPage.vue')
      },
      {
        path: 'new',
        name: 'Course Creation Page',
        meta: {
          authorize: ['admin'] as Role[],
          title: createTitle('New Course')
        },
        component: () => import('../views/courses/CourseCreationPage.vue')
      },
      {
        path: ':courseId',
        props: true,
        meta: {
          title: createTitle('Course')
        },
        children: [
          {
            path: 'overview',
            alias: '',
            props: true,
            meta: {
              tabPosition: 1
            },
            component: () =>
              import(
                '../views/courses/course/CourseOverview/CourseOverview.vue'
              )
          },
          {
            path: 'students',
            props: true,
            meta: {
              tabPosition: 2
            },
            component: () =>
              import(
                '../views/courses/course/CourseStudents/CourseStudents.vue'
              )
          },
          {
            path: 'grades',
            props: true,
            meta: {
              tabPosition: 3
            },
            component: () =>
              import('../views/courses/course/CourseGrades/CourseGrades.vue')
          }
        ],
        component: () => import('../views/courses/CoursePage/CoursePage.vue')
      },
      {
        path: ':courseId/exams/new',
        props: true,
        meta: {
          title: createTitle('Create Exam'),
          authorize: ['coordinator', 'admin'] as Role[]
        },
        component: () => import('../views/courses/ExamCreationPage.vue')
      },
      {
        path: ':courseId/exams/:examId',
        props: true,
        meta: {
          title: createTitle('Attempts')
        },
        component: () =>
          import('../views/courses/AttemptsPage/AttemptsPage.vue')
      },
      {
        path: ':courseId/exams/:examId/:attemptId',
        name: 'Exam',
        props: true,
        meta: {
          title: createTitle('Exam')
        },
        component: () => import('../views/courses/ExamPage.vue')
      }
    ],
    component: () => import('../views/Courses.vue')
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
        name: 'Students Page',
        component: () => import('../views/students/StudentsPage.vue')
      },
      {
        path: ':studentId/enroll',
        meta: {
          title: createTitle('Enroll Student')
        },
        component: () => import('../views/students/EnrollmentPage.vue')
      }
    ],
    component: () => import('../views/Students.vue')
  },
  {
    path: '/webcam',
    name: 'Webcam',
    meta: {
      title: createTitle('Webcam'),
      authorize: [] as Role[]
    },
    component: () => import('../views/WebcamTest.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      title: createTitle('Settings'),
      authorize: [] as Role[]
    },
    component: () => import('../views/SettingsPage/SettingsPage.vue')
  },
  {
    path: '/verify/:token',
    name: 'Verify',
    props: true,
    meta: {
      title: createTitle('Verify')
    },
    component: () => import('../views/Verify.vue')
  },
  {
    path: '/user/:userId/reference-image',
    name: 'Face Identification',
    props: true,
    meta: {
      title: createTitle('Face Identification'),
      authorize: [] as Role[]
    },
    component: () =>
      import('../views/FaceIdentificationPage/FaceIdentificationPage.vue')
  },
  {
    path: '/user/:userId',
    name: 'Profile',
    props: true,
    meta: {
      title: createTitle('Profile'),
      authorize: [] as Role[]
    },
    component: () => import('../views/UserPage.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    meta: {
      title: createTitle('Calendar'),
      authorize: [] as Role[]
    },
    component: () => import('../views/CalendarPage/CalendarPage.vue')
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
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

router.beforeEach((to, _from, next) => {
  setTitle(to.meta.title as string)

  const authorize = to.meta.authorize as Role[]

  if (authorize) {
    if (!store.state.user) {
      return next({ name: 'Login', query: { redirect: to.fullPath } })
    }

    if (authorize.length && !authorize.includes(store.state.user.role)) {
      return next({ path: '/' })
    }
  }

  next()
})

router.afterEach((to, from) => {
  if (to.meta.tabPosition && from.meta.tabPosition) {
    const toTabPosition = to.meta.tabPosition as number
    const fromTabPosition = from.meta.tabPosition as number
    to.meta.transition =
      toTabPosition < fromTabPosition ? 'slide-right' : 'slide-left'
  }
})

export default router
