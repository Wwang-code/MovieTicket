import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './Home'
import cinemaRouter from './Cinema'
import moviesRouter from './Movies'
import personalRouter from './Personal'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  homeRouter,
  cinemaRouter,
  moviesRouter,
  personalRouter,
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/components/Personal/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/components/Personal/Register.vue')
  },
  {
    path: '/search',
    component: () => import('@/components/Home/Search.vue')
  },
  {
    path: '/moviedetail',
    name: 'moviedetail',
    component: () => import('@/components/Movie/MovieDetail.vue')
  },
  {
    path: '/cinemadetail',
    name: 'cinemadetail',
    component: () => import('@/components/Cinema/CinemaDetail.vue')
  },
  {
    path: '/selectseat',
    name: 'selectseat',
    component: () => import('@/components/Cinema/SelectSeat.vue')
  },
  {
    path: '/submitorder',
    name: 'submitorder',
    component: () => import('@/components/Order/SubmitOrder.vue')
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    component: () => import('@/components/Order/OrderList.vue')
  },
  {
    path: '/updateuinfo',
    name: 'updateuserinfo',
    component: () => import('@/components/Personal/UpdateUserInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
