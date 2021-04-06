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
      <ChevronRightIcon class="w-4 h-4 ml-1 stroke-current" />
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
import { ChevronRightIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Breadcrumbs',
  components: { ChevronRightIcon },
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
