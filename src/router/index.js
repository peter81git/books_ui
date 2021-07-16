import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//import Books from "@/views/Books";

Vue.use(VueRouter)

const routes = [
  {
    path: '/books',
    name: 'books',
    component: () => import(/* webpackChunkName: "books" */ '@/views/Books')
  },
  {
    path: '/requests',
    name: 'requests',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "requests" */ '@/views/Requests')
  },
  {
    path: '/users',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users')
  }
]

const router = new VueRouter({
  routes
})

export default router
