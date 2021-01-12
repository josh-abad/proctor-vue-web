import { Course, RootState, User, UsersState } from '@/types'
import { Module } from 'vuex'
import { ALERT, LOAD_USERS } from '../action-types'
import { SET_USERS } from '../mutation-types'
import usersService from '@/services/users'
import { alphabeticalUsers } from '@/utils/sort'

export default {
  state: () => ({
    users: []
  }),
  mutations: {
    [SET_USERS] (state, users: User[]): void {
      users.sort(alphabeticalUsers)
      state.users = users
    }
  },
  actions: {
    async [LOAD_USERS] ({ commit, dispatch }): Promise<void> {
      try {
        commit(SET_USERS, await usersService.getAll())
      } catch (error) {
        dispatch(ALERT, 'Could not load users from server')
      }
    }
  },
  getters: {
    coordinators (state): Omit<User, 'token'>[] {
      return state.users.filter(user => user.role === 'coordinator')
    },
    students (state): Omit<User, 'token'>[] {
      return state.users.filter(user => user.role === 'student')
    },
    studentByID (state): (studentId: string) => User | undefined {
      return studentId => {
        return state.users.filter(user => user.role === 'student').find(student => student.id === studentId)
      }
    },
    userByID (state): (id: string) => User | undefined {
      return id => {
        return state.users.find(user => user.id === id)
      }
    },
    studentsByCourse (state, getters): (courseId: string) => (User | undefined)[] | undefined {
      return (courseId) => {
        const course: Course = getters.getCourseByID(courseId)
        return course.studentsEnrolled.map(studentId => {
          const student = state.users.find(user => user.id === studentId)
          return student
        }).filter(student => !!student).sort(alphabeticalUsers)
      }
    }
  }
} as Module<UsersState, RootState>
