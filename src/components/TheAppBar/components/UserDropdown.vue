<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        @click="isOpen = !isOpen"
        type="button"
        class="inline-flex items-center justify-center w-full px-4 py-2 text-gray-500 focus:outline-none"
        id="user-dropdown-toggle"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img
          :src="user?.avatarUrl || ''"
          alt="Avatar"
          class="object-cover w-8 h-8 ml-2 rounded-full pointer-events-none"
        />
        <svg
          class="w-5 h-5 ml-2 -mr-1 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <MenuDropdown
      class="mt-2"
      v-show="isOpen"
      @click-outside="isOpen = false"
      toggle-id="user-dropdown-toggle"
    >
      <MenuDropdownItem
        :path="`/user/${user?.id || ''}`"
        @item-click="isOpen = false"
      >
        <template #icon>
          <!-- Heroicon name: user-circle -->
          <svg
            class="dropdown-item__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </template>
        <template #label>Profile</template>
      </MenuDropdownItem>
      <MenuDropdownItem path="/settings" @item-click="isOpen = false">
        <template #icon>
          <!-- Heroicon name: cog -->
          <svg
            class="dropdown-item__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </template>
        <template #label>Settings</template>
      </MenuDropdownItem>
      <MenuDropdownItem @item-click="handleLogOut" separator>
        <template #icon>
          <!-- Heroicon name: logout -->
          <svg
            class="dropdown-item__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </template>
        <template #label>Log out</template>
      </MenuDropdownItem>
    </MenuDropdown>
  </div>
</template>

<script lang="ts">
import { LOG_OUT } from '@/store/action-types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import MenuDropdown from '@/components/MenuDropdown.vue'

export default defineComponent({
  name: 'UserDropdown',
  components: { MenuDropdownItem, MenuDropdown },
  mixins: [userMixin],
  data () {
    return {
      isOpen: false
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
