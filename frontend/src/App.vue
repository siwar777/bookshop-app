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
  font-family: 'Georgia', serif;
}

body {
  background-color: #fff0f5;
}

.navbar {
  background: linear-gradient(to right, #8b0050, #e91e8c);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  color: white;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
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
  color: #ffe0f0 !important;
  font-weight: bold;
}

button {
  background: linear-gradient(to bottom, #e91e8c, #8b0050);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0.5px;
}

button:hover {
  opacity: 0.85;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #f48fb1;
  border-radius: 8px;
  font-size: 14px;
  background-color: #fff5f9;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #e91e8c;
}

label {
  font-weight: bold;
    display: block;
  margin-top: 15px;
  color: #8b0050;
}
</style>