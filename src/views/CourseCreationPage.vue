<template>
  <div>
    <div
      v-show="userRole === 'admin'"
      class="px-5 py-5 bg-gray-100 dark:bg-gray-800 rounded-lg"
    >
      <div>Create New Course</div>
      <div class="flex flex-col items-start">
        <div class="mt-4">
          <label>
          Course name
          <BaseInput v-model="courseName" placeholder="Course name" />
          </label>
        </div>
        <div class="mt-3">
          <label>
            Course description
            <BaseTextArea v-model="courseDescription" placeholder="Course description" />
          </label>
        </div>
        <div class="mt-2">
          <label>
            Coordinator
            <BaseDropdown v-model="coordinator" :options="coordinators" />
          </label>
        </div>
      </div>
      <div class="mt-4">
        <BaseButton label="Create" @click="saveCourse" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'
import { CREATE_COURSE } from '@/store/action-types'
import { NewCourse, Option, Role, User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CourseCreationPage',
  components: { BaseInput, BaseButton, BaseTextArea, BaseDropdown },
  data () {
    return {
      courseName: '',
      courseDescription: '',
      coordinator: ''
    }
  },
  computed: {
    userRole (): Role {
      return this.$store.getters.userRole
    },
    coordinators (): Option[] {
      return this.$store.getters.coordinators.map((c: Omit<User, 'token'>) => {
        return { text: `${c.name.first} ${c.name.last}`, value: c.id }
      })
    }
  },
  methods: {
    async saveCourse (): Promise<void> {
      const newCourse: NewCourse = {
        name: this.courseName,
        coordinatorId: this.coordinator
      }
      await this.$store.dispatch(CREATE_COURSE, newCourse)
      this.$router.push('/courses')
    }
  }
})
</script>
