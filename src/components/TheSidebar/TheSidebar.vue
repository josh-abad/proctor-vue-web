<template>
  <div>
    <aside
      class="fixed z-10 w-full h-full min-h-full pt-4 overflow-y-auto transition-transform duration-300 ease-in-out transform bg-gray-100 shadow-lg bg-opacity-60 dark:bg-opacity-90 backdrop-blur sm:w-56 dark:bg-gray-900 sidebar__border"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <nav class="flex flex-col">
        <NavLink url="/" @mobile-nav="$emit('close-sidebar')">
          <template #label> Home </template>
          <template #icon>
            <!-- Heroicon name: home -->
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </template>
          <template #icon-selected>
            <!-- Heroicon name: home -->
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
          </template>
        </NavLink>
        <NavLink url="/courses" @mobile-nav="$emit('close-sidebar')">
          <template #label> Courses </template>
          <template #icon>
            <!-- Heroicon name: book-open -->
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </template>
          <template #icon-selected>
            <!-- Heroicon name: book-open -->
            <path
              d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
            />
          </template>
        </NavLink>
        <NavLink
          url="/students"
          v-if="hasPermission(['coordinator', 'admin'])"
          @mobile-nav="$emit('close-sidebar')"
        >
          <template #label> Students </template>
          <template #icon>
            <!-- Heroicon name: users -->
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </template>
          <template #icon-selected>
            <!-- Heroicon name: users -->
            <path
              d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
            />
          </template>
        </NavLink>
        <NavLink url="/calendar" @mobile-nav="$emit('close-sidebar')">
          <template #label> Calendar </template>
          <template #icon>
            <!-- Heroicon name: calendar  -->
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </template>
          <template #icon-selected>
            <!-- Heroicon name: calendar  -->
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
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

export default defineComponent({
  name: 'TheSidebar',
  components: { NavLink },
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
