<template>
  <div>
    <header class="accordion__header label-border">
      <button @click="expanded = !expanded" class="accordion__toggle">
        <!-- Heroicon name: chevron-right -->
        <svg
          class="accordion__icon"
          viewBox="0 0 20 20"
          fill="currentColor"
          :class="{ 'accordion__icon--expanded': expanded }"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <AppLabel emphasis>
        {{ label }}
      </AppLabel>
    </header>
    <section
      class="accordion__content"
      :class="{ 'accordion__content--expanded': expanded }"
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

export default defineComponent({
  name: 'AppAccordion',
  components: { AppLabel },
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      expanded: true
    }
  }
})
</script>

<style lang="postcss" scoped>
.accordion__header {
  @apply flex items-center space-x-2;
}

.accordion__toggle {
  @apply text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none;
}

.accordion__icon {
  @apply w-5 h-5 mb-1 transition-transform transform ease-in-out duration-100 rotate-0;
}

.accordion__icon--expanded {
  @apply rotate-90;
}

.accordion__content {
  @apply duration-100 ease-in-out transform py-0 opacity-0 -translate-y-2;
}

.accordion__content--expanded {
  @apply py-3 opacity-100 translate-y-0;
}
</style>
