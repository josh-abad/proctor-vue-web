<template>
  <img
    class="object-cover rounded-full"
    width="100"
    height="100"
    :src="user.referenceImageUrl"
    :alt="`${user.fullName} avatar`"
    v-if="user.referenceImageUrl"
  />
  <div
    class="
      flex
      justify-center
      items-center
      bg-gray-300
      rounded-full
      dark:bg-gray-700
    "
    v-else
  >
    {{ `${user.name.first[0]}${user.name.last[0]}` }}
  </div>
</template>

<script lang="ts">
import { User } from '@/types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Avatar',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  }
})
</script>
