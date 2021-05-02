<template>
  <div class="p-4">
    <PageHeader
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
      ]"
      @menu-clicked="isOpen = !isOpen"
      :hide-menu="!$store.getters.permissions(['admin'])"
    >
      <template #label>Courses</template>
      <template #menu>
        <MenuDropdown
          class="mt-2 mr-2"
          v-show="isOpen"
          @click-outside="isOpen = false"
        >
          <MenuDropdownItem path="/courses/new">
            <template #label>Create Course</template>
          </MenuDropdownItem>
        </MenuDropdown>
      </template>
    </PageHeader>
    <AppPanel class="mt-4 mb-0">
      <CourseList :courses="courses" />
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppPanel from '@/components/ui/AppPanel.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import CourseList from '@/components/CourseList/CourseList.vue'

export default defineComponent({
  name: 'CoursesPage',
  components: { AppPanel, PageHeader, MenuDropdown, MenuDropdownItem, CourseList },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    courses (): Course[] {
      return this.$store.getters.courses
    }
  }
})
</script>
