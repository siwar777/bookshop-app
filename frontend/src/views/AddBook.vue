<template>
  <div class="container">
    <h2>Add a Book</h2>
    <div class="form">
      <label>Title</label>
      <input v-model="form.title" type="text" />

      <label>Image URL</label>
      <input v-model="form.image" type="text" />

      <label>Editor</label>
      <input v-model="form.editor" type="text" />

      <label>Year</label>
      <input v-model="form.year" type="number" />

      <label>Description</label>
      <textarea v-model="form.description" rows="4"></textarea>

      <label>Author</label>
      <select v-model="form.author">
        <option v-for="author in authors" :key="author._id" :value="author._id">
          {{ author.name }}
        </option>
      </select>

      <div class="success" v-if="success">Book added successfully! 🌸</div>
      <div class="error" v-if="error">{{ error }}</div>

      <div class="buttons">
        <button @click="submit">Ajouter Livre</button>
      </div>
    </div>
  </div>
</template>

<script>
import { addBook, getAuthors } from '../services/api.js'

export default {
  data() {
    return {
      form: {
        title: '',
        image: '',
        editor: '',
        year: '',
        description: '',
        author: '',
      },
      authors: [],
      success: false,
      error: '',
    }
  },
  async mounted() {
    const res = await getAuthors()
    this.authors = res.data
  },
  methods: {
    async submit() {
      this.error = ''
      this.success = false
      try {
        await addBook(this.form)
        this.success = true
        this.form = { title: '', image: '', editor: '', year: '', description: '', author: '' }
      } catch (e) {
        this.error = e.response?.data?.message || 'Something went wrong'
      }
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
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
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.success {
  color: #8b0050;
  margin-top: 10px;
  text-align: center;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>