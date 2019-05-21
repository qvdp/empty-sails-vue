<template>
  <article class="card is-rounded">
    <div class="card-content">
      <h1 class="title has-text-grey-dark">
        Create an account
      </h1>
      <p>
        Let's get started! Becoming a member is free and only takes a few minutes.
      </p>

      <hr/>

      <div class="notification" v-if="errorMessage">
        <button class="delete"></button>
        {{ errorMessage }}
      </div>

      <form ref="form" @submit.prevent="signup">

        <div class="field has-text-left">
          <label class="label">First name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="e.g. Alex"
              v-model="signupData.firstName"
            >
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Last name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="e.g. Smith"
              v-model="signupData.name"
            >
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Email address</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger':emailError}"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
              v-model="signupData.emailAddress"
              @input="emailError = ''"
            >
          </div>
          <p class="help is-danger" v-if="emailError">{{ emailError }}</p>
        </div>

        <div class="field has-text-left">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="Your password"
              v-model="signupData.password"
            >
          </div>
        </div>

        <div class="field has-text-left">
          <label class="label">Password confirmation</label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="Confirmation of you password"
              v-model="signupData.passwordConfirmation"
              @input="checkPassword"
            >
          </div>
          <p class="help is-danger" v-if="passwordError">{{ passwordError }}</p>
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
import { SIGNUP_REQUEST } from '@/store/entrance/actions/entrance.actions'

export default {
  name: 'Signup',
  data () {
    return {
      signupData: {
        firstName: '',
        name: '',
        emailAddress: '',
        password: '',
        passwordConfirmation: ''
      },
      isLoading: false,
      errorMessage: '',
      passwordError: '',
      emailError: ''
    }
  },
  methods: {
    signup () {
      this.isLoading = true
      this.$store.dispatch(SIGNUP_REQUEST, this.signupData)
        .then(resp => this.signupSucceed(resp))
        .catch(error => this.signupFailed(error))
        .finally(() => {
          this.isLoading = false
          this.isSent = true
        })
    },
    signupSucceed (resp) {
      this.$router.push({ name: 'Login' })
    },
    signupFailed (error) {
      this.emailError = error.response.status === 409 ? 'Email deja utilise' : ''
      this.errorMessage = error.response.status === 409 ? '' : 'Autre message'
    },
    checkPassword () {
      this.passwordError = (this.signupData.password !== this.signupData.passwordConfirmation) ? 'Ne match pas' : ''
    }
  },
  computed: {
    isComplete () {
      return this.signupData.emailAddress &&
      this.signupData.password &&
      this.signupData.firstName &&
      this.signupData.name &&
      this.signupData.password &&
      (this.signupData.password === this.signupData.passwordConfirmation)
    }
  }
}
</script>

<style scoped lang="css">
.is-rounded {
  border-radius: 5px;
}
hr {
  display: block;
  margin-before: 0.25em;
  margin-after: 0.25em;
  margin-start: auto;
  margin-end: auto;
  overflow: hidden;
  border-style: inset;
  border-width: 0.75px;
}

</style>
