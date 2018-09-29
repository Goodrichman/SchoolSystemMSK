<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/128.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
       
    </template>
    <template slot="header">
      <b-form-text>Beth Johns</b-form-text>
    </template>
    <template slot="dropdown">
      <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item @click.stop="logout()" ><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  methods : {
    logout() {
      localStorage.removeItem( "auth-token" );
      this.$router.push( "/auth/login" );
    }
  }
}
</script>
