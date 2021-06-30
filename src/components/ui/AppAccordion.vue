<template>
  <div>
    <header
      class="
        flex
        items-center
        pb-1
        border-b border-gray-300
        dark:border-gray-700
      "
    >
      <button
        @click="expanded = !expanded"
        class="
          text-gray-500
          hover:text-gray-900
          focus:outline-none
          dark:hover:text-white
        "
      >
        <ChevronRightIcon
          class="w-5 h-5 transition-transform duration-100 ease-in-out"
          :class="expanded ? 'rotate-90' : 'rotate-0'"
        />
      </button>
      <AppLabel emphasis class="ml-4">
        {{ label }}
      </AppLabel>
    </header>
    <section
      class="duration-100 ease-in-out"
      :class="
        expanded ? 'py-3 opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      "
    >
      <div v-show="expanded">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from './AppLabel.vue'
import { ChevronRightIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'AppAccordion',
  components: { AppLabel, ChevronRightIcon },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      expanded: true
    }
  }
})
</script>
