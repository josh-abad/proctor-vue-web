<template>
  <li class="flex items-center justify-between text-base font-normal">
    <router-link
      :to="`/courses/${courseSlug}/${exam.slug}`"
      class="flex items-center transition-colors duration-200 ease-in-out"
      :class="{
        'text-gray-500 hover:text-gray-900 dark:hover:text-white':
          locked && !exam.isTaken
      }"
    >
      <DocumentTextIcon class="w-5 h-5 mr-4" v-if="!locked" />
      <LockClosedIcon class="w-5 h-5 mr-4" v-else />
      {{ exam.label }}
    </router-link>
    <SVGCheckbox :model-value="exam.isTaken" static-check />
  </li>
</template>

<script lang="ts">
import { ExamWithTaken } from '@/types'
import { defineComponent, PropType } from 'vue'
import SVGCheckbox from '@/components/SVGCheckbox.vue'
import { DocumentTextIcon, LockClosedIcon } from '@heroicons/vue/solid'
import { isExamLocked } from '@/utils/helper'

export default defineComponent({
  name: 'WeekExam',
  components: { SVGCheckbox, DocumentTextIcon, LockClosedIcon },
  props: {
    exam: {
      type: Object as PropType<ExamWithTaken>,
      required: true
    },

    courseSlug: {
      type: String,
      required: true
    }
  },
  computed: {
    locked(): boolean {
      return isExamLocked(this.exam) !== 0
    }
  }
})
</script>
