<template>
  <div>
    <div class="flex items-center justify-between label-border">
      <AppLabel emphasis>Recent Courses</AppLabel>
      <div class="mb-1 space-x-3">
        <button
          class="btn"
          @click="previous"
          :class="{ 'btn--disabled': disablePrevious }"
        >
          <!-- Heroicon name: chevron-left -->
          <svg class="btn__icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <!-- Heroicon name: chevron-right -->
        <button
          class="btn"
          @click="next"
          :class="{ 'btn--disabled': disableNext }"
        >
          <svg class="btn__icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    <Suspense>
      <template #default>
        <Default
          :current="current"
          :user-id="user?.id ?? ''"
          @load-value="getMaxPage"
          ref="scrollArea"
        />
      </template>
      <template #fallback>
        <Fallback />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import Fallback from './components/fallback/Fallback.vue'
import Default from './components/Default.vue'
import userMixin from '@/mixins/user'

const scroll = (by: number): void => {
  const el = document.getElementById('recent-courses')
  if (el) {
    el.scrollBy({
      left: by,
      behavior: 'smooth'
    })
  }
}

export default defineComponent({
  name: 'RecentCourses',
  components: {
    AppLabel,
    Fallback,
    Default
  },
  mixins: [userMixin],
  data () {
    return {
      current: 0,
      disableNext: true,
      disablePrevious: true
    }
  },
  methods: {
    next (): void {
      scroll(10)
    },
    previous (): void {
      scroll(-10)
    },
    getMaxPage (): void {
      const el = document.getElementById('recent-courses')
      if (el) {
        el.addEventListener('scroll', () => {
          this.updateScroll(el)
        })
        this.updateScroll(el)
      }
    },
    updateScroll (el: HTMLElement): void {
      this.disablePrevious = el.scrollLeft === 0
      this.disableNext = el.scrollWidth - el.clientWidth === el.scrollLeft
    }
  }
})
</script>

<style lang="postcss" scoped>
.btn {
  @apply focus:outline-none text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white;
}

.btn--disabled {
  @apply pointer-events-none cursor-default hover:text-gray-600 dark:hover:text-gray-400 opacity-50;
}

.btn__icon {
  @apply inline w-5 h-5 fill-current;
}
</style>
