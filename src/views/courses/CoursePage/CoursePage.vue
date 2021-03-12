<template>
  <div>
    <Suspense>
      <template #default>
        <Default :course-id="courseId">
          <AppPanel class="overflow-hidden border-t-0 rounded-t-none">
            <router-view v-slot="{ Component, route }">
              <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </AppPanel>
        </Default>
      </template>
      <template #fallback>
        <Fallback :course-id="courseId">
          <AppPanel class="overflow-hidden border-t-0 rounded-t-none">
            <router-view v-slot="{ Component, route }">
              <transition :name="route.meta.transition || 'fade'" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </AppPanel>
        </Fallback>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import AppPanel from '@/components/ui/AppPanel.vue'
import { Link } from '@/types'
import { defineComponent } from 'vue'
import Default from './components/Default.vue'
import Fallback from './components/fallback/Fallback.vue'

export default defineComponent({
  name: 'CoursePage',
  components: {
    Default,
    Fallback,
    AppPanel
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    links (): Link[] {
      return [
        {
          name: 'Home',
          url: '/'
        },
        {
          name: 'Courses',
          url: '/courses'
        }
      ]
    }
  }
})
</script>

<style lang="postcss" scoped>
.slide-left-enter-active,
.slide-right-enter-active {
  @apply transition-transform duration-200 ease-out;
}

.slide-left-leave-active,
.slide-right-leave-active {
  @apply transition-transform duration-200 ease-in;
}

.slide-left-enter-from,
.slide-right-leave-to {
  @apply transform-gpu translate-x-full;
}

.slide-left-enter-to,
.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from {
  @apply transform-gpu translate-x-0;
}

.slide-right-enter-from,
.slide-left-leave-to {
  @apply transform-gpu -translate-x-full;
}
</style>
