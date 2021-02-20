<template>
  <div class="p-4">
    <AppPanel>
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
        <AppAccordion label="User">
          <AppButton>Change Password</AppButton>
          <div class="mt-2">
            <router-link :to="`/user/${user?.id}/reference-image`">
              <AppButton>Configure Face ID</AppButton>
            </router-link>
          </div>
        </AppAccordion>
        <AppAccordion label="Appearance" class="mt-2">
          <div>
            <ToggleButton
              v-model="automatic"
              label="Automatic (follows system settings)"
            />
          </div>
          <div>
            <ToggleButton
              v-model="darkMode"
              label="Dark Mode"
              :disabled="automatic"
            />
          </div>
        </AppAccordion>
      </div>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppAccordion from '@/components/ui/AppAccordion.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import ToggleButton from '@/components/ui/AppSwitch.vue'
import { SET_THEME } from '@/store/mutation-types'
import { Theme } from '@/types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'

export default defineComponent({
  name: 'SettingsPage',
  components: { ToggleButton, AppPanel, AppAccordion, AppButton },
  mixins: [userMixin],
  data () {
    return {
      automatic: false,
      darkMode: false
    }
  },
  computed: {
    theme (): Theme {
      return this.$store.state.theme.theme
    }
  },
  watch: {
    automatic (enabled: boolean) {
      if (enabled) {
        this.handleChangeTheme(null)
      } else {
        this.handleChangeTheme(this.darkMode ? 'dark' : 'light')
      }
    },
    darkMode (enabled: boolean) {
      this.handleChangeTheme(enabled ? 'dark' : 'light')
    }
  },
  mounted () {
    if (this.theme) {
      this.darkMode = this.theme === 'dark'
    } else {
      this.automatic = true
    }
  },
  methods: {
    handleChangeTheme (theme: Theme) {
      this.$store.commit(SET_THEME, theme)
    }
  }
})
</script>
