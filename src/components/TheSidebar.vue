<template>
  <div>
    <aside
      class="transform w-52 pt-3 fixed min-h-full ease-in-out transition-all duration-300 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 shadow-lg"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex flex-col">
        <router-link
          :key="i"
          :to="content.url"
          v-for="(content, i) in contents"
          class="flex items-center px-3 py-2 rounded-lg mx-3 my-1 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-50"
        >
          <div class="fill-current w-5 h-5" v-html="content.icon" />
          <div
            class="ml-6"
          >
            {{ content.label }}
          </div>
        </router-link>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Sidebar',
  props: {
    isOpen: Boolean
  },
  computed: {
    isSidebarOpen (): boolean {
      return this.isOpen
    }
  },
  data () {
    return {
      contents: [
        {
          label: 'Home',
          url: '/',
          icon:
            '<svg fill="currentColor" viewBox="0 0 20 20"><defs/><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>'
        },
        {
          label: 'Courses',
          url: '/courses',
          icon:
            '<svg fill="currentColor" viewBox="0 0 20 20"><defs/><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>'
        },
        {
          label: 'Calendar',
          url: '/calendar',
          icon:
            '<svg fill="currentColor" viewBox="0 0 20 20"><defs/><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>'
        },
        {
          label: 'Files',
          url: '/files',
          icon:
            '<svg fill="currentColor" viewBox="0 0 20 20"><defs/><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/></svg>'
        }
      ]
    }
  }
})
</script>

<style lang="postcss" scoped>
  .router-link-active {
    @apply text-green-500 dark:text-green-500 font-semibold
  }
</style>
