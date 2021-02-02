<template>
  <div class="p-4">
    <BasePanel>
      <div class="flex items-center">
        <svg
          class="fill-current w-6 h-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="ml-2 font-semibold text-2xl">Settings</div>
      </div>
      <div class="mt-4">
        <Accordion label="User">
          <BaseButton>Change Password</BaseButton>
          <div class="mt-2">
            <router-link :to="`/user/${user?.id}/reference-image`">
              <BaseButton>Configure Face ID</BaseButton>
            </router-link>
          </div>
        </Accordion>
      </div>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import Accordion from '@/components/Accordion.vue'
import BaseButton from '@/components/BaseButton.vue'
import BasePanel from '@/components/BasePanel.vue'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'

export default defineComponent({
  name: 'SettingsPage',
  components: { BasePanel, Accordion, BaseButton },
  mixins: [userMixin]
})
</script>
