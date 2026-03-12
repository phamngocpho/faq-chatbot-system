# FAQ Backend API

## Cài đặt

1. Copy file `.env.example` thành `.env` và cấu hình database:
```bash
cp .env.example .env
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo database MySQL bằng script SQL đã cung cấp

4. Chạy server:
```bash
npm run dev
```

## API Endpoints

### Categories
- `GET /api/categories` - Lấy danh sách categories
- `POST /api/categories` - Tạo category mới

### FAQs
- `GET /api/faqs` - Lấy tất cả FAQs
- `GET /api/faqs/:id` - Lấy FAQ theo ID
- `POST /api/faqs` - Tạo FAQ mới
- `PUT /api/faqs/:id` - Cập nhật FAQ
- `DELETE /api/faqs/:id` - Xóa FAQ

## Test với Postman

### Tạo FAQ mới:
```json
POST http://localhost:3000/api/faqs
{
  "category_id": 1,
  "question": "Cửa hàng mở cửa lúc mấy giờ?",
  "answer": "Chúng tôi mở cửa từ 8:00 đến 21:00 mỗi ngày.",
  "keywords": "giờ mở cửa, open"
}
```
