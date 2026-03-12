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

### Bước 4: Setup AI Service (PHP Symfony)

```bash
cd ai-service
composer install
cp .env.example .env
```

Sửa file `.env` với Gemini API key của bạn:
```
GEMINI_API_KEY=your-gemini-api-key-here
```

Lấy Gemini API key miễn phí tại: https://makersuite.google.com/app/apikey

Chạy server:
```bash
php -S localhost:8000 -t public
```

AI Service sẽ chạy tại: http://localhost:8000

## Test AI Service với Postman

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

### 5. Test AI Service
```
POST http://localhost:8000/api/get-answer
Content-Type: application/json

{
  "question": "Cửa hàng mở cửa lúc mấy giờ?"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "question": "Cửa hàng mở cửa lúc mấy giờ?",
    "answer": "Chúng tôi mở cửa từ 8:00 đến 21:00 mỗi ngày kể cả cuối tuần.",
    "session_id": "session_xxx",
    "timestamp": "2024-01-01 10:00:00"
  }
}
```

## Các bước tiếp theo

- [x] Bước 1: Backend ExpressJS + MySQL ✅
- [x] Bước 2: Admin Frontend Vue.js ✅
- [x] Bước 3: AI Microservice (PHP Symfony + OpenAI) ✅
- [ ] Bước 4: Setup n8n Workflow
- [ ] Bước 5: Build Livechat Frontend

## Tech Stack

- Backend: Node.js + Express.js
- Database: MySQL 8.0
- Admin Frontend: Vue.js 3 + Vite
- AI Service: PHP 8.3 + Symfony + Google Gemini
- Workflow: n8n (coming soon)
