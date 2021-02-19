<template>
  <div class="text-base font-normal flex justify-between items-center">
    <router-link
      :to="`/courses/${exam.course.id}/exams/${exam.id}`"
      class="flex items-center"
      :class="{
        'text-gray-500 pointer-events-none': locked && !taken,
      }"
    >
      <svg class="mr-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <!-- Heroicon name: document-text -->
        <path
          v-if="!locked"
          fill-rule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          clip-rule="evenodd"
        />
        <!-- Heroicon name: lock-closed -->
        <path
          v-else
          fill-rule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clip-rule="evenodd"
        />
      </svg>
      {{ exam.label }}</router-link
    >
    <SVGCheckbox v-model="taken" static-check />
  </div>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent } from 'vue'
import examMixin from '@/mixins/exam'
import SVGCheckbox from '@/components/SVGCheckbox.vue'

export default defineComponent({
  name: 'WeekExam',
  components: { SVGCheckbox },
  mixins: [examMixin],
  props: {
    exam: {
      type: Object as () => Exam,
      required: true
    }
  },
  computed: {
    locked (): boolean {
      return this.examLocked(this.exam) !== 0
    },
    taken (): boolean {
      return this.$store.getters.examTaken(this.exam.id, this.$store.state.user.id)
    }
  }
})
</script>
