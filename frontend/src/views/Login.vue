<template>
  <div class="auth-container">
    <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>

    <div class="form">
      <label>Username</label>
      <input v-model="username" type="text" />

      <template v-if="!isLogin">
        <label>Email</label>
        <input v-model="email" type="email" />
      </template>

      <label>Password</label>
      <input v-model="password" type="password" />

      <div class="error" v-if="error">{{ error }}</div>

      <div class="buttons">
        <button @click="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
        <button @click="isLogin = !isLogin" class="switch-btn">
          {{ isLogin ? 'Switch to Register' : 'Switch to Login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '../services/api.js'

export default {
  data() {
    return {
      isLogin: true,
      username: '',
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async submit() {
      this.error = ''
      try {
        if (this.isLogin) {
          const res = await login({ username: this.username, password: this.password })
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('role', res.data.role)
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('username', res.data.username)
          if (res.data.role === 'admin') {
            this.$router.push('/admin/books')
          } else {
            this.$router.push('/books')
          }
        } else {
          await register({ username: this.username, email: this.email, password: this.password })
          this.isLogin = true
          this.error = 'Registered successfully! Please login.'
        }
      } catch (e) {
        this.error = e.response?.data?.message || 'Something went wrong'
      }
    },
  },
}
</script>

<style scoped>
.auth-container {
  max-width: 500px;
  margin: 60px auto;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(233, 30, 140, 0.15);
  border: 1px solid #f8bbd0;
}

h2 {
  text-align: center;
  color: #8b0050;
  margin-bottom: 20px;
  font-size: 24px;
}

.form {
  display: flex;
  flex-direction: column;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
}

.switch-btn {
  background: linear-gradient(to bottom, #8b0050, #4a0028);
}

.error {
  color: #e91e8c;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
</style>