<template>
  <header
    class="sticky top-0 z-20 w-full bg-gray-200 animate h-14 dark:bg-gray-900"
    :class="{
      'shadow-xl': !isPageStart
    }"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center pl-6">
        <button
          class="block text-gray-500 focus:outline-none focus:ring-0"
          @click="$emit('toggle')"
        >
          <MenuIcon class="w-6 h-6 fill-current" />
        </button>
        <router-link to="/">
          <AppLogo class="ml-6 h-7" @click="$router.push('/')" />
        </router-link>
        <div
          class="ml-6 transition-opacity duration-300 ease-in-out"
          :class="isPageStart ? 'opacity-0' : 'opacity-100'"
        >
          {{ title }}
        </div>
      </div>
      <div class="flex items-center pr-6">
        <div class="hidden mr-5 sm:block">
          <Search />
        </div>
        <UserDropdown />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import UserDropdown from './components/UserDropdown.vue'
import Search from './components/Search/Search.vue'
import AppLogo from '../AppLogo.vue'
import { MenuIcon } from '@heroicons/vue/outline'
import useTitle from '@/composables/use-title'

export default defineComponent({
  name: 'TheAppBar',
  components: { UserDropdown, Search, AppLogo, MenuIcon },
  emits: ['toggle'],
  setup() {
    const isPageStart = ref(true)

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        if (isPageStart.value) {
          isPageStart.value = false
        }
      } else {
        if (!isPageStart.value) {
          isPageStart.value = true
        }
      }
    })

    const { title } = useTitle()
    const mainTitle = computed(() => {
      return title.value.replace(/( - )?Proctor Vue/, '')
    })

    return {
      isPageStart,
      title: mainTitle
    }
  }
})
</script>

<style lang="postcss" scoped>
.animate {
  @apply transition-shadow duration-300 ease-in-out;
}
</style>
