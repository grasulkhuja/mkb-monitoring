<template>
  <v-btn icon @click="logout">
    <v-icon size="22">
      {{ icons.mdiLogoutVariant }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mdiLogoutVariant } from '@mdi/js'
export default {
  name: 'LogOutButton',
  setup() {
    const logout = () => {
      localStorage.removeItem('access')
      location.reload()
    }
    return {
      logout,
      icons: {
        mdiLogoutVariant,
      },
    }
  },
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
