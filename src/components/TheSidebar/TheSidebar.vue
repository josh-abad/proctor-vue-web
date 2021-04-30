<template>
  <div>
    <aside
      class="fixed z-10 w-full h-full min-h-full pt-4 overflow-y-auto transition-transform duration-300 ease-in-out transform bg-gray-100 shadow-lg bg-opacity-60 dark:bg-opacity-90 backdrop-filter backdrop-blur sm:w-56 dark:bg-gray-900 sidebar__border"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <nav class="flex flex-col">
        <NavLink url="/" @mobile-nav="$emit('close-sidebar')">
          <template #label> Home </template>
          <template #icon>
            <HomeIconOutline class="w-5 h-5" />
          </template>
          <template #icon-selected>
            <HomeIconSolid class="w-5 h-5" />
          </template>
        </NavLink>
        <NavLink url="/courses" @mobile-nav="$emit('close-sidebar')">
          <template #label> Courses </template>
          <template #icon>
            <BookOpenIconOutline class="w-5 h-5" />
          </template>
          <template #icon-selected>
            <BookOpenIconSolid class="w-5 h-5" />
          </template>
        </NavLink>
        <NavLink
          url="/students"
          v-if="hasPermission(['coordinator', 'admin'])"
          @mobile-nav="$emit('close-sidebar')"
        >
          <template #label> Students </template>
          <template #icon>
            <UsersIconOutline class="w-5 h-5" />
          </template>
          <template #icon-selected>
            <UsersIconSolid class="w-5 h-5" />
          </template>
        </NavLink>
        <NavLink url="/calendar" @mobile-nav="$emit('close-sidebar')">
          <template #label> Calendar </template>
          <template #icon>
            <CalendarIconOutline class="w-5 h-5" />
          </template>
          <template #icon-selected>
            <CalendarIconSolid class="w-5 h-5" />
          </template>
        </NavLink>
      </nav>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import NavLink from './components/NavLink.vue'
import {
  CalendarIcon as CalendarIconOutline,
  UsersIcon as UsersIconOutline,
  BookOpenIcon as BookOpenIconOutline,
  HomeIcon as HomeIconOutline
} from '@heroicons/vue/outline'
import {
  CalendarIcon as CalendarIconSolid,
  UsersIcon as UsersIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  HomeIcon as HomeIconSolid
} from '@heroicons/vue/solid'

export default defineComponent({
  name: 'TheSidebar',
  components: {
    NavLink,
    CalendarIconOutline,
    UsersIconOutline,
    BookOpenIconOutline,
    HomeIconOutline,
    CalendarIconSolid,
    UsersIconSolid,
    BookOpenIconSolid,
    HomeIconSolid
  },
  mixins: [userMixin],
  props: {
    isOpen: Boolean
  },
  emit: ['close-sidebar']
})
</script>

<style lang="postcss" scoped>
.sidebar__border {
  @apply border-r border-gray-100 dark:border-gray-800;
}
</style>
