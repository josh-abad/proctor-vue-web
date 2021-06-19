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
    name: 'LoggedInView',
    meta: {
      title: 'Proctor Vue',
      authorize: [] as Role[]
    },
    component: () => import('../views/LoggedInView.vue'),
    children: [
      {
        path: '/home',
        alias: '/',
        name: 'Home',
        meta: {
          title: 'Proctor Vue',
          authorize: [] as Role[]
        },
        component: () => import('../views/Home/Home.vue')
      },
      {
        path: '/courses',
        name: 'Courses',
        meta: {
          authorize: [] as Role[],
          title: createTitle('Courses')
        },
        children: [
          {
            path: '',
            name: 'Courses Page',
            component: () =>
              import('../views/courses/CoursesPage/CoursesPage.vue')
          },
          {
            path: 'new',
            name: 'Course Creation Page',
            meta: {
              authorize: ['coordinator', 'admin'] as Role[],
              title: createTitle('New Course')
            },
            component: () => import('../views/courses/CourseCreationPage.vue')
          },
          {
            path: ':slug',
            props: true,
            children: [
              {
                path: 'overview',
                alias: '',
                props: true,
                component: () =>
                  import(
                    '../views/courses/course/CourseOverview/CourseOverview.vue'
                  )
              },
              {
                path: 'students',
                props: true,
                component: () =>
                  import(
                    '../views/courses/course/CourseStudents/CourseStudents.vue'
                  )
              },
              {
                path: 'grades',
                props: true,
                component: () =>
                  import(
                    '../views/courses/course/CourseGrades/CourseGrades.vue'
                  )
              }
            ],
            component: () =>
              import('../views/courses/CoursePage/CoursePage.vue')
          },
          {
            path: ':slug/create-exam',
            props: true,
            meta: {
              title: createTitle('Create Exam'),
              authorize: ['coordinator', 'admin'] as Role[]
            },
            component: () => import('../views/courses/ExamCreationPage.vue')
          },
          {
            path: ':courseSlug/:examSlug/edit',
            props: true,
            meta: {
              title: createTitle('Edit Exam'),
              authorize: ['coordinator', 'admin'] as Role[]
            },
            component: () => import('../views/courses/ExamEditPage.vue')
          },
          {
            path: ':courseSlug/:examSlug',
            props: true,
            component: () => import('../views/ExamView.vue'),
            children: [
              {
                path: 'attempts',
                alias: '',
                props: true,
                component: () => import('../views/AttemptsPage.vue')
              },
              {
                path: 'attempt/:id',
                props: true,
                component: () => import('../views/ExamPage.vue')
              }
            ]
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
        path: '/settings',
        name: 'Settings',
        meta: {
          title: createTitle('Settings'),
          authorize: [] as Role[]
        },
        component: () => import('../views/SettingsView.vue'),
        children: [
          {
            path: '',
            name: 'Settings',
            component: () => import('../views/SettingsPage/SettingsPage.vue')
          },
          {
            path: 'face-id',
            name: 'Face Identification',
            props: true,
            meta: {
              title: createTitle('Face Identification'),
              authorize: [] as Role[]
            },
            component: () =>
              import(
                '../views/FaceIdentificationPage/FaceIdentificationPage.vue'
              )
          }
        ]
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
      }
    ]
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
    path: '/verify/:token',
    name: 'Verify',
    props: true,
    meta: {
      title: createTitle('Verify')
    },
    component: () => import('../views/Verify.vue')
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
    if (to.hash) {
      return {
        el: to.hash,
        top: 56 // the height of TheAppBar is h-14 (3.5rem/56px)
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    setTitle(to.meta.title as string)
  }

  const authorize = to.meta.authorize as Role[]

  if (
    typeof to.name === 'string' &&
    ['Login', 'Register'].includes(to.name) &&
    store.state.user
  ) {
    return next({ path: '/' })
  }

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

export default router
