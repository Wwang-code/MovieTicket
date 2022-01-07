import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './Home'
import cinemaRouter from './Cinema'
import moviesRouter from './Movies'
import personalRouter from './Personal'

Vue.use(VueRouter)

const routes = [
  homeRouter,
  cinemaRouter,
  moviesRouter,
  personalRouter,
  {
    path:'/',
    redirect:'/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
