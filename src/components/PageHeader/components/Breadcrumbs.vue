<template>
  <ol class="flex items-center">
    <li
      :key="i"
      v-for="(link, i) in linksMinusLast"
      class="flex items-center mr-1 text-green-200"
    >
      <router-link :to="link.url">
        {{ link.name }}
      </router-link>
      <svg
        class="w-4 h-4 ml-1 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </li>
    <li>
      <router-link :to="lastLink.url" class="text-white">
        {{ lastLink.name }}
      </router-link>
    </li>
  </ol>
</template>

<script lang="ts">
import { Link } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Breadcrumbs',
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  computed: {
    lastLink (): Link {
      return (this.links as Link[])[this.links.length - 1]
    },
    linksMinusLast (): Link[] {
      return (this.links as Link[]).slice(0, this.links.length - 1)
    }
  }
})
</script>
