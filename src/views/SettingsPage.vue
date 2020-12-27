<template>
  <div>
    <div class="flex items-center">
      <svg
        class="fill-current w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd"
        />
      </svg>
      <h1 class="ml-2 text-lg">Settings</h1>
    </div>
    <div class="mt-4">
      <h1
        class="uppercase font-semibold tracking-wide text-xs dark:text-gray-400"
      >
        Appearance
      </h1>
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
    </div>
  </div>
</template>

<script lang="ts">
import ToggleButton from '@/components/ToggleButton.vue'
import { SET_THEME } from '@/store/mutation-types'
import { Theme } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ToggleButton },
  name: 'SettingsPage',
  data () {
    return {
      automatic: false,
      darkMode: false
    }
  },
  mounted () {
    if (this.theme) {
      this.darkMode = this.theme === 'dark'
    } else {
      this.automatic = true
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
  methods: {
    handleChangeTheme (theme: Theme) {
      this.$store.commit(SET_THEME, theme)
    }
  },
  computed: {
    theme (): Theme {
      return this.$store.state.theme
    }
  }
})
</script>
