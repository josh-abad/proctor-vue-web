<template>
  <div class="p-4">
    <AppPanel class="w-full md:w-1/2">
      <div class="flex items-center">
        <CogIcon class="w-6 h-6 fill-current" />
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
            <AppSwitch v-model="automatic" />
          </SettingsItem>
          <SettingsItem name="Dark Mode">
            <AppSwitch v-model="darkMode" :disabled="automatic" />
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
            <TrashIcon class="w-5 h-5 pointer-events-none fill-current" />
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
import AppSwitch from '@/components/ui/AppSwitch.vue'
import { SET_THEME } from '@/store/mutation-types'
import { Theme } from '@/types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import AppLabel from '@/components/ui/AppLabel.vue'
import usersService from '@/services/users'
import { ALERT } from '@/store/action-types'
import AppModal from '@/components/ui/AppModal.vue'
import SettingsItem from './components/SettingsItem.vue'
import { TrashIcon, CogIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    AppSwitch,
    AppPanel,
    AppAccordion,
    AppButton,
    AppLabel,
    AppModal,
    SettingsItem,
    CogIcon,
    TrashIcon
  },
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
