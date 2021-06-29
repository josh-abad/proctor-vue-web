<template>
  <AppButton v-bind="$attrs" id="btn-open" @click="modal = true">
    View Essay
  </AppButton>
  <teleport to="#modals">
    <AppModal v-model="modal" class="w-1/2 max-h-[90%]">
      <template #header>
        <div class="flex items-center">
          <button
            @click="page--"
            :disabled="page === 0"
            class="disabled:opacity-50 focus:outline-none"
          >
            <ChevronLeftIcon class="w-6 h-6" />
          </button>
          <div>{{ page + 1 }} / {{ essays.length }}</div>
          <button
            @click="page++"
            :disabled="page === essays.length - 1"
            class="disabled:opacity-50 focus:outline-none"
          >
            <ChevronRightIcon class="w-6 h-6" />
          </button>
        </div>
      </template>
      <template #body>
        <div class="text-gray-900 dark:text-white">
          <div class="flex items-start justify-between">
            <p class="w-3/4 text-justify">{{ viewingEssay.question }}</p>
            <div class="text-gray-400">
              {{ viewingEssay.points }}
              {{ viewingEssay.points === 1 ? 'pt' : 'pts' }}
            </div>
          </div>
          <p
            class="
              px-3
              py-2
              mt-4
              text-justify
              border border-gray-400
              rounded-lg
              dark:border-gray-600
              max-h-1/2
            "
          >
            {{ viewingEssay.answer[0] }}
          </p>
          <div class="flex items-center justify-end mt-4">
            <label for="points">Points</label>
            <NumberInput
              id="points"
              v-model="scores[page].points"
              :min="0"
              :max="viewingEssay.points"
              class="ml-2 w-14"
            />
          </div>
        </div>
      </template>
      <template #action>
        <AppButton @click="$emit('confirm', scores)" prominent>
          Confirm Points
        </AppButton>
      </template>
    </AppModal>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import NumberInput from './ui/NumberInput.vue'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/solid'
import { Score } from '@/types'

export default defineComponent({
  name: 'GradeEssayModal',
  components: {
    AppButton,
    AppModal,
    NumberInput,
    ChevronRightIcon,
    ChevronLeftIcon
  },
  inheritAttrs: false,
  props: {
    essays: {
      type: Array as PropType<
        { id: string; question: string; points: number; answer: string[] }[]
      >,
      default: () => []
    }
  },
  emits: ['confirm'],
  setup(props) {
    const modal = ref(false)

    const scores = ref<Score[]>(
      props.essays.map(essay => {
        return {
          examItem: essay.id,
          points: 0
        }
      })
    )

    const page = ref(0)

    const viewingEssay = computed(() => {
      return props.essays[page.value]
    })

    return {
      modal,
      scores,
      page,
      viewingEssay
    }
  }
})
</script>
