<template>
  <div class="p-4">
    <PageHeader
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
        { name: 'New Course', url: '/courses/new' }
      ]"
    >
      <template #label>Create a course</template>
    </PageHeader>
    <AppPanel class="mt-8">
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
import { computed, defineComponent } from 'vue'
import useFetch from '@/composables/use-fetch'
import usersService from '@/services/users'
import coursesService from '@/services/courses'
import useSnackbar from '@/composables/use-snackbar'
import PageHeader from '@/components/PageHeader/PageHeader.vue'

export default defineComponent({
  name: 'CourseCreationPage',
  components: {
    AppInput,
    AppButton,
    AppTextArea,
    AppDropdown,
    AppLabel,
    AppPanel,
    PageHeader
  },
  setup() {
    const { setSnackbarMessage } = useSnackbar()

    const [coordinators, fetchCoordinators, loading, error] = useFetch(
      () => usersService.getCoordinators(),
      []
    )

    fetchCoordinators()

    const options = computed(() =>
      coordinators.value.map(({ fullName, id }) => {
        return { text: fullName, value: id }
      })
    )

    return {
      coordinators: options,
      loading,
      error,
      setSnackbarMessage
    }
  },
  data() {
    return {
      courseName: '',
      courseDescription: '',
      coordinator: '',
      courseWeeks: 8
    }
  },
  methods: {
    async saveCourse() {
      try {
        await coursesService.create({
          name: this.courseName,
          description: this.courseDescription,
          coordinatorId: this.coordinator,
          weeks: this.courseWeeks
        })
        await this.$router.push('/courses')
        this.setSnackbarMessage('Course successfully created', 'success')
      } catch (error) {
        this.setSnackbarMessage(
          `${this.courseName} already is already taken.`,
          'error'
        )
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
#courseWeeks {
  @apply px-3 py-2 appearance-none focus:outline-none focus:ring-0 focus:border-green-500;
  @apply bg-gray-100 border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700;
}
</style>
