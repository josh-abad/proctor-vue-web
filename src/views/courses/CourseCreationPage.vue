<template>
  <div class="p-4">
    <AppPanel>
      <div class="text-xl font-semibold">Create New Course</div>
      <div class="flex flex-col items-start">
        <div class="flex mt-4">
          <div>
            <label for="courseName">
              <AppLabel>Course name</AppLabel>
            </label>
            <AppInput id="courseName" v-model="courseName" type="text" />
          </div>
          <div class="ml-4">
            <label for="courseWeeks"><AppLabel>Course Weeks</AppLabel></label>
            <input
              class="px-3 py-2 bg-gray-100 border-gray-300 rounded-lg shadow appearance-none focus:outline-none dark:bg-gray-800 focus:ring-0 dark:border-gray-700 focus:border-green-500"
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
        <div class="w-full mt-3">
          <label>
            <AppLabel>Course description</AppLabel>
            <AppTextArea v-model="courseDescription" class="w-full h-20" />
          </label>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <AppButton @click="saveCourse" prominent>Create</AppButton>
      </div>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppDropdown from '@/components/ui/AppDropdown.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppTextArea from '@/components/ui/AppTextArea.vue'
import { CREATE_COURSE } from '@/store/action-types'
import { NewCourse } from '@/types'
import { computed, defineComponent } from 'vue'
import useFetch from '@/composables/use-fetch'
import usersService from '@/services/users'

export default defineComponent({
  name: 'CourseCreationPage',
  components: { AppInput, AppButton, AppTextArea, AppDropdown, AppLabel, AppPanel },
  setup () {
    const [
      coordinators,
      fetchCoordinators,
      loading,
      error
    ] = useFetch(() => usersService.getCoordinators(), [])

    fetchCoordinators()

    const options = computed(() => (
      coordinators.value.map(({ fullName, id }) => {
        return { text: fullName, value: id }
      })
    ))

    return {
      coordinators: options,
      loading,
      error
    }
  },
  data () {
    return {
      courseName: '',
      courseDescription: '',
      coordinator: '',
      courseWeeks: 8
    }
  },
  methods: {
    async saveCourse () {
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
