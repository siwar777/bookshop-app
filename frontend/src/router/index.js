import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AllBooks from '../views/AllBooks.vue'
import AddBook from '../views/AddBook.vue'
import Favourites from '../views/Favourites.vue'
import AdminBooks from '../views/AdminBooks.vue'
import AdminAuthors from '../views/AdminAuthors.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/books', component: AllBooks, meta: { requiresAuth: true } },
  { path: '/add', component: AddBook, meta: { requiresAuth: true } },
  { path: '/favourites', component: Favourites, meta: { requiresAuth: true } },
  { path: '/admin/books', component: AdminBooks, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/authors', component: AdminAuthors, meta: { requiresAuth: true, requiresAdmin: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.meta.requiresAdmin && role !== 'admin') {
    next('/')
  } else {
    next()
  }
})

export default router