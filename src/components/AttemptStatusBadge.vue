<template>
  <span v-if="attempt.status === 'completed'">
    <Badge v-if="attempt.pendingGrade" class="text-yellow-500 bg-yellow-500/10">
      Grade Pending
    </Badge>
    <Badge v-else-if="attempt.warnings >= 5" class="text-red-500 bg-red-500/10">
      Stopped
    </Badge>
    <Badge v-else class="text-green-500 bg-green-500/10">Complete</Badge>
  </span>
  <Badge
    v-else-if="attempt.status === 'in-progress'"
    class="text-white bg-white/10"
  >
    In-Progress
  </Badge>
  <Badge v-else class="text-red-500 bg-red-500/10"> Expired </Badge>
</template>

<script lang="ts">
import { Attempt } from '@/types'
import { defineComponent, PropType } from 'vue'
import Badge from './Badge.vue'

export default defineComponent({
  name: 'AttemptStatusBadge',
  components: { Badge },
  props: {
    attempt: {
      type: Object as PropType<Omit<Attempt, 'examResult'>>,
      required: true
    }
  }
})
</script>
