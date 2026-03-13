<template>
  <div id="app">
    <header>
      <h1>Quản lý FAQ</h1>
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
  background: #fafafa;
  color: #1a1a1a;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

header {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 24px 32px;
  margin: -24px -24px 32px -24px;
}

header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

main {
  display: grid;
  gap: 24px;
}

.form-section, .table-section {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

h2 {
  color: #1a1a1a;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #525252;
  font-size: 14px;
  font-weight: 500;
}

input, textarea, select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d4d4d4;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  background: #ffffff;
  transition: all 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #1a1a1a;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #1a1a1a;
  color: white;
}

.btn-primary:hover {
  background: #000000;
}

.btn-secondary {
  background: #f5f5f5;
  color: #525252;
  border: 1px solid #d4d4d4;
}

.btn-secondary:hover {
  background: #e5e5e5;
}

.btn-edit {
  background: #f5f5f5;
  color: #525252;
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #d4d4d4;
}

.btn-edit:hover {
  background: #e5e5e5;
}

.btn-delete {
  background: #ffffff;
  color: #dc2626;
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #fecaca;
}

.btn-delete:hover {
  background: #fef2f2;
  border-color: #dc2626;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #fafafa;
  border-bottom: 1px solid #e5e5e5;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
}

th {
  font-weight: 600;
  color: #525252;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  color: #1a1a1a;
}

tbody tr:hover {
  background: #fafafa;
}

.actions {
  display: flex;
  gap: 6px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #a3a3a3;
  font-size: 14px;
}

@media (max-width: 768px) {
  #app {
    padding: 16px;
  }
  
  header {
    padding: 20px;
    margin: -16px -16px 24px -16px;
  }
  
  .form-section, .table-section {
    padding: 20px;
  }
  
  table {
    font-size: 13px;
  }
  
  th, td {
    padding: 10px 8px;
  }
}
</style>
