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
    <MenuDropdown class="mt-2" v-show="isOpen" @click-outside="isOpen = false" toggle-id="user-dropdown-toggle">
      <MenuDropdownItem
        :path="`/user/${user?.id || ''}`"
        @item-click="isOpen = false"
      >
        Profile
      </MenuDropdownItem>
      <MenuDropdownItem path="/settings" @item-click="isOpen = false">
        Settings
      </MenuDropdownItem>
      <MenuDropdownItem @item-click="handleLogOut"> Log out </MenuDropdownItem>
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
