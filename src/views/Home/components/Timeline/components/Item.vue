<template>
  <div class="item">
    <svg class="item__icon" viewBox="0 0 20 20" fill="currentColor">
      <!-- Heroicon name: document-text -->
      <path
        v-if="event.action === 'opens'"
        class="item__icon--opening"
        fill-rule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
        clip-rule="evenodd"
      />
      <!-- Heroicon name: lock-closed -->
      <path
        v-else
        class="item__icon--closing"
        fill-rule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clip-rule="evenodd"
      />
    </svg>
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

export default defineComponent({
  name: 'Item',
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
