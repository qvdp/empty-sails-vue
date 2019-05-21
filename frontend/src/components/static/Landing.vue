<template>
  <div>
    <h1 class="padding is-size-3 has-text-grey-dark">Roger skyline</h1>
    <router-view/>
    <p class="padding">
      {{ $route.name === 'Login' ? 'You do not have an account yet ?' : 'Already have an account ?' }}
      <router-link class="has-text-grey-dark" :to="{ name: $route.name === 'Login' ? 'Signup' : 'Login' }" push>
        {{ $route.name === 'Login' ? 'Sign-up' : 'Login' }}
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style scoped lang="css">
.padding {
  padding: 50px;
}
</style>
