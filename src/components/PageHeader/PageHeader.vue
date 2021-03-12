<template>
  <div
    class="p-6 rounded-lg shadow-lg glow bg-gradient-to-t from-green-600 via-green-500 to-green-400"
  >
    <div class="flex justify-between">
      <div class="text-2xl font-bold text-white sm:text-3xl">
        <slot name="label" />
      </div>
      <button
        class="relative focus:outline-none"
        v-if="!hideMenu"
        @click="$emit('menu-clicked')"
        id="dropdown-toggle"
      >
        <svg
          class="w-6 h-6 text-white pointer-events-none fill-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
        <slot name="menu" />
      </button>
    </div>
    <Breadcrumbs class="mt-2" :links="links" v-if="links" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default defineComponent({
  name: 'PageHeader',
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

<style scoped>
.glow {
  box-shadow: 0px 0px 20px 0px rgb(16, 185, 129, 0.75);
}
</style>
