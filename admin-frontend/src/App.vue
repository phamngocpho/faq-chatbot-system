<template>
  <div id="app">
    <header>
      <h1>📋 Quản lý FAQ</h1>
    </header>
    
    <main>
      <div class="form-section">
        <h2>{{ editingId ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới' }}</h2>
        <form @submit.prevent="saveFaq">
          <div class="form-group">
            <label>Danh mục:</label>
            <select v-model="form.category_id">
              <option :value="null">-- Không có --</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Câu hỏi: *</label>
            <textarea v-model="form.question" required rows="3"></textarea>
          </div>
          
          <div class="form-group">
            <label>Câu trả lời: *</label>
            <textarea v-model="form.answer" required rows="5"></textarea>
          </div>
          
          <div class="form-group">
            <label>Keywords (phân cách bằng dấu phẩy):</label>
            <input type="text" v-model="form.keywords" placeholder="giờ mở cửa, open, giờ làm việc">
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editingId ? 'Cập nhật' : 'Thêm mới' }}
            </button>
            <button type="button" @click="resetForm" class="btn-secondary" v-if="editingId">
              Hủy
            </button>
          </div>
        </form>
      </div>

      <div class="table-section">
        <h2>Danh sách câu hỏi ({{ faqs.length }})</h2>
        <div v-if="loading" class="loading">Đang tải...</div>
        <table v-else>
          <thead>
            <tr>
              <th>ID</th>
              <th>Danh mục</th>
              <th>Câu hỏi</th>
              <th>Câu trả lời</th>
              <th>Keywords</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="faq in faqs" :key="faq.id">
              <td>{{ faq.id }}</td>
              <td>{{ faq.category_name || '-' }}</td>
              <td>{{ faq.question }}</td>
              <td>{{ faq.answer.substring(0, 50) }}...</td>
              <td>{{ faq.keywords || '-' }}</td>
              <td class="actions">
                <button @click="editFaq(faq)" class="btn-edit">Sửa</button>
                <button @click="deleteFaq(faq.id)" class="btn-delete">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export default {
  name: 'App',
  data() {
    return {
      faqs: [],
      categories: [],
      loading: false,
      editingId: null,
      form: {
        category_id: null,
        question: '',
        answer: '',
        keywords: ''
      }
    };
  },
  mounted() {
    this.loadCategories();
    this.loadFaqs();
  },
  methods: {
    async loadCategories() {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        this.categories = response.data.data;
      } catch (error) {
        alert('Lỗi khi tải danh mục: ' + error.message);
      }
    },
    async loadFaqs() {
      this.loading = true;
      try {
        const response = await axios.get(`${API_URL}/faqs`);
        this.faqs = response.data.data;
      } catch (error) {
        alert('Lỗi khi tải danh sách FAQ: ' + error.message);
      } finally {
        this.loading = false;
      }
    },
    async saveFaq() {
      try {
        if (this.editingId) {
          await axios.put(`${API_URL}/faqs/${this.editingId}`, this.form);
          alert('Cập nhật thành công!');
        } else {
          await axios.post(`${API_URL}/faqs`, this.form);
          alert('Thêm mới thành công!');
        }
        this.resetForm();
        this.loadFaqs();
      } catch (error) {
        alert('Lỗi: ' + error.message);
      }
    },
    editFaq(faq) {
      this.editingId = faq.id;
      this.form = {
        category_id: faq.category_id,
        question: faq.question,
        answer: faq.answer,
        keywords: faq.keywords
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async deleteFaq(id) {
      if (!confirm('Bạn có chắc muốn xóa câu hỏi này?')) return;
      try {
        await axios.delete(`${API_URL}/faqs/${id}`);
        alert('Xóa thành công!');
        this.loadFaqs();
      } catch (error) {
        alert('Lỗi khi xóa: ' + error.message);
      }
    },
    resetForm() {
      this.editingId = null;
      this.form = {
        category_id: null,
        question: '',
        answer: '',
        keywords: ''
      };
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

header h1 {
  font-size: 28px;
}

main {
  display: grid;
  gap: 30px;
}

.form-section, .table-section {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
}

textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-edit {
  background: #ffc107;
  color: #333;
  padding: 5px 12px;
  font-size: 13px;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-delete {
  background: #dc3545;
  color: white;
  padding: 5px 12px;
  font-size: 13px;
}

.btn-delete:hover {
  background: #c82333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8f9fa;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  font-weight: 600;
  color: #495057;
}

.actions {
  display: flex;
  gap: 5px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

@media (max-width: 768px) {
  table {
    font-size: 12px;
  }
  
  th, td {
    padding: 8px;
  }
}
</style>
