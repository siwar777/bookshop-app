<template>
  <div class="container">
    <div class="header">
      <h2>Books</h2>
      <button @click="showModal = true">Add Book</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Editor</th>
          <th>Year</th>
          <th>Author</th>
          <th>Image</th>
          <th>Summary</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book._id">
          <td>{{ book._id.substring(0, 6) }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.editor }}</td>
          <td>{{ book.year }}</td>
          <td>{{ book.author?.name || '' }}</td>
          <td>{{ book.image?.substring(0, 30) }}...</td>
          <td>{{ book.description?.substring(0, 20) }}...</td>
          <td><button class="delete-btn" @click="deleteBook(book._id)">✂</button></td>
          <td><button class="edit-btn" @click="editBook(book)">✏</button></td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit Modal -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ editingBook ? 'Edit Book' : 'Add Book' }}</h3>
          <span @click="closeModal">✕</span>
        </div>
        <label>Title</label>
        <input v-model="form.title" type="text" />
        <label>Image</label>
        <input v-model="form.image" type="text" />
        <label>Editor</label>
        <input v-model="form.editor" type="text" />
        <label>Year</label>
        <input v-model="form.year" type="number" />
        <label>Description</label>
        <textarea v-model="form.description" rows="3"></textarea>
        <label>Author</label>
        <select v-model="form.author">
          <option v-for="author in authors" :key="author._id" :value="author._id">
            {{ author.name }}
          </option>
        </select>
        <div class="modal-footer">
          <button @click="submitBook">Ajouter Livre</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks, addBook, updateBook, deleteBook, getAuthors } from '../services/api.js'

export default {
  data() {
    return {
      books: [],
      authors: [],
      showModal: false,
      editingBook: null,
      form: { title: '', image: '', editor: '', year: '', description: '', author: '' },
    }
  },
  async mounted() {
    await this.loadBooks()
    const res = await getAuthors()
    this.authors = res.data
  },
  methods: {
    async loadBooks() {
      const res = await getBooks()
      this.books = res.data
    },
    async deleteBook(id) {
      await deleteBook(id)
      await this.loadBooks()
    },
    editBook(book) {
      this.editingBook = book
      this.form = {
        title: book.title,
        image: book.image,
        editor: book.editor,
        year: book.year,
        description: book.description,
        author: book.author?._id || '',
      }
      this.showModal = true
    },
    async submitBook() {
      if (this.editingBook) {
        await updateBook(this.editingBook._id, this.form)
      } else {
        await addBook(this.form)
      }
      await this.loadBooks()
      this.closeModal()
    },
    closeModal() {
      this.showModal = false
      this.editingBook = null
      this.form = { title: '', image: '', editor: '', year: '', description: '', author: '' }
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

.edit-btn {
  background: linear-gradient(to bottom, #c2185b, #880e4f);
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
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
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