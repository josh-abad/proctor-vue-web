<template>
  <div class="week-exam">
    <router-link
      :to="`/courses/${exam.course.id}/exams/${exam.id}`"
      class="week-exam__link"
      :class="{
        'week-exam__link--locked': locked && !taken,
      }"
    >
      <DocumentTextIcon class="week-exam__icon" v-if="!locked" />
      <LockClosedIcon class="week-exam__icon" v-else />
      {{ exam.label }}
    </router-link>
    <SVGCheckbox v-model="taken" static-check />
  </div>
</template>

<script lang="ts">
import { Exam } from '@/types'
import { defineComponent, PropType, ref } from 'vue'
import SVGCheckbox from '@/components/SVGCheckbox.vue'
import { DocumentTextIcon, LockClosedIcon } from '@heroicons/vue/solid'
import { isExamLocked } from '@/utils/helper'
import examsService from '@/services/exams'
import { useStore } from '@/store'

export default defineComponent({
  name: 'WeekExam',
  components: { SVGCheckbox, DocumentTextIcon, LockClosedIcon },
  props: {
    exam: {
      type: Object as PropType<Exam>,
      required: true
    }
  },
  setup (props) {
    const store = useStore()

    const taken = ref(false)

    const isExamTaken = async () => {
      if (!store.state.user) {
        return
      }
      const { isTaken } = await examsService.isExamTaken(props.exam.id, store.state.user.id)
      taken.value = isTaken
    }

    isExamTaken()

    return {
      taken
    }
  },
  computed: {
    locked (): boolean {
      return isExamLocked(this.exam) !== 0
    }
  }
})
</script>

<style lang="postcss" scoped>
.week-exam {
  @apply text-base font-normal flex justify-between items-center;
}
.week-exam__link {
  @apply flex items-center;
}

.week-exam__link--locked {
  @apply text-gray-500 pointer-events-none;
}

.week-exam__icon {
  @apply mr-2 w-5 h-5;
}
</style>
