import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)

// Books
export const getBooks = () => api.get('/books')
export const addBook = (data) => api.post('/books', data)
export const updateBook = (id, data) => api.put(`/books/${id}`, data)
export const deleteBook = (id) => api.delete(`/books/${id}`)

// Authors
export const getAuthors = () => api.get('/authors')
export const addAuthor = (data) => api.post('/authors', data)
export const deleteAuthor = (id) => api.delete(`/authors/${id}`)

// Favourites
export const getFavourites = (userId) => api.get(`/auth/${userId}/favourites`)
export const addFavourite = (userId, bookId) => api.post(`/auth/${userId}/favourites/${bookId}`)
export const removeFavourite = (userId, bookId) => api.delete(`/auth/${userId}/favourites/${bookId}`)