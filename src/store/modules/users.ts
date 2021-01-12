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
      if (users) {
        users.sort(alphabeticalUsers)
      }
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
    coordinators (state): User[] {
      return state.users.filter(user => user.role === 'coordinator')
    },
    students (state): User[] {
      return state.users.filter(user => user.role === 'student')
    },
    studentByID (state, getters): (studentId: string) => User | undefined {
      return studentId => {
        const students: User[] = getters.students
        return students.find(student => student.id === studentId)
      }
    },
    userByID (state): (id: string) => User | undefined {
      return id => state.users.find(user => user.id === id)
    },
    studentsByCourse (state, getters): (courseId: string) => (User | undefined)[] {
      return (courseId) => {
        const course: Course | undefined = getters.courseByID(courseId)
        const userByID: (id: string) => User | undefined = getters.userByID
        return course ? course.studentsEnrolled
          .map(userByID)
          .filter(student => !!student)
          .sort(alphabeticalUsers) : []
      }
    }
  }
} as Module<UsersState, RootState>
