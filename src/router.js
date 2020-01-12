import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import BookSearch from './components/BookSearch.vue'
import BookForm from './components/BookForm.vue'
import HowToUse from './components/HowToUse.vue'

Vue.use(VueRouter)

export default new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: BookSearch
    },
    {
      path: '/form',
      name: 'form',
      component: BookForm
    },
    {
      path: '/howto',
      name: 'howto',
      component: HowToUse
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
