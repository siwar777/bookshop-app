<template>
  <div class="container">
    <div class="books-grid">
      <div class="book-card" v-for="book in favourites" :key="book._id">
        <img :src="book.image" :alt="book.title" />
        <h3>{{ book.title }}</h3>
        <p>{{ book.year }}</p>
        <button @click="remove(book._id)">Remove From Favourites</button>
      </div>
      <div v-if="favourites.length === 0" class="empty">
        <p>No favourites yet! 🌸 Go add some books!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getFavourites, removeFavourite } from '../services/api.js'

export default {
  data() {
    return {
      favourites: [],
    }
  },
  async mounted() {
    const userId = localStorage.getItem('userId')
    const res = await getFavourites(userId)
    this.favourites = res.data
  },
  methods: {
    async remove(bookId) {
      const userId = localStorage.getItem('userId')
      await removeFavourite(userId, bookId)
      this.favourites = this.favourites.filter((b) => b._id !== bookId)
    },
  },
}
</script>

<style scoped>
.container {
  padding: 30px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.book-card {
  background: white;
  border-radius: 16px;
  padding: 15px;
  text-align: center;
  border: 1px solid #f8bbd0;
  box-shadow: 0 4px 15px rgba(233, 30, 140, 0.1);
}

.book-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

.book-card h3 {
  margin: 10px 0 5px;
  color: #8b0050;
  font-size: 16px;
}

.book-card p {
  color: #c2185b;
  margin-bottom: 10px;
}

.empty {
  text-align: center;
  color: #c2185b;
  font-size: 18px;
  grid-column: span 3;
  margin-top: 50px;
}
</style>