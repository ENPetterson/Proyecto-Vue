<template>
  <section>
      <p>{{cantidad}}</p>
      <button v-on:click="sumar">Sumar</button>
      <button v-on:click="restar">Restar</button>
      <a v-on:click="cantidad=0">Reset</a>

      <section id="config">
          <h1>Configuracion</h1>
      </section>
  </section>
</template>

<script>
export default {
    data () {
        return {
            cantidad: 0
        }

    },
    methods: {
        sumar: function() {
            if (this.cantidad>=0) {
                this.cantidad++
            }

        },
        restar: function() {
            if (this.cantidad>0) {
                this.cantidad--
            }
        }
    }
}

</script>

<style scoped>

p{
    font-size: 50px;
    text-align: center;
}
#config {
    border: 1px solid red;
}
</style>