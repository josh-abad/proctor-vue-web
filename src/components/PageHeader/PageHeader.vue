<template>
  <div
    class="p-6 rounded-lg shadow-lg  bg-gradient-to-t from-green-600 via-green-500 to-green-400"
  >
    <div class="flex justify-between">
      <div class="text-2xl font-bold text-white sm:text-3xl">
        <slot name="label" />
      </div>
      <button
        class="relative focus:outline-none"
        v-if="!hideMenu"
        @click="$emit('menu-clicked')"
        id="dropdown-toggle"
      >
        <DotsVerticalIcon
          class="w-6 h-6 text-white pointer-events-none fill-current"
        />
        <slot name="menu" />
      </button>
    </div>
    <Breadcrumbs class="hidden mt-2 sm:flex" :links="links" v-if="links" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
import { DotsVerticalIcon } from '@heroicons/vue/outline'
import { Link } from '@/types'

export default defineComponent({
  name: 'PageHeader',
  components: { Breadcrumbs, DotsVerticalIcon },
  props: {
    links: {
      type: Array as PropType<Link[]>,
      required: false
    },
    hideMenu: {
      type: Boolean,
      default: false
    }
  },
  emits: ['menu-clicked']
})
</script>
