import { alphabeticalUsers } from '@/utils/sort'
import { GetterTree } from 'vuex'
import { State, Getters } from '@/store/interfaces'

export default {
  isLoggedIn (state): boolean {
    return state.user !== null
  },
  permissions (state) {
    return (roles) => {
      return state.user ? roles.includes(state.user.role) : false
    }
  },
  hasCourse (state) {
    return courseId => {
      return !!state.user && state.user.courses.includes(courseId)
    }
  },
  theme (state) {
    return state.theme
  },
  coordinators (state) {
    return state.users.filter(user => user.role === 'coordinator')
  },
  students (state) {
    return state.users.filter(user => user.role === 'student')
  },
  studentByID (state, getters) {
    return studentId => {
      return getters.students.find(student => student.id === studentId)
    }
  },
  userByID (state) {
    return id => state.users.find(user => user.id === id)
  },
  studentsByCourse (state, getters) {
    return (courseId) => {
      const course = getters.courseByID(courseId)
      return course ? course.studentsEnrolled
        .map(getters.userByID)
        .filter(student => !!student)
        .sort(alphabeticalUsers) : []
    }
  },
  avatarUrlByUser (state) {
    return userId => {
      return state.users.find(user => user.id === userId)?.avatarUrl
    }
  },
  courseByID (state) {
    return (id) => {
      return state.courses.find(course => course.id === id)
    }
  },
  courses (state) {
    if (!state.user) {
      return []
    }

    const { id, role } = state.user
    if (role === 'student') {
      return state.courses.filter(course => course.studentsEnrolled.includes(id))
    } else if (state.user.role === 'coordinator') {
      return state.courses.filter(course => course.coordinator.id === id)
    }
    return state.courses
  },
  examByID (state) {
    return id => state.exams.find(exam => exam.id === id)
  },
  attemptByID (state) {
    return id => state.attempts.find(attempt => attempt.id === id)
  },
  examsByCourse (state) {
    return courseId => state.exams.filter(exam => exam?.course?.id === courseId)
  },
  examsForUser (state) {
    if (state.user && state.user.role === 'admin') {
      return state.exams
    }
    return state.exams.filter(exam => {
      return state.user?.courses.includes(exam.course.id)
    })
  },
  attemptsByUser (state) {
    return userId => state.attempts ? state.attempts.filter(attempt => attempt.user === userId) : []
  },
  resultsByUser (state) {
    return userId => state.examResults.filter(result => {
      return result.user.id === userId
    })
  },
  examsByWeek (state, getters) {
    return (courseId, week) => getters.examsByCourse(courseId).filter(exam => exam.week === week)
  },
  courseCompletedPercentage (state, getters) {
    return (courseId, userId) => {
      const exams = getters.examsByCourse(courseId)
      const examsTaken = exams.filter(exam => getters.examTaken(exam.id, userId))
      const percentage = examsTaken.length / exams.length * 100
      return examsTaken.length === 0 ? 0 : Math.floor(percentage)
    }
  },
  getAttemptsByExam (state) {
    return examId => state.attempts.filter(attempt => attempt.exam && attempt.exam.id === examId)
  },
  examTaken (state, getters) {
    return (examId, userId?) => {
      const results = userId ? getters.resultsByUser(userId) : state.examResults
      return results.some(result => result.exam === examId)
    }
  },
  courseGrades (state) {
    return (courseId, userId) => {
      const examsInCourse = state.exams.filter(exam => {
        return exam.course.id === courseId
      })

      const grades = examsInCourse.filter(exam => !!exam).map(exam => {
        const examAttempts = state.attempts.filter(attempt => {
          return attempt.user === userId && attempt.exam?.id === exam.id
        })

        const highestScore = examAttempts.reduce((a, b) => {
          return Math.max(a, b.score)
        }, 0)

        return Math.floor(highestScore / exam.examItems.length * 100)
      })

      return grades
    }
  },
  courseTotal (state, getters) {
    return (courseId, userId) => {
      const grades: number[] = getters.courseGrades(courseId, userId)

      // TODO: until each exam has an associated weight, calculate the regular mean
      const examCount = state.exams.filter(exam => exam.course.id === courseId).length

      const total = grades
        .map(grade => grade * (1 / examCount))
        .reduce((a, b) => a + b, 0)
      return Math.round(total)
    }
  }
} as GetterTree<State, State> & Getters
