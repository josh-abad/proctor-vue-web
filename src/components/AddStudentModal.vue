<template>
  <transition
    enter-active-class="transition ease-out duration-300 transform"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-300 transform"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div class="fixed z-30 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"
          ></div>
        </div>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <BasePanel vibrancy class="border-none">
            <div class="flex justify-between">
              <div class="font-bold text-lg">Choose Students</div>
              <button @click="$emit('close-modal')" class="focus:outline-none">
                <svg
                  class="fill-current w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="mt-4">
              <BaseInput
                type="text"
                v-model="searchFilter"
                placeholder="Search"
              />
            </div>
            <div class="mt-4 divide-y divide-gray-300 dark:divide-gray-700">
              <div
                v-for="student in filteredStudents"
                :key="student.id"
                class="py-2"
              >
                <input
                  type="checkbox"
                  :id="userFullName(student)"
                  :value="student.id"
                  v-model="checkedNames"
                />
                <label :for="userFullName(student)" class="ml-2"
                  ><div class="inline-block">
                    {{ userFullName(student) }}
                  </div>
                  <div
                    class="ml-2 inline-block text-sm text-gray-400 dark:text-gray-600"
                  >
                    @{{ student.username }}
                  </div>
                </label>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <BaseButton
                @click="handleSubmit"
                prominent
                :disabled="!checkedNames.length"
                >Add</BaseButton
              >
            </div>
          </BasePanel>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Course, User } from '@/types'
import BasePanel from '@/components/BasePanel.vue'
import BaseButton from './BaseButton.vue'
import { ENROLL_STUDENTS } from '@/store/action-types'
import BaseInput from './BaseInput.vue'

export default defineComponent({
  components: { BasePanel, BaseButton, BaseInput },
  name: 'AddStudentModal',
  emits: ['close-modal'],
  data () {
    return {
      checkedNames: [],
      searchFilter: ''
    }
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  methods: {
    userFullName (user: User): string {
      const { first, last } = user.name
      return `${first} ${last}`
    },
    async handleSubmit (): Promise<void> {
      const payload = {
        userIds: this.checkedNames,
        courseId: this.courseId
      }
      await this.$store.dispatch(ENROLL_STUDENTS, payload)
      this.$emit('close-modal')
    }
  },
  computed: {
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    },
    students (): User[] {
      return this.$store.getters.students
    },
    unenrolledStudents (): User[] {
      const unenrolledStudents = (student: User) => {
        return !this.course.studentsEnrolled.includes(student.id)
      }
      return this.students.filter(unenrolledStudents)
    },
    filteredStudents (): User[] {
      return this.unenrolledStudents.filter(student => {
        const studentFullName = this.userFullName(student)
        return studentFullName.toLowerCase().includes(this.searchFilter.toLowerCase())
      })
    }
  }
})
</script>
