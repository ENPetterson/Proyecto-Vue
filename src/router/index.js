import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Finalizar from '../views/Finalizar.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About of',
        component: About
    },
    {
        path: '/finalizar',
        name: 'Finalizar pedido',
        component: Finalizar    
    }
]

const router = new VueRouter ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router