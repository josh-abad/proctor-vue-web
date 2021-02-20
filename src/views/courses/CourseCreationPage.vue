<template>
  <ColorBackgroundCard>
    <div>
      <div class="font-semibold text-xl">Create New Course</div>
      <div class="flex flex-col items-start">
        <div class="mt-4 flex">
          <div>
            <label for="courseName">
              <AppLabel>Course name</AppLabel>
            </label>
            <AppInput id="courseName" v-model="courseName" type="text" />
          </div>
          <div class="ml-4">
            <label for="courseWeeks"><AppLabel>Course Weeks</AppLabel></label>
            <input
              class="shadow focus:outline-none bg-gray-100 dark:bg-gray-800 appearance-none rounded-lg px-3 py-2 focus:ring-0 border-gray-300 dark:border-gray-700 focus:border-green-500"
              type="number"
              id="courseWeeks"
              min="4"
              max="10"
              v-model.number="courseWeeks"
            />
          </div>
          <div class="ml-4">
            <label for="coordinator">
              <AppLabel>Coordinator</AppLabel>
            </label>
            <AppDropdown
              v-if="coordinators.length"
              id="coordinator"
              :options="coordinators"
              v-model="coordinator"
            />
          </div>
        </div>
        <div class="mt-3 w-full">
          <label>
            <AppLabel>Course description</AppLabel>
            <AppTextArea v-model="courseDescription" class="w-full h-20" />
          </label>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <AppButton @click="saveCourse" prominent>Create</AppButton>
      </div>
    </div>
  </ColorBackgroundCard>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppDropdown from '@/components/ui/AppDropdown.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppTextArea from '@/components/ui/AppTextArea.vue'
import ColorBackgroundCard from '@/components/ColorBackgroundCard.vue'
import { CREATE_COURSE } from '@/store/action-types'
import { NewCourse, Option, User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CourseCreationPage',
  components: { AppInput, AppButton, AppTextArea, AppDropdown, AppLabel, ColorBackgroundCard },
  data () {
    return {
      courseName: '',
      courseDescription: '',
      coordinator: '',
      courseWeeks: 8
    }
  },
  computed: {
    coordinators (): Option[] {
      return this.$store.getters.coordinators.map((c: User) => {
        return { text: c.fullName, value: c.id }
      })
    }
  },
  methods: {
    async saveCourse (): Promise<void> {
      const newCourse: NewCourse = {
        name: this.courseName,
        description: this.courseDescription,
        coordinatorId: this.coordinator,
        weeks: this.courseWeeks
      }
      await this.$store.dispatch(CREATE_COURSE, newCourse)
      this.$router.push('/courses')
    }
  }
})
</script>
