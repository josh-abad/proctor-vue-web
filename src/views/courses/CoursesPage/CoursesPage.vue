<template>
  <div class="p-4">
    <PageHeading>
      <template #label>Courses</template>
      <template
        #actions
        v-if="$store.getters.permissions(['coordinator', 'admin'])"
      >
        <router-link to="/courses/new">
          <AppButton prominent>
            <span class="flex items-center">
              <PlusIcon class="w-5 h-5" />
              <span class="flex items-center">
                <span class="ml-1.5">Create Course</span>
              </span>
            </span>
          </AppButton>
        </router-link>
      </template>
    </PageHeading>
    <AppPanel class="mt-8 mb-0">
      <CourseList />
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppPanel from '@/components/ui/AppPanel.vue'
import PageHeading from '@/components/PageHeading.vue'
import { defineComponent } from 'vue'
import CourseList from '@/components/CourseList/CourseList.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { PlusIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'CoursesPage',
  components: {
    AppPanel,
    PageHeading,
    CourseList,
    AppButton,
    PlusIcon
  }
})
</script>
