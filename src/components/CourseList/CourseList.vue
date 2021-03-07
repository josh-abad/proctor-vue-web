<template>
  <div class="course-list">
    <div class="course-list__header label-border">
      <AppLabel emphasis>Your Courses</AppLabel>
      <ViewOptions class="mb-2" v-model="viewMode" />
    </div>
    <transition name="fade" mode="out-in">
      <Suspense>
        <template #default>
          <Default :view-mode="viewMode" :user-id="user?.id ?? ''" />
        </template>
        <template #fallback>
          <Fallback :viewMode="viewMode" />
        </template>
      </Suspense>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import ViewOptions from './components/ViewOptions.vue'
import Default from './components/Default.vue'
import Fallback from './components/fallback/Fallback.vue'
import userMixin from '@/mixins/user'

export default defineComponent({
  name: 'CourseList',
  components: {
    AppLabel,
    ViewOptions,
    Default,
    Fallback
  },
  mixins: [userMixin],
  data () {
    return {
      viewMode: 'list' as 'card' | 'list'
    }
  },
  watch: {
    viewMode (mode: 'card' | 'list') {
      localStorage.setItem('coursesPageViewState', JSON.stringify(mode))
    }
  },
  created () {
    const coursesPageViewState = localStorage.getItem('coursesPageViewState')
    if (coursesPageViewState) {
      this.viewMode = JSON.parse(coursesPageViewState)
    }
  }
})
</script>

<style lang="postcss" scoped>
.course-list__header {
  @apply flex items-center justify-between -mb-3;
}

.fade-enter-active,
.fade-leave-active {
  @apply opacity-100 duration-200 ease-in-out transition-opacity;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
