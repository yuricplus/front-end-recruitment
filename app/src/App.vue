<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
const Home = require('./components/Home/Home.vue').default

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}

body {
  display: inline;
  padding: 15px;
}
</style>
