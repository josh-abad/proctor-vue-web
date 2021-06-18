<template>
  <div>
    <Banner v-model="banner" />
    <TheAppBar @toggle="handleToggle" :banner="banner" />
    <div>
      <NavigationDrawer :is-open="isOpen" :banner="banner">
        <NavigationItem href="/" @mobile-nav="isOpen = false">
          <template #label> Home </template>
          <template #icon>
            <HomeIcon />
          </template>
        </NavigationItem>
        <NavigationItem href="/courses" @mobile-nav="isOpen = false">
          <template #label> Courses </template>
          <template #icon>
            <BookOpenIcon />
          </template>
        </NavigationItem>
        <NavigationItem
          href="/students"
          v-if="$store.getters.permissions(['coordinator', 'admin'])"
          @mobile-nav="isOpen = false"
        >
          <template #label> Students </template>
          <template #icon>
            <UsersIcon />
          </template>
        </NavigationItem>
        <NavigationItem href="/calendar" @mobile-nav="isOpen = false">
          <template #label> Calendar </template>
          <template #icon>
            <CalendarIcon />
          </template>
        </NavigationItem>
        <NavigationItem href="/settings" @mobile-nav="isOpen = false">
          <template #label> Settings </template>
          <template #icon>
            <CogIcon />
          </template>
        </NavigationItem>
      </NavigationDrawer>

      <router-view
        class="duration-300 ease-in-out transform"
        :class="isOpen ? 'ml-auto sm:ml-56' : 'ml-0'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheAppBar from '@/components/TheAppBar/TheAppBar.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import useLocalStorage from '@/composables/use-local-storage'
import NavigationItem from '@/components/NavigationItem.vue'
import {
  CalendarIcon,
  UsersIcon,
  BookOpenIcon,
  HomeIcon,
  CogIcon
} from '@heroicons/vue/outline'
import Banner from '@/components/Banner.vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    TheAppBar,
    NavigationDrawer,
    NavigationItem,
    CalendarIcon,
    UsersIcon,
    BookOpenIcon,
    HomeIcon,
    CogIcon,
    Banner
  },
  setup() {
    const store = useStore()
    const isOpen = useLocalStorage('sidebarState', true)
    const banner = useLocalStorage(
      'faceIdBanner',
      store.state.user?.referenceImageUrl === undefined
    )

    const handleToggle = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      handleToggle,
      banner
    }
  }
})
</script>
