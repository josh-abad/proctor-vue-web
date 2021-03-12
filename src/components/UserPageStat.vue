<template>
  <div class="flex flex-col items-center px-3">
    <div class="text-xl">{{ count }}</div>
    <div class="text-xs font-semibold tracking-wider text-green-600 uppercase">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserPageState',
  props: {
    count: {
      type: Number,
      required: true
    }
  }
})
</script>
