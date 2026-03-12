# AI Microservice (PHP 8.3 + Symfony)

AI service để xử lý câu hỏi của người dùng và trả lời dựa trên dữ liệu FAQ thông qua Google Gemini API.

## Yêu cầu

- PHP 8.3 hoặc cao hơn
- Composer
- Google Gemini API Key (miễn phí tại https://aistudio.google.com/api-keys)

## Cài đặt

1. Cài đặt dependencies:
```bash
cd ai-service
composer install
```

2. Cấu hình environment:
```bash
cp .env.example .env
```

Sửa file `.env`:
```
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-2.5-flash
BACKEND_API_URL=http://localhost:3000/api
```

3. Chạy server (development):
```bash
php -S localhost:8000 -t public
```

Hoặc dùng Symfony CLI:
```bash
symfony server:start
```

## Lấy Gemini API Key

1. Truy cập: https://aistudio.google.com/api-keys
2. Đăng nhập bằng Google Account
3. Click "Create API Key"
4. Copy key và paste vào file `.env`

## API Endpoints

### Health Check
```
GET http://localhost:8000/
```

Response:
```json
{
  "status": "ok",
  "service": "FAQ AI Microservice",
  "ai_provider": "Google Gemini",
  "version": "1.0.0"
}
```

### Get Answer
```
POST http://localhost:8000/api/get-answer
Content-Type: application/json

{
  "question": "Cửa hàng mở cửa lúc mấy giờ?",
  "session_id": "optional-session-id"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "question": "Cửa hàng mở cửa lúc mấy giờ?",
    "answer": "Chúng tôi mở cửa từ 8:00 đến 21:00 mỗi ngày kể cả cuối tuần.",
    "session_id": "session_123",
    "timestamp": "2024-01-01 10:00:00"
  }
}
```

## Test với Postman

1. Health check:
```
GET http://localhost:8000/
```

2. Gửi câu hỏi:
```
POST http://localhost:8000/api/get-answer
Content-Type: application/json

{
  "question": "Giá áo thun bao nhiêu?"
}
```

## Lưu ý

- Đảm bảo Backend API (ExpressJS) đang chạy ở port 3000
- Cần có Gemini API key hợp lệ (miễn phí)
- Model mặc định: gemini-2.5-flash (nhanh và miễn phí)
- Có thể đổi sang gemini-2.5-pro trong file .env (mạnh hơn)

## Ưu điểm Gemini

- Miễn phí (5 requests/phút)
- Hỗ trợ tiếng Việt tốt
- Nhanh và chính xác
- Không cần thẻ tín dụng

## Cấu trúc

```
ai-service/
├── config/
│   ├── packages/
│   │   └── framework.yaml
│   ├── routes.yaml
│   └── services.yaml
├── public/
│   └── index.php
├── src/
│   ├── Controller/
│   │   └── AiController.php
│   ├── Service/
│   │   ├── FaqService.php
│   │   └── GeminiService.php
│   └── Kernel.php
├── .env
├── .env.example
└── composer.json
```

## Workflow

1. Nhận câu hỏi từ client
2. Gọi API Backend để lấy toàn bộ FAQs
3. Format FAQs thành context cho AI
4. Gửi request tới Gemini với prompt + context
5. Trả về câu trả lời cho client
