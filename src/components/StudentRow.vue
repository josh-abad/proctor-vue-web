<template>
  <div class="flex items-center py-4">
    <img
      :src="student.avatarUrl"
      alt="Avatar"
      class="ml-2 w-8 h-8 object-cover rounded-full"
    />
    <div class="ml-4">
      <div>{{ student.fullName }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StudentRow',
  props: {
    student: {
      type: Object as () => User,
      required: true
    }
  }
})
</script>
