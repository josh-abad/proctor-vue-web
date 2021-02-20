<template>
  <AppPanel
    class="px-3 py-4"
    :class="showMore ? 'h-56' : 'h-36'"
    v-if="upcomingExams.length"
  >
    <div class="flex justify-between items-center">
      <AppLabel emphasis>Upcoming Exams</AppLabel>
      <div v-if="moreThanMax">
        <button
          class="focus:outline-none text-sm"
          @click="showMore = !showMore"
        >
          <!-- Heroicon name: chevron-down -->
          <svg
            class="fill-current text-gray-500 w-5 h-5 transform ease-in duration-100"
            :class="showMore ? 'rotate-180' : 'rotate-0'"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    <div>
      <div
        v-for="(event, i) in visibleExams"
        :key="i"
        class="flex py-1 items-center text-sm text-gray-700 dark:text-gray-300"
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

dayjs.extend(relativeTime)
const MAX_VISIBLE = 3

export default defineComponent({
  name: 'CoursePageUpcomingEvents',
  components: { AppPanel, AppLabel },
  props: {
    courseName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMore: false
    }
  },
  computed: {
    upcomingExams (): AppEvent[] {
      return this.$store.getters.upcomingExamsByCourse(this.courseName)
    },
    visibleExams (): AppEvent[] {
      if (this.showMore) {
        return this.upcomingExams
      }
      return this.upcomingExams.slice(0, MAX_VISIBLE)
    },
    moreThanMax (): boolean {
      return this.upcomingExams.length > MAX_VISIBLE
    }
  },
  methods: {
    relativeDate (event: AppEvent): string {
      return dayjs(event.date).fromNow()
    }
  }
})
</script>
