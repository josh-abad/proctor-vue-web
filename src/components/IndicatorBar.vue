<template>
  <teleport to="#modals">
    <div :class="indicatorBar" v-bind="$attrs">
      <slot />
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
  name: 'IndicatorBar',
  inheritAttrs: false,
  setup() {
    const classes = ref([
      'items-center',
      'fixed',
      'bottom-0 right-0',
      'z-20',
      'flex',
      'px-4',
      'py-2',
      'mx-8',
      'space-x-3',
      'bg-gray-700',
      'rounded-t-lg',
      'shadow-lg'
    ])

    const joinedClasses = computed(() => {
      return classes.value.join(' ')
    })

    return {
      indicatorBar: joinedClasses
    }
  }
})
</script>
