<template>
  <div class="container">
    <div class="search-bar">
      <label>Start Year</label>
      <input v-model="startYear" type="number" />
      <label>End Year</label>
      <input v-model="endYear" type="number" />
      <button @click="search">Search</button>
    </div>

    <div class="books-grid">
      <div class="book-card" v-for="book in filteredBooks" :key="book._id">
        <img :src="book.image" :alt="book.title" />
        <h3>{{ book.title }}</h3>
        <p>{{ book.year }}</p>
        <button @click="toggleFavourite(book)">
          {{ isFavourite(book._id) ? 'Remove From Favourites' : 'Add To Favourites' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks, getFavourites, addFavourite, removeFavourite } from '../services/api.js'

export default {
  data() {
    return {
      books: [],
      favouriteIds: [],
      startYear: '',
      endYear: '',
    }
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) => {
        if (this.startYear && book.year < this.startYear) return false
        if (this.endYear && book.year > this.endYear) return false
        return true
      })
    },
  },
  async mounted() {
    const res = await getBooks()
    this.books = res.data
    const userId = localStorage.getItem('userId')
    if (userId) {
      const favRes = await getFavourites(userId)
      this.favouriteIds = favRes.data.map((b) => b._id)
    }
  },
  methods: {
    search() {},
    isFavourite(id) {
      return this.favouriteIds.includes(id)
    },
    async toggleFavourite(book) {
      const userId = localStorage.getItem('userId')
      if (this.isFavourite(book._id)) {
        await removeFavourite(userId, book._id)
        this.favouriteIds = this.favouriteIds.filter((id) => id !== book._id)
      } else {
        await addFavourite(userId, book._id)
        this.favouriteIds.push(book._id)
      }
    },
  },
}
</script>

<style scoped>
.container {
  padding: 30px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  background: white;
  padding: 15px 20px;
  border-radius: 12px;
  border: 1px solid #f8bbd0;
}

.search-bar label {
  margin-top: 0;
  white-space: nowrap;
  color: #8b0050;
}

.search-bar input {
  width: 150px;
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
</style>