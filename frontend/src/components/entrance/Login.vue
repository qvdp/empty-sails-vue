<template>

  <article class="card is-rounded">
    <div class="card-content">
      <h1 class="title">
        <img :src="require('@/assets/logo.png')" alt="logo" width="100">
      </h1>

      <div class="notification" v-if="isError">
        <button class="delete" @click="isError = false"></button>
        {{ errorMessage }}
      </div>

      <form ref="form" @submit.prevent="login">
        <div class="field has-text-left">
          <label class="label">Email address</label>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
              v-model="loginData.emailAddress"
            >
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="Your password"
              v-model="loginData.password"
            >
          </div>
        </div>
        <p class="control">
          <button class="button is-primary is-medium is-fullwidth" type="submit" :disabled="!isComplete">
            Login
          </button>
        </p>
      </form>
    </div>
  </article>

</template>

<script>
import { AUTH_REQUEST } from '@/store/entrance/actions/entrance.actions'

export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        emailAddress: '',
        password: ''
      },
      errorMessage: '',
      isLoading: false,
      isError: false
    }
  },
  methods: {
    login () {
      this.isError= false
      this.isLoading = true
      this.$store.dispatch(AUTH_REQUEST, this.loginData)
        .then(() => this.loginSucceed())
        .catch(error => this.loginFailed(error))
    },
    loginSucceed () {
      console.log('success')
      this.isLoading = false
      this.$router.replace({ name: 'Dashboard' })
    },
    loginFailed (error) {
      this.isLoading = false
      if (error.response.status === 401) {
        this.errorMessage = 'Mauvais identifiants'
      } else {
        this.errorMessage = 'Autre erreur'
      }
      this.isError= true
      this.loginData.password = ''
    }
  },
  computed: {
    isComplete () {
      return this.loginData.emailAddress && this.loginData.password && (!this.errors.items[0])
    }
  },
}
</script>

<style scoped lang="css">
.is-rounded {
  border-radius: 5px;
}
</style>
