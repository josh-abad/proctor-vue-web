<template>
  <div class="p-4">
    <PageHeader :links="links" hide-menu>
      <template #label><AppSkeleton class="h-5 opacity-50 w-60" /></template>
    </PageHeader>
    <div class="flex flex-col mt-4 sm:flex-row">
      <div class="flex-grow mr-0 sm:mr-4">
        <TabRow :course-id="courseId" />
        <slot />
      </div>
      <div class="w-full mt-4 sm:w-72 sm:mt-0">
        <About />
        <UpcomingExams class="mt-4" />
        <Progress class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import About from './components/About.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import Progress from './components/Progress.vue'
import TabRow from '../TabRow.vue'
import UpcomingExams from './components/UpcomingExams.vue'
import { Link } from '@/types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

export default defineComponent({
  name: 'Fallback',
  components: {
    About,
    AppSkeleton,
    PageHeader,
    Progress,
    TabRow,
    UpcomingExams
  },
  mixins: [userMixin],
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
