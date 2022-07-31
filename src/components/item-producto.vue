<template> 
  <article>
      <section>
      <p class=".categoria">{{ categoria(producto.categoria_id) }}</p>
      <h2>{{ producto.nombre }}</h2>
      <p class=".precio">{{ precio }}</p>
      </section>
      <button @click="agregar">Agregar al pedido</button>
  </article>
</template>

<script>
import { API } from '../data/API';
export default {
    props: ["producto"],
    computed: {
        precio: function() {
            return `$ ${this.producto.precio}`;
        }
    },
    methods: {
        categoria: function(idCategoria) {
            return API.getCategoriaById(idCategoria).nombre
        },
        agregar: function() {
            this.$emit("add", this.producto)
        }
    }
}
</script>

<style scoped>
    article {
        border-bottom: 2px dotted black;
    }
    button {
        background-color: rgb(165, 245, 118);
    }
    article section{
        display: flex;
    }
    p, h2 {
        margin: 0;
        font-size: 18px;           
    }
    h2 {
        flex-grow: 1;
    }

</style>