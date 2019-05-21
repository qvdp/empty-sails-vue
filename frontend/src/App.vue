<template>
  <div id="app">
    <section class="hero is-fullheight is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <router-view/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



</style>
