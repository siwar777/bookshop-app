<template>
  <div class="container">
    <div class="header">
      <h2>Authors</h2>
      <button @click="showModal = true">Add Author</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Nationality</th>
          <th>Birth Year</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author._id">
          <td>{{ author.name }}</td>
          <td>{{ author.nationality }}</td>
          <td>{{ author.birthYear }}</td>
          <td><button class="delete-btn" @click="deleteAuthor(author._id)">✂</button></td>
        </tr>
      </tbody>
    </table>

    <!-- Add Modal -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <div class="modal-header">
          <h3>Add Author</h3>
          <span @click="showModal = false">✕</span>
        </div>
        <label>Name</label>
        <input v-model="form.name" type="text" />
        <label>Nationality</label>
        <input v-model="form.nationality" type="text" />
        <label>Birth Year</label>
        <input v-model="form.birthYear" type="number" />
        <div class="modal-footer">
          <button @click="submitAuthor">Add Author</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthors, addAuthor, deleteAuthor } from '../services/api.js'

export default {
  data() {
    return {
      authors: [],
      showModal: false,
      form: { name: '', nationality: '', birthYear: '' },
    }
  },
  async mounted() {
    await this.loadAuthors()
  },
  methods: {
    async loadAuthors() {
      const res = await getAuthors()
      this.authors = res.data
    },
    async deleteAuthor(id) {
      await deleteAuthor(id)
      await this.loadAuthors()
    },
    async submitAuthor() {
      await addAuthor(this.form)
      await this.loadAuthors()
      this.showModal = false
      this.form = { name: '', nationality: '', birthYear: '' }
    },
  },
}
</script>

<style scoped>
.container {
  padding: 30px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: #8b0050;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(233, 30, 140, 0.1);
}

th {
  background: #f8bbd0;
  color: #8b0050;
  padding: 12px;
  text-align: left;
}

td {
  padding: 10px 12px;
  border-bottom: 1px solid #f8bbd0;
  font-size: 13px;
}

.delete-btn {
  background: linear-gradient(to bottom, #e91e8c, #8b0050);
  padding: 6px 12px;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 400px;
  border: 1px solid #f8bbd0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-header h3 {
  color: #8b0050;
}

.modal-header span {
  cursor: pointer;
  font-size: 18px;
  color: #8b0050;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>