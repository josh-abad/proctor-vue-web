<template>
  <div class="p-4">
    <PageHeading
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' }
      ]"
    >
      <template #label>Create a course</template>
    </PageHeading>
    <AppPanel class="mt-8">
      <form class="flex flex-col items-start" @submit="saveCourse">
        <div class="sm:flex">
          <div>
            <label for="courseName">
              <AppLabel>Course name</AppLabel>
            </label>
            <AppInput id="courseName" v-model="courseName" type="text" />
          </div>
          <div class="inline-block mt-4 sm:mt-0 sm:ml-4">
            <label for="courseWeeks"><AppLabel>Course Weeks</AppLabel></label>
            <NumberInput
              id="courseWeeks"
              :min="4"
              :max="10"
              v-model.number="courseWeeks"
            />
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-4">
            <label for="coordinator">
              <AppLabel>Coordinator</AppLabel>
            </label>
            <AppDropdown
              class="w-60"
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
        <div class="flex justify-end w-full mt-4">
          <AppButton type="submit" prominent> Create </AppButton>
        </div>
      </form>
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
import PageHeading from '@/components/PageHeading.vue'
import NProgress from 'nprogress'
import NumberInput from '@/components/ui/NumberInput.vue'

export default defineComponent({
  name: 'CourseCreationPage',
  components: {
    AppInput,
    AppButton,
    AppTextArea,
    AppDropdown,
    AppLabel,
    AppPanel,
    PageHeading,
    NumberInput
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
        NProgress.start()
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
      } finally {
        NProgress.done()
      }
    }
  }
})
</script>
