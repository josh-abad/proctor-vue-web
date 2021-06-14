<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        @click="menuDropdown = !menuDropdown"
        type="button"
        class="w-full px-4 py-2 text-gray-500 focus:outline-none"
        id="user-dropdown-toggle"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <div class="flex items-center justify-center pointer-events-none">
          <Avatar class="w-10 h-10 text-gray-400 dark:text-gray-600" />
          <ChevronDownIcon class="w-5 h-5 ml-2 -mr-1" />
        </div>
      </button>
    </div>
    <MenuDropdown
      class="mt-2"
      v-model="menuDropdown"
      toggle-id="user-dropdown-toggle"
    >
      <MenuDropdownItem
        :path="`/user/${$store.state.user?.id || ''}`"
        @item-click="menuDropdown = false"
      >
        <template #icon>
          <UserCircleIcon class="dropdown-item__icon" />
        </template>
        <template #label>Profile</template>
      </MenuDropdownItem>
      <MenuDropdownItem path="/settings" @item-click="menuDropdown = false">
        <template #icon>
          <CogIcon class="dropdown-item__icon" />
        </template>
        <template #label>Settings</template>
      </MenuDropdownItem>
      <MenuDropdownItem @item-click="handleLogOut" separator>
        <template #icon>
          <LogoutIcon class="dropdown-item__icon" />
        </template>
        <template #label>Log out</template>
      </MenuDropdownItem>
    </MenuDropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import MenuDropdown from '@/components/MenuDropdown.vue'
import { UserCircleIcon as Avatar } from '@heroicons/vue/solid'
import {
  ChevronDownIcon,
  UserCircleIcon,
  CogIcon,
  LogoutIcon
} from '@heroicons/vue/outline'
import { SET_USER } from '@/store/mutation-types'
import cookie from '@/utils/cookie'

export default defineComponent({
  name: 'UserDropdown',
  components: {
    MenuDropdownItem,
    MenuDropdown,
    ChevronDownIcon,
    UserCircleIcon,
    CogIcon,
    Avatar,
    LogoutIcon
  },
  setup() {
    const menuDropdown = ref(false)

    return {
      menuDropdown
    }
  },
  methods: {
    async handleLogOut() {
      localStorage.clear()
      cookie.remove('loggedAppUser')
      this.$store.commit(SET_USER, null)
      this.$router.push('/login')
    }
  }
})
</script>

<style lang="postcss" scoped>
.dropdown-item__icon {
  @apply w-5 h-5 stroke-current text-opacity-50;
}
</style>
