<template>
  <div
    class="rounded-lg p-6 bg-gradient-to-r from-green-600 via-green-500 to-green-400 shadow-lg"
  >
    <div class="flex justify-between">
      <div class="text-3xl text-white font-bold">
        <slot></slot>
      </div>
      <svg
        class="fill-current text-white w-6 h-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        v-if="!hideMenu"
        @click="$emit('menu-clicked')"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    </div>
    <Breadcrumbs class="mt-2" :links="links" v-if="links" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default defineComponent({
  name: 'ColorHeader',
  components: { Breadcrumbs },
  props: {
    links: {
      type: Array,
      required: false
    },
    hideMenu: {
      type: Boolean,
      default: false
    }
  },
  emits: ['menu-clicked']
})
</script>
