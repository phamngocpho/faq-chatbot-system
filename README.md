# FAQ Chatbot System

Hệ thống chatbot AI để trả lời câu hỏi thường gặp (FAQ).

## Cấu trúc project

```
faq-chatbot/
├── backend/          # ExpressJS + MySQL API
├── admin-frontend/   # Vue.js Admin Panel
├── ai-service/       # PHP Symfony AI Service (sẽ làm tiếp)
├── livechat/         # Frontend Chat (sẽ làm tiếp)
└── database.sql      # SQL script
```

## Hướng dẫn cài đặt

### Bước 1: Setup Database

1. Tạo database MySQL:
```bash
mysql -u root -p < database.sql
```

Hoặc import file `database.sql` vào MySQL Workbench/phpMyAdmin.

### Bước 2: Setup Backend (ExpressJS)

```bash
cd backend
npm install
cp .env.example .env
```

Sửa file `.env` với thông tin database của bạn:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=faq_chatbot
```

Chạy server:
```bash
npm run dev
```

Backend sẽ chạy tại: http://localhost:3000

### Bước 3: Setup Admin Frontend (Vue.js)

```bash
cd admin-frontend
npm install
npm run dev
```

Admin panel sẽ chạy tại: http://localhost:5173

## Test API với Postman

### 1. Lấy danh sách FAQs
```
GET http://localhost:3000/api/faqs
```

### 2. Tạo FAQ mới
```
POST http://localhost:3000/api/faqs
Content-Type: application/json

{
  "category_id": 1,
  "question": "Có giao hàng tận nơi không?",
  "answer": "Có, chúng tôi giao hàng toàn quốc.",
  "keywords": "giao hàng, ship, delivery"
}
```

### 3. Cập nhật FAQ
```
PUT http://localhost:3000/api/faqs/1
Content-Type: application/json

{
  "question": "Cửa hàng mở cửa lúc mấy giờ?",
  "answer": "Chúng tôi mở cửa từ 8:00 đến 22:00 mỗi ngày.",
  "category_id": 1,
  "keywords": "giờ mở cửa, open"
}
```

### 4. Xóa FAQ
```
DELETE http://localhost:3000/api/faqs/1
```

## Các bước tiếp theo

- [ ] Bước 3: Build AI Microservice (PHP Symfony + OpenAI)
- [ ] Bước 4: Setup n8n Workflow
- [ ] Bước 5: Build Livechat Frontend

## Tech Stack

- Backend: Node.js + Express.js
- Database: MySQL 8.0
- Admin Frontend: Vue.js 3 + Vite
- AI Service: PHP 8.3 + Symfony (coming soon)
- Workflow: n8n (coming soon)
