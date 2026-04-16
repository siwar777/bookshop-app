<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        {{ isAdmin ? 'Book Shop' : 'Bookstore' }}
      </div>
      <div class="navbar-links">
        <template v-if="!isLoggedIn">
          <router-link to="/">Home</router-link>
          <router-link to="/login">Login</router-link>
        </template>
        <template v-else-if="isAdmin">
          <router-link to="/">Accueil</router-link>
          <router-link to="/admin/books">Books</router-link>
          <router-link to="/admin/authors">Authors</router-link>
          <a href="#" @click.prevent="logout">Logout</a>
        </template>
        <template v-else>
          <router-link to="/">Accueil</router-link>
          <router-link to="/books">All-Books</router-link>
          <router-link to="/add">Add</router-link>
          <router-link to="/favourites" class="favourites-link">Favourites</router-link>
          <a href="#" @click.prevent="logout">Logout</a>
        </template>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token')
    },
    isAdmin() {
      return localStorage.getItem('role') === 'admin'
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
      this.$router.push('/login')
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #e0e0e0;
}

.navbar {
  background: linear-gradient(to right, #0a1a3a, #1a5fb4);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  color: white;
  font-size: 22px;
  font-weight: bold;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-variant: small-caps;
  font-size: 16px;
}

.navbar-links a:hover {
  text-decoration: underline;
}

.favourites-link {
  color: red !important;
}

button {
  background: linear-gradient(to bottom, #1a5fb4, #0a1a3a);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  opacity: 0.9;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

label {
  font-weight: bold;
  display: block;
  margin-top: 15px;
}
</style>
