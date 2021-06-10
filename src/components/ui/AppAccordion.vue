<template>
  <div>
    <Subheading class="justify-start">
      <button @click="expanded = !expanded" class="accordion__toggle">
        <ChevronRightIcon
          class="accordion__icon"
          :class="{ 'accordion__icon--expanded': expanded }"
        />
      </button>
      <AppLabel emphasis class="ml-2">
        {{ label }}
      </AppLabel>
    </Subheading>
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
import { ChevronRightIcon } from '@heroicons/vue/solid'
import Subheading from '../Subheading.vue'

export default defineComponent({
  name: 'AppAccordion',
  components: { AppLabel, ChevronRightIcon, Subheading },
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

<style lang="postcss" scoped>
.accordion__toggle {
  @apply text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none;
}

.accordion__icon {
  @apply w-5 h-5 transition-transform transform ease-in-out duration-100 rotate-0;
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
