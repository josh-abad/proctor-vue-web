<template>
  <aside
    class="transform overflow-x-hidden top-0 left-0 w-64 bg-white dark:bg-gray-800 fixed h-full overflow-auto ease-in-out transition-all duration-300 border-r border-gray-200 dark:border-gray-700 z-10"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-20">
    </div>
    <div class="flex flex-col">
      <router-link
        :key="i"
        v-for="(content, i) in contents"
        :to="content.url"
        @click="$emit('nav-click', $event, content.url)"
        class="block text-sm hover:bg-opacity-25 dark:text-gray-100 dark:hover:bg-gray-700 px-5 py-4 hover:bg-gray-200 active:bg-blue-400 border-b border-gray-300 dark:border-gray-700"
      >
        {{ content.label }}
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  props: {
    isOpen: Boolean
  },
  emits: ['nav-click'],
  data () {
    return {
      contents: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Courses',
          url: '/courses'
        },
        {
          label: 'Calendar',
          url: '/'
        },
        {
          label: 'Private Files',
          url: '/'
        },
        {
          label: 'My courses',
          url: '/'
        }
      ]
    }
  }
})
</script>
