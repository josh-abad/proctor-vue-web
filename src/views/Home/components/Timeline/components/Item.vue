<template>
  <div class="item">
    <DocumentTextIcon
      class="item__icon item__icon--opening"
      v-if="event.action === 'opens'"
    />
    <LockClosedIcon class="item__icon item__icon--closing" v-else />
    <div>
      <div>
        <router-link :to="event.subjectUrl" class="item__course">
          {{ event.subject }}
        </router-link>
        <span
          class="item__action"
          :class="
            event.action === 'opens'
              ? 'item__action--opening'
              : 'item__action--closing'
          "
        >
          {{ event.action }}
        </span>
      </div>
      <router-link :to="event.locationUrl" class="item__location">
        {{ event.location }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { AppEvent } from '@/types'
import { defineComponent } from 'vue'
import { DocumentTextIcon, LockClosedIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'Item',
  components: { DocumentTextIcon, LockClosedIcon },
  props: {
    event: {
      type: Object as () => AppEvent,
      required: true
    }
  }
})
</script>

<style lang="postcss" scoped>
.item {
  @apply py-1 text-gray-700 dark:text-gray-300 text-sm flex items-start space-x-1 w-full;
}

.item__icon {
  @apply mr-2 w-5 h-5;
}

.item__icon--opening {
  @apply text-green-500 dark:text-green-300;
}

.item__icon--closing {
  @apply text-red-500;
}

.item__course {
  @apply inline font-semibold text-gray-900 dark:text-white;
}

.item__action {
  @apply ml-1 text-green-200;
}

.item__action--opening {
  @apply text-green-800 dark:text-green-200;
}

.item__action--closing {
  @apply text-red-800 dark:text-red-200;
}

.item__location {
  @apply text-gray-500 text-xs;
}
</style>
