import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/home/Home.vue'
import HomeList from './../views/home/HomeList.vue'
import PageNotFaund from './../views/page-not-found/PageNotFound.vue'
import PokemonDetails from './../components/PokemonDetails.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/list',
    name: 'list',
    component: HomeList,
  },
  {
    path: '/list/:name', // As children don't work correctly now ;/ 
    name: 'pokeDetails',
    component: PokemonDetails
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFaund
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
