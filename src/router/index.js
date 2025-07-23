import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import MovieLayout from '../layouts/MovieLayout.vue'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import MovieDetails from '../components/MovieDetails.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'movies',
        component: Movies,
      },
      {
        path: 'movies/:id',
        component: MovieLayout,
        children: [
          {
            path: '',
            component: MovieDetails,
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router