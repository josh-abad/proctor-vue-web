<template>
  <ColorBackgroundCard>
    <div>
      <div class="font-semibold text-xl">Create New Course</div>
      <div class="flex flex-col items-start">
        <div class="mt-4 flex">
          <div>
            <label for="courseName">
              <BaseLabel>Course name</BaseLabel>
            </label>
            <BaseInput id="courseName" v-model="courseName" type="text" />
          </div>
          <div class="ml-4">
            <label for="courseWeeks"><BaseLabel>Course Weeks</BaseLabel></label>
            <input
              class="shadow focus:outline-none dark:bg-gray-800 appearance-none rounded-lg px-3 py-2 focus:ring-0 border-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500"
              type="number"
              id="courseWeeks"
              min="4"
              max="10"
              v-model.number="courseWeeks"
            />
          </div>
          <div class="ml-4">
            <label for="coordinator">
              <BaseLabel>Coordinator</BaseLabel>
            </label>
            <BaseDropdown
              v-if="coordinators.length"
              id="coordinator"
              :options="coordinators"
              v-model="coordinator"
            />
          </div>
        </div>
        <div class="mt-3 w-full">
          <label>
            <BaseLabel>Course description</BaseLabel>
            <BaseTextArea v-model="courseDescription" class="w-full h-20" />
          </label>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <BaseButton @click="saveCourse" prominent>Create</BaseButton>
      </div>
    </div>
  </ColorBackgroundCard>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'
import ColorBackgroundCard from '@/components/ColorBackgroundCard.vue'
import { CREATE_COURSE } from '@/store/action-types'
import { NewCourse, Option, User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CourseCreationPage',
  components: { BaseInput, BaseButton, BaseTextArea, BaseDropdown, BaseLabel, ColorBackgroundCard },
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

<style lang="postcss" scoped>
.label,
.label-line {
  @apply uppercase text-xs dark:text-gray-400 font-semibold tracking-wide;
}

.label-line {
  @apply pb-1 border-b dark:border-gray-700;
}
</style>
