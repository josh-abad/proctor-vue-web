import { Role } from '@/types'
import store from '@/store'

export default {
  methods: {
    hasPermission (roles: Role[]): boolean {
      return store.getters.permissions(roles)
    }
  }
}
