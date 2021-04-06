<template>
  <AppPanel class="px-3 py-4" v-if="upcomingExams.length">
    <AppLabel emphasis>Upcoming Exams</AppLabel>
    <div>
      <div
        v-for="(event, i) in upcomingExams"
        :key="i"
        class="flex items-center py-1 text-sm text-gray-700 dark:text-gray-300"
      >
        <DocumentTextIcon class="w-4 h-4" />
        <div>
          <span class="ml-1 font-semibold text-gray-900 dark:text-white">
            {{ event.subject }}
          </span>
          {{ event.action }}
          {{ relativeDate(event) }}
        </div>
      </div>
    </div>
  </AppPanel>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import coursesService from '@/services/courses'
import { DocumentTextIcon } from '@heroicons/vue/solid'

dayjs.extend(relativeTime)

export default defineComponent({
  name: 'CoursePageUpcomingEvents',
  components: { AppPanel, AppLabel, DocumentTextIcon },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      upcomingExams: [] as AppEvent[]
    }
  },
  async created () {
    this.upcomingExams = await coursesService.getUpcomingExams(this.courseId)
  },
  methods: {
    relativeDate (event: AppEvent): string {
      return dayjs(event.date).fromNow()
    }
  }
})
</script>
