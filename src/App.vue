<template>
  <div id="app">
    <encabezado></encabezado>
    <router-view/>
    <pie-pagina></pie-pagina>
  </div>
</template>

<script>
import Encabezado from './components/encabezado.vue'
import piePagina from './components/pie-pagina.vue'
export default {
  components: { piePagina, Encabezado },
  name: 'App',
  data () {
    return {
      
    }
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: gray
}

#nav a.router-link-exact-active {
  color: greenyellow
}
</style>