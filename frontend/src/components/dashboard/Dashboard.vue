<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="logout">Log-out</button>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from '@/store/entrance/actions/entrance.actions'

export default {
  name: 'Dashboard',
  props: {
    isBlock: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      logoutLoading: false
    }
  },
  methods: {
    logout () {
      this.logoutLoading = true
      this.$store.dispatch(AUTH_LOGOUT)
        .finally(resp => {
          delete localStorage.token
          this.$router.push({ name: 'Login' })
          this.logoutLoading = false
        })
    }
  }
}
</script>

<style scoped lang="css">
</style>
