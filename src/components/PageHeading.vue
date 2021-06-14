<template>
  <header>
    <Breadcrumbs class="hidden sm:flex" :links="links" v-if="links" />
    <div class="flex justify-between mt-2">
      <div class="text-2xl font-semibold sm:text-3xl">
        <slot name="label"></slot>
      </div>
      <slot name="actions"></slot>
    </div>
    <slot name="meta"></slot>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Breadcrumbs from './Breadcrumbs.vue'
import { Link } from '@/types'

export default defineComponent({
  name: 'PageHeading',
  components: { Breadcrumbs },
  props: {
    links: {
      type: Array as PropType<Link[]>,
      required: false
    },
    hideMenu: {
      type: Boolean,
      default: false
    }
  }
})
</script>
