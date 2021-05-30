<template>
  <div>
    <aside
      class="fixed z-10 w-full min-h-full pt-4 overflow-y-auto transition-transform duration-300 ease-in-out transform bg-gray-200  bg-opacity-60 dark:bg-opacity-90 backdrop-filter backdrop-blur-lg sm:w-56 dark:bg-gray-900"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <nav class="flex flex-col">
        <NavLink url="/" @mobile-nav="$emit('update:isOpen', false)">
          <template #label> Home </template>
          <template #icon>
            <HomeIcon class="w-5 h-5" />
          </template>
        </NavLink>
        <NavLink url="/courses" @mobile-nav="$emit('update:isOpen', false)">
          <template #label> Courses </template>
          <template #icon>
            <BookOpenIcon class="w-5 h-5" />
          </template>
        </NavLink>
        <NavLink
          url="/students"
          v-if="$store.getters.permissions(['coordinator', 'admin'])"
          @mobile-nav="$emit('update:isOpen', false)"
        >
          <template #label> Students </template>
          <template #icon>
            <UsersIcon class="w-5 h-5" />
          </template>
        </NavLink>
        <NavLink url="/calendar" @mobile-nav="$emit('update:isOpen', false)">
          <template #label> Calendar </template>
          <template #icon>
            <CalendarIcon class="w-5 h-5" />
          </template>
        </NavLink>
      </nav>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavLink from './components/NavLink.vue'
import {
  CalendarIcon,
  UsersIcon,
  BookOpenIcon,
  HomeIcon
} from '@heroicons/vue/solid'

export default defineComponent({
  name: 'TheSidebar',
  components: {
    NavLink,
    CalendarIcon,
    UsersIcon,
    BookOpenIcon,
    HomeIcon
  },
  props: {
    isOpen: Boolean
  },
  emit: ['update:isOpen']
})
</script>
