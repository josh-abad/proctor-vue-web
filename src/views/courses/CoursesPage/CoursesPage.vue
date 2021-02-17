<template>
  <div class="p-4">
    <PageHeader
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
      ]"
      @menu-clicked="isOpen = !isOpen"
      :hide-menu="!hasPermission(['admin'])"
    >
      <template #label>Courses</template>
      <template #menu>
        <MenuDropdown
          class="mt-2 mr-2"
          v-show="isOpen"
          @click-outside="isOpen = false"
        >
          <MenuDropdownItem path="/courses/new">
            Create Course
          </MenuDropdownItem>
        </MenuDropdown>
      </template>
    </PageHeader>
    <BasePanel class="mt-4 mb-0">
      <CourseList :courses="courses" />
    </BasePanel>
  </div>
</template>

<script lang="ts">
import BasePanel from '@/components/BasePanel.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import { Course } from '@/types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import CourseList from '@/components/CourseList/CourseList.vue'

export default defineComponent({
  name: 'CoursesPage',
  components: { BasePanel, PageHeader, MenuDropdown, MenuDropdownItem, CourseList },
  mixins: [userMixin],
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
