# FAQ Backend API

ExpressJS REST API for FAQ management with MySQL database.

## Installation

1. Copy environment file:
```bash
cp .env.example .env
```

2. Configure database in `.env`:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=faq_chatbot
DB_PORT=3306
```

3. Install dependencies:
```bash
npm install
```

4. Create database using the SQL script in project root

5. Start server:
```bash
npm run dev
```

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### FAQs
- `GET /api/faqs` - Get all FAQs
- `GET /api/faqs/:id` - Get FAQ by ID
- `POST /api/faqs` - Create new FAQ
- `PUT /api/faqs/:id` - Update FAQ
- `DELETE /api/faqs/:id` - Delete FAQ

## Testing with Postman

### Create new FAQ:
```json
POST http://localhost:3000/api/faqs
Content-Type: application/json

{
  "category_id": 1,
  "question": "What are your opening hours?",
  "answer": "We're open from 8:00 AM to 9:00 PM daily.",
  "keywords": "hours, open, time"
}
```

### Get all FAQs:
```
GET http://localhost:3000/api/faqs
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category_id": 1,
      "category_name": "Hours & Location",
      "question": "What are your opening hours?",
      "answer": "We're open from 8:00 AM to 9:00 PM daily.",
      "keywords": "hours, open, time",
      "is_active": 1,
      "created_at": "2024-01-01 10:00:00"
    }
  ]
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js       # MySQL connection
├── controllers/
│   ├── faqController.js  # FAQ business logic
│   └── categoryController.js
├── routes/
│   ├── faqRoutes.js      # FAQ endpoints
│   └── categoryRoutes.js
├── server.js             # Entry point
├── package.json
└── .env                  # Configuration
```

## Features

- RESTful API design
- MySQL database integration
- CORS enabled for frontend access
- Environment-based configuration
- Error handling
- Input validation

## Tech Stack

- Node.js 18+
- Express.js 4.x
- MySQL2 (Promise-based)
- dotenv for configuration
- body-parser for JSON parsing
- CORS middleware
