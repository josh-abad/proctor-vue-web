<template>
  <div class="inline-block relative text-left">
    <button
      @click="menuDropdown = !menuDropdown"
      type="button"
      class="mt-1 focus:outline-none"
      id="user-dropdown-toggle"
      aria-haspopup="true"
      aria-expanded="true"
    >
      <Avatar
        v-if="$store.state.user"
        class="w-8 h-8 text-sm pointer-events-none"
        :user="$store.state.user"
      />
    </button>
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
          <UserCircleIcon class="w-6 h-6 text-gray-400" />
        </template>
        <template #label>Profile</template>
      </MenuDropdownItem>
      <MenuDropdownItem path="/settings" @item-click="menuDropdown = false">
        <template #icon>
          <CogIcon class="w-6 h-6 text-gray-400" />
        </template>
        <template #label>Settings</template>
      </MenuDropdownItem>
      <MenuDropdownItem @item-click="handleLogOut" separator>
        <template #icon>
          <LogoutIcon class="w-6 h-6 text-gray-400" />
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
import Avatar from '@/components/Avatar.vue'
import { UserCircleIcon, CogIcon, LogoutIcon } from '@heroicons/vue/outline'
import { SET_USER } from '@/store/mutation-types'

export default defineComponent({
  name: 'UserDropdown',
  components: {
    MenuDropdownItem,
    MenuDropdown,
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
      this.$store.commit(SET_USER, null)
      this.$router.push('/login')
    }
  }
})
</script>
