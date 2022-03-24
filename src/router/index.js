import { createRouter, createWebHistory } from 'vue-router'
import Home from './../views/home/Home.vue'
import HomeList from './../views/home/HomeList.vue'
import PageNotFaund from './../views/page-not-found/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/list',
        name: 'list',
        component: HomeList
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: HomeList
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
