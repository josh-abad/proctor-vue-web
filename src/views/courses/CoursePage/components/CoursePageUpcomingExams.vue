<template>
  <AppPanel class="px-3 py-4" v-if="upcomingExams.length">
    <AppLabel emphasis>Upcoming Exams</AppLabel>
    <div>
      <div
        v-for="(event, i) in upcomingExams"
        :key="i"
        class="flex items-center py-1 text-sm text-gray-700 dark:text-gray-300"
      >
        <!-- Heroicon name: document-text -->
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clip-rule="evenodd"
          />
        </svg>
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

dayjs.extend(relativeTime)

export default defineComponent({
  name: 'CoursePageUpcomingEvents',
  components: { AppPanel, AppLabel },
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
