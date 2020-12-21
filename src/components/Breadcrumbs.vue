<template>
  <ol class="flex items-center">
    <li :key="i" v-for="(link, i) in linksMinusLast" class="mr-1 flex items-center text-gray-500">
      <router-link :to="link.url">
        {{ link.name }}
      </router-link>
      <svg class="ml-1 stroke-current w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </li>
    <li>
      <router-link :to="lastLink.url">
        {{ lastLink.name }}
      </router-link>
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Link {
  name: string;
  url: string;
}

export default defineComponent({
  name: 'Breadcrumbs',
  props: {
    links: {
      type: Array as PropType<Array<Link>>,
      required: true
    }
  },
  computed: {
    lastLink (): Link {
      return this.links[this.links.length - 1]
    },
    linksMinusLast (): Link[] {
      return this.links.slice(0, this.links.length - 1)
    }
  }
})
</script>
