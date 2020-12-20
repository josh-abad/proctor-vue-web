<template>
  <div class="home dark:text-gray-200 text-xl">
    <div v-if="user">
      Home page
      <div class="mt-4">
        <h1 class="uppercase font-semibold tracking-wide text-sm">
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
            v-show="!automatic"
          />
        </div>
      </div>
      <div class="mt-4">
        <RecentCourses />
      </div>
    </div>
    <div v-else>you are not logged in smh</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Theme, User } from '@/types'
import RecentCourses from '@/components/RecentCourses.vue'
import { SET_THEME } from '@/store/mutation-types'
import ToggleButton from '@/components/ToggleButton.vue'

export default defineComponent({
  components: { RecentCourses, ToggleButton },
  name: 'Home',
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
    user (): User {
      return this.$store.state.user
    },
    theme (): Theme {
      return this.$store.state.theme
    }
  }
})
</script>
