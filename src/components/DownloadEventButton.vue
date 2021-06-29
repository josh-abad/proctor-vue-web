<template>
  <AppButton @click="saveEvent">
    <span class="flex items-center">
      <DownloadIcon class="w-5 h-5" />
      <span class="flex items-center">
        <span class="ml-1.5">Add to Calendar</span>
      </span>
    </span>
  </AppButton>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import AppButton from './ui/AppButton.vue'
import { DownloadIcon } from '@heroicons/vue/solid'
import { Exam } from '@/types'
import dayjs from 'dayjs'
import * as ics from 'ics'
import useCourse from '@/composables/use-course'
import useSnackbar from '@/composables/use-snackbar'

export default defineComponent({
  name: 'DownloadEventButton',
  components: { AppButton, DownloadIcon },
  props: {
    exam: {
      type: Object as PropType<Exam>,
      required: true
    }
  },
  setup(props) {
    const { course } = useCourse(props.exam.course.slug)

    const coordinator = computed(() => {
      return course.value?.coordinator
    })

    const { setSnackbarMessage } = useSnackbar()

    return {
      coordinator,
      setSnackbarMessage
    }
  },
  methods: {
    saveEvent() {
      function download(filename: string, text: string) {
        const element = document.createElement('a')
        element.setAttribute(
          'href',
          'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
        )
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
      }

      const startDate = dayjs(this.exam.startDate)
      const endDate = dayjs(this.exam.endDate)
      ics.createEvent(
        {
          start: [
            startDate.get('year'),
            startDate.get('month') + 1,
            startDate.get('date'),
            0,
            0
          ],
          end: [
            endDate.get('year'),
            endDate.get('month') + 1,
            endDate.get('date'),
            0,
            0
          ],
          title: `${this.exam.label} in ${this.exam.course.name}`,
          description: `${this.exam.label} opens in ${this.exam.course.name}.`,
          url: `https://www.proctorvue.live/courses/${this.exam.course.slug}/${this.exam.slug}`,
          organizer: {
            name: this.coordinator?.fullName ?? '',
            email: this.coordinator?.email ?? ''
          }
        },
        (error, value) => {
          if (error) {
            this.setSnackbarMessage('Could not download event.', 'error')
            return
          }

          download('event.ics', value)
        }
      )
    }
  }
})
</script>
