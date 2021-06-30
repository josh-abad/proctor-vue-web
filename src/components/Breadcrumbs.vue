<template>
  <ol class="flex items-center font-semibold text-gray-500">
    <li
      :key="i"
      v-for="(link, i) in linksMinusLast"
      class="flex items-center mr-2"
    >
      <router-link :to="link.url">
        <HomeIcon v-if="link.name === 'Home'" class="w-5 h-5" />
        <span v-else>
          {{ link.name }}
        </span>
      </router-link>
      <ChevronRightIcon class="ml-2 w-5 h-5" />
    </li>
    <li>
      <router-link :to="lastLink.url">
        {{ lastLink.name }}
      </router-link>
    </li>
  </ol>
</template>

<script lang="ts">
import { Link } from '@/types'
import { defineComponent, PropType } from 'vue'
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'Breadcrumbs',
  components: { ChevronRightIcon, HomeIcon },
  props: {
    links: {
      type: Array as PropType<Link[]>,
      required: true
    }
  },
  computed: {
    lastLink(): Link {
      return this.links[this.links.length - 1]
    },
    linksMinusLast(): Link[] {
      return this.links.slice(0, this.links.length - 1)
    }
  }
})
</script>
