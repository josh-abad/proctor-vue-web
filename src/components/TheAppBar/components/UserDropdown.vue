<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        @click="menuDropdown.toggle"
        type="button"
        class="inline-flex items-center justify-center w-full px-4 py-2 text-gray-500 focus:outline-none"
        id="user-dropdown-toggle"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img
          :src="$store.state.user?.avatarUrl || ''"
          alt="Avatar"
          class="object-cover w-8 h-8 ml-2 rounded-full pointer-events-none"
        />
        <ChevronDownIcon class="w-5 h-5 ml-2 -mr-1 pointer-events-none" />
      </button>
    </div>
    <MenuDropdown
      class="mt-2"
      v-show="menuDropdown.isOpen"
      @click-outside="menuDropdown.close"
      toggle-id="user-dropdown-toggle"
    >
      <MenuDropdownItem
        :path="`/user/${$store.state.user?.id || ''}`"
        @item-click="menuDropdown.close"
      >
        <template #icon>
          <UserCircleIcon class="dropdown-item__icon" />
        </template>
        <template #label>Profile</template>
      </MenuDropdownItem>
      <MenuDropdownItem path="/settings" @item-click="menuDropdown.close">
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
import { LOG_OUT } from '@/store/action-types'
import { defineComponent } from 'vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import MenuDropdown from '@/components/MenuDropdown.vue'
import { ChevronDownIcon, UserCircleIcon, CogIcon, LogoutIcon } from '@heroicons/vue/outline'
import useModal from '@/composables/use-modal'

export default defineComponent({
  name: 'UserDropdown',
  components: {
    MenuDropdownItem,
    MenuDropdown,
    ChevronDownIcon,
    UserCircleIcon,
    CogIcon,
    LogoutIcon
  },
  setup () {
    const menuDropdown = useModal()

    return {
      menuDropdown
    }
  },
  methods: {
    async handleLogOut () {
      await this.$store.dispatch(LOG_OUT)
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
