<template>
  <section>
      <h3>Lista de articulos<button @click="traerDatos">🔁</button></h3>
      <input v-model="filtro" placeholder="Ingrese termino de busqueda">

      <ul v-if="!estadoError">
        <li v-for="p in productosFiltrados"
            :key="p.id">
            <item-producto :producto="p" @add="agregar"/>
        </li>
      </ul>

      <p v-else>Error: no se puede traer los productos</p>
      <carrito @clear="limpiar" :carrito="carrito"/>
  </section>
</template> 

<script>

import { API } from "../data/API";
import Carrito from './carrito.vue';
import itemProducto from './item-producto.vue';
export default {
    components: { itemProducto, Carrito },
    data() {
        return {
            estadoError: false,
            productos: [],
            carrito: [],
            filtro: ""
        }
    },
    created() {
        setInterval(this.traerDatos, 10000)
        this.traerDatos()
        if (sessionStorage.getItem("carrito")!=undefined) {
            this.carrito = JSON.parse(sessionStorage.getItem("carrito"))
        }
    },
    watch: {
        carrito: function(carrito) {
            this.$parent
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
        }
    },
    computed: {
        productosFiltrados: function() {
            return this.productos.filter(
                (producto) => {
                    return producto.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 
                }
            )
        }
    },
    methods: {
        traerDatos: async function() {
            try {
                this.productos = await API.getProductos();
            } catch {
                this.estadoError = true;
            }
        },
        agregar: function(producto) {
            this.carrito.push(producto)
        },
        limpiar: function() {
            this.carrito = []
        }
    }
}

</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
    margin: 0
}
input {
    width: 50%;
    margin-bottom: 40px;
}

</style>