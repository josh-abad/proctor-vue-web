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
      'top-14 right-4',
      'backdrop-blur',
      'border',
      'border-t-0',
      'border-white/10',
      'z-20',
      'flex',
      'px-4',
      'py-2',
      'space-x-10',
      'bg-gray-800/50',
      'rounded-b-lg',
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
