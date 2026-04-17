<template>
  <div>
    <div class="hero">
      <h1>Découvrez des livres pour tous les goûts</h1>
      <p>Des classiques intemporels aux derniers best-sellers, trouvez votre prochaine lecture ici.</p>
      <router-link to="/books">
        <button>Explorer le catalogue</button>
      </router-link>
    </div>

    <div class="popular">
      <h2>Livres populaires</h2>
      <div class="books-grid">
        <div class="book-card" v-for="book in popularBooks" :key="book._id">
          <img :src="book.image" :alt="book.title" />
          <h3>{{ book.title }}</h3>
          <p>{{ book.description?.substring(0, 50) }}...</p>
          <router-link to="/books">
            <button>Voir plus</button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="footer">
      <h3>Besoin d'aide ?</h3>
      <p>Contactez-nous pour toute question ou assistance.</p>
      <button>Contactez-nous</button>
    </div>
  </div>
</template>

<script>
import { getBooks } from '../services/api.js'

export default {
  data() {
    return {
      popularBooks: [],
    }
  },
  async mounted() {
    try {
      const res = await getBooks()
      this.popularBooks = res.data.slice(0, 3)
    } catch (e) {
      console.log(e)
    }
  },
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #fff0f5, #fce4ec);
  text-align: center;
  padding: 60px 20px;
}

.hero h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #8b0050;
}

.hero p {
  color: #c2185b;
  margin-bottom: 20px;
}

.popular {
  padding: 40px;
  background-color: #fff0f5;
}

.popular h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #8b0050;
}

.books-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.book-card {
  background: white;
  border-radius: 16px;
  padding: 15px;
  width: 220px;
  text-align: center;
  border: 1px solid #f8bbd0;
  box-shadow: 0 4px 15px rgba(233, 30, 140, 0.1);
}

.book-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.book-card h3 {
  margin: 10px 0 5px;
  font-size: 16px;
  color: #8b0050;
}

.book-card p {
  font-size: 13px;
  color: #c2185b;
  margin-bottom: 10px;
}

.footer {
  background: linear-gradient(to right, #8b0050, #e91e8c);
  color: white;
  text-align: center;
  padding: 40px;
}

.footer p {
  margin: 10px 0 20px;
}
</style>