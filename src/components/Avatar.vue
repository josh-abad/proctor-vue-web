<template>
  <img
    class="object-cover rounded-full"
    :src="user.referenceImageUrl"
    :alt="`${user.fullName} avatar`"
    v-if="user.referenceImageUrl"
  />
  <div class="fallback" v-else>
    {{ `${user.name.first[0]}${user.name.last[0]}` }}
  </div>
</template>

<script lang="ts">
import { User } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'StudentRow',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  }
})
</script>

<style lang="postcss" scoped>
.fallback {
  @apply flex items-center justify-center bg-gray-300 rounded-full dark:bg-gray-700;
}
</style>
