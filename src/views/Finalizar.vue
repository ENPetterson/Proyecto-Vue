<template>
  <div>
    <h2>Finalizar pedido</h2> 
    <ul>
        <li v-for="producto in carrito" :key="producto.id">{{ producto.nombre }}</li>
    </ul>

    <section v-if="usuarioLogueado">
        <button @click="enviarPedido">Comprar</button>
        <button @click="logout">Log out</button>
    </section>

    <section v-if="usuarioNuevo && !usuarioLogueado">
        <h3>Registro de nuevo usuario <button @click="usuarioNuevo=false">Ya tenes usuario?</button></h3>
        <form @submit.prevent="registrar">
            <label for="username">Nombre de usuario</label>
            <input id="username" v-model="usuario.username">
            <span v-show="usuario.username.length<3">El nombre es obligatorio</span>

            <label for="password">Contraseña</label>
            <input id="password" type="password" v-model="usuario.password">

            <label for="email">Email</label>
            <input id="email" type="email" v-model="usuario.email">

            <button type="submit">Registrar y Comprar</button>
        </form>
    </section>

    <section v-if="!usuarioNuevo && !usuarioLogueado">
        <h3>Login <button @click="usuarioNuevo=true"> No tengo usuario</button></h3>
        <form @submit.prevent="login">
            <label for="login_username">Nombre de usuario</label>
            <input id="login_username" v-model="usuario.username">
            <span v-show="usuario.username.length<3">El nombre es obligatorio</span>

            <label for="login_password">Contraseña</label>
            <input id="login_password" type="password" v-model="usuario.password">

            <button type="submit">Login y Comprar</button>
        </form>
    </section>


  </div>
</template>

<script>
import { API } from '../data/API'
export default {
    created: function() {
        if (sessionStorage.getItem("carrito")!=undefined) {
            this.carrito = JSON.parse(sessionStorage.getItem("carrito"))
        }     
        if (localStorage.getItem("token")!=undefined) {
            this.usuarioLogueado = true
        }
    },
    data() {
        return {
            carrito: [],
            usuarioNuevo: true,
            usuarioLogueado: false,
            usuario: {
                username: "",
                password: "",
                email: ""
            }
        }
    },
    methods: {
        enviarPedido: async function() {
            API.enviarPedido(this.carrito)
        },
        registrar: async function() {
            let respuesta = await API.registrar(this.usuario);
            if (respuesta.ok) {
                alert("Usuario se registro de manera correcta")
                this.enviarPedido();
                this.usuarioLogueado = true
                this.usuario = {
                    username: "",
                    password: "",
                    email: ""
                }
            } else {
                alert("Hubo un problema: " + respuesta.message)
            }
        },
        logout: function() {
            localStorage.removeItem("token");
            this.usuarioLogueado = false;
        },
        login: async function() {
            let respuesta = await API.login(this.usuario);
            if (respuesta.token) {
                localStorage.setItem("token", respuesta.token)             
                this.enviarPedido();
                alert("Usuario logeado correctamente")
                this.usuarioLogueado = true
                this.usuario = {
                    username: "",
                    password: "",
                    email: ""
                }
            } else {
                alert("Hubo un problema")
            }
        }
    }
}
</script>

<style scoped>
    form {
        width: 60%;
        text-align: center;
        margin: auto;
    }
    input, label {
       display: inline-block;
       width: 40%;
    }
    label, button[type=submit] {
        clear: both;
        width: 80%;
        margin-top: 20px;
    }

</style>