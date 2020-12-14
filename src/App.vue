<template>
  <div class="min-h-screen bg-gray-200 dark:bg-gray-900">
    <div class="flex flex-col antialiased dark:text-white text-gray-900">
      <TheNavBar v-show="isLoggedIn" @toggle="handleToggle" @logged-out="handleLogOut" :isOpen="isOpen" />
      <div class="flex justify-center items-start">
        <TheSidebar :isOpen="isOpen" />
        <router-view class="transform ease-in-out transition-all duration-300" :class="isOpen ? 'opacity-20' : 'opacity-100'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheNavBar from './components/TheNavBar.vue'
import TheSidebar from './components/TheSidebar.vue'
import users from './services/users'

export default defineComponent({
  name: 'App',
  data () {
    return {
      isOpen: false
    }
  },
  components: {
    TheNavBar,
    TheSidebar
  },
  async mounted () {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user) {
        this.$store.commit('setUser', await users.getUser(user.id))
      }
    }
    this.$store.dispatch('loadCourses')
    this.$store.dispatch('loadExamItems')
  },
  methods: {
    handleToggle () {
      this.isOpen = !this.isOpen
    },
    handleLogOut () {
      window.localStorage.clear()
      this.$store.commit('setUser', null)
      this.$router.push('/login')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  }
})
</script>
