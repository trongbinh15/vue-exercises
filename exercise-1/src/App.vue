<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <BMI/>
</template>

<script>
import BMI from './components/BMI.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    BMI
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
