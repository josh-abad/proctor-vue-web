import { AuthenticatedUser, Role } from '@/types'
import store from '@/store'

export default {
  computed: {
    user (): AuthenticatedUser | null {
      return store.state.user
    }
  },
  methods: {
    hasPermission (roles: Role[]): boolean {
      return store.getters.permissions(roles)
    }
  }
}
