<template>
  <nav
    class="
      flex
      relative
      text-gray-500
      bg-white
      rounded-t-lg
      border-b border-gray-300
      shadow
      dark:bg-gray-800
      dark:border-gray-700
    "
    ref="nav"
  >
    <slot></slot>
    <span
      class="
        absolute
        top-[6px]
        w-full
        h-[35px]
        duration-200
        border-b-2 border-indigo-400
      "
    ></span>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'TabRow',
  setup() {
    const nav = ref<HTMLElement | null>(null)

    onMounted(() => {
      if (nav.value) {
        const tabCount = nav.value.getElementsByTagName('a').length
        document.documentElement.style.setProperty(
          '--tab-width',
          `${(1 / tabCount) * 100}%`
        )
      }
    })

    return {
      nav
    }
  }
})
</script>

<style scoped>
span {
  transform-origin: 0 0;
}

a:first-child.active ~ span {
  transform: translateX(0) scaleX(var(--tab-width));
}

a:nth-child(2).active ~ span {
  transform: translateX(var(--tab-width)) scaleX(var(--tab-width));
}

a:nth-child(3).active ~ span {
  transform: translateX(calc(var(--tab-width) * 2)) scaleX(var(--tab-width));
}

a:nth-child(4).active ~ span {
  transform: translateX(calc(var(--tab-width) * 3)) scaleX(var(--tab-width));
}
</style>
