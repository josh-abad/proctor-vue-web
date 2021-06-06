<template>
  <div>
    <div>
      <TheAppBar @toggle="handleToggle" />
      <div>
        <NavigationDrawer :is-open="isOpen">
          <NavigationItem href="/" @mobile-nav="isOpen = false">
            <template #label> Home </template>
            <template #icon>
              <HomeIcon class="w-5 h-5" />
            </template>
          </NavigationItem>
          <NavigationItem href="/courses" @mobile-nav="isOpen = false">
            <template #label> Courses </template>
            <template #icon>
              <BookOpenIcon class="w-5 h-5" />
            </template>
          </NavigationItem>
          <NavigationItem
            href="/students"
            v-if="$store.getters.permissions(['coordinator', 'admin'])"
            @mobile-nav="isOpen = false"
          >
            <template #label> Students </template>
            <template #icon>
              <UsersIcon class="w-5 h-5" />
            </template>
          </NavigationItem>
          <NavigationItem href="/calendar" @mobile-nav="isOpen = false">
            <template #label> Calendar </template>
            <template #icon>
              <CalendarIcon class="w-5 h-5" />
            </template>
          </NavigationItem>
        </NavigationDrawer>
        <div>
          <router-view
            class="duration-300 ease-in-out transform"
            :class="isOpen ? 'ml-auto sm:ml-56' : 'ml-0'"
          />
        </div>
      </div>
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
  HomeIcon
} from '@heroicons/vue/solid'

export default defineComponent({
  name: 'App',
  components: {
    TheAppBar,
    NavigationDrawer,
    NavigationItem,
    CalendarIcon,
    UsersIcon,
    BookOpenIcon,
    HomeIcon
  },
  setup() {
    const isOpen = useLocalStorage('sidebarState', true)

    const handleToggle = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      handleToggle
    }
  }
})
</script>
