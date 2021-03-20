<template>
  <div class="p-4">
    <AppPanel class="w-full md:w-1/2">
      <div class="flex items-center">
        <svg
          class="w-6 h-6 fill-current"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="ml-2 text-2xl font-semibold">Settings</div>
      </div>
      <div class="mt-4">
        <AppAccordion label="User">
          <SettingsItem
            name="Change Password"
            description="Password must be at least 6 characters"
          >
            <AppButton>Change</AppButton>
          </SettingsItem>
          <SettingsItem
            name="Configure Face ID"
            description="Set up facial identification for exams"
            class="mt-2"
          >
            <router-link :to="`/user/${user?.id}/reference-image`">
              <AppButton>Configure</AppButton>
            </router-link>
          </SettingsItem>
        </AppAccordion>
        <AppAccordion label="Appearance" class="mt-2">
          <SettingsItem name="Automatic" description="Follows system settings">
            <ToggleButton v-model="automatic" />
          </SettingsItem>
          <SettingsItem name="Dark Mode">
            <ToggleButton v-model="darkMode" :disabled="automatic" />
          </SettingsItem>
        </AppAccordion>
      </div>
      <div class="mt-4">
        <header class="label-border">
          <AppLabel emphasis> Deactivate Account </AppLabel>
        </header>
        <section class="py-4">
          <button
            id="btn-open"
            class="flex items-center text-red-500 focus:outline-none"
            @click="deleteModalOpen = true"
          >
            <svg
              class="w-5 h-5 pointer-events-none fill-current"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span
              class="ml-1 text-sm font-bold tracking-wide uppercase pointer-events-none"
            >
              Deactivate Account
            </span>
          </button>
          <teleport to="#modals">
            <AppModal :open="deleteModalOpen" @close="deleteModalOpen = false">
              <template #header> Deactivate Account </template>
              <template #body>
                Are you sure you want to deactivate your account?
              </template>
              <template #action>
                <AppButton @click="deactivateAccount" prominent>
                  Deactivate
                </AppButton>
              </template>
            </AppModal>
          </teleport>
        </section>
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
import AppLabel from '@/components/ui/AppLabel.vue'
import usersService from '@/services/users'
import { ALERT } from '@/store/action-types'
import AppModal from '@/components/ui/AppModal.vue'
import SettingsItem from './components/SettingsItem.vue'

export default defineComponent({
  name: 'SettingsPage',
  components: { ToggleButton, AppPanel, AppAccordion, AppButton, AppLabel, AppModal, SettingsItem },
  mixins: [userMixin],
  data () {
    return {
      automatic: false,
      darkMode: false,
      deleteModalOpen: false
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
    },
    async deactivateAccount () {
      this.deleteModalOpen = false
      if (this.user) {
        try {
          await usersService.deleteUser(this.user.id)
          this.$router.push('/login')
          await this.$store.dispatch(ALERT, 'Student removed.')
        } catch (error) {
          await this.$store.dispatch(ALERT, 'Could not delete student.')
        }
      }
    }
  }
})
</script>
