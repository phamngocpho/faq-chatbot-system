# FAQ Chatbot System

An intelligent FAQ chatbot system built with modern low-code/no-code principles, combining traditional backend services with AI automation.

## Project Structure

```
faq-chatbot/
├── backend/          # ExpressJS + MySQL API
├── admin-frontend/   # Vue.js Admin Panel
├── ai-service/       # PHP Symfony AI Service
├── livechat/         # Frontend Chat (coming soon)
└── database.sql      # SQL schema
```

## Architecture Overview

This project demonstrates a microservices architecture with:
- **Backend API** (ExpressJS) - Data management layer
- **Admin Panel** (Vue.js) - Content management interface
- **AI Service** (PHP Symfony) - AI processing microservice
- **Workflow Automation** (n8n) - Integration layer (coming soon)
- **Livechat** (Frontend) - User interface (coming soon)

## Installation Guide

### Step 1: Database Setup

1. Create MySQL database:
```bash
mysql -u root -p < database.sql
```

Or import `database.sql` via MySQL Workbench/phpMyAdmin.

### Step 2: Backend Setup (ExpressJS)

```bash
cd backend
npm install
cp .env.example .env
```

Configure `.env` with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=faq_chatbot
```

Start the server:
```bash
npm run dev
```

Backend runs at: http://localhost:3000

### Step 3: Admin Frontend Setup (Vue.js)

```bash
cd admin-frontend
npm install
npm run dev
```

Admin panel runs at: http://localhost:5173

### Step 4: AI Service Setup (PHP Symfony)

```bash
cd ai-service
composer install
cp .env.example .env
```

Configure `.env` with your Gemini API key:
```
GEMINI_API_KEY=your-gemini-api-key-here
```

Get free Gemini API key at: https://aistudio.google.com/api-keys

Start the server:
```bash
php -S localhost:8000 -t public
```

AI Service runs at: http://localhost:8000

## API Testing with Postman

### 1. Get all FAQs
```
GET http://localhost:3000/api/faqs
```

### 2. Create new FAQ
```
POST http://localhost:3000/api/faqs
Content-Type: application/json

{
  "category_id": 1,
  "question": "Do you offer delivery?",
  "answer": "Yes, we deliver nationwide.",
  "keywords": "delivery, ship, shipping"
}
```

### 3. Update FAQ
```
PUT http://localhost:3000/api/faqs/1
Content-Type: application/json

{
  "question": "What are your opening hours?",
  "answer": "We're open from 8:00 AM to 9:00 PM daily.",
  "category_id": 1,
  "keywords": "hours, open, time"
}
```

### 4. Delete FAQ
```
DELETE http://localhost:3000/api/faqs/1
```

### 5. Test AI Service
```
POST http://localhost:8000/api/get-answer
Content-Type: application/json

{
  "question": "What are your opening hours?"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "question": "What are your opening hours?",
    "answer": "We're open from 8:00 AM to 9:00 PM every day including weekends.",
    "session_id": "session_xxx",
    "timestamp": "2024-01-01 10:00:00"
  }
}
```

## Development Roadmap

- [x] Step 1: Backend ExpressJS + MySQL
- [x] Step 2: Admin Frontend Vue.js
- [x] Step 3: AI Microservice (PHP Symfony + Gemini)
- [ ] Step 4: n8n Workflow Automation
- [ ] Step 5: Livechat Frontend

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MySQL 8.0
- **Admin Frontend**: Vue.js 3 + Vite
- **AI Service**: PHP 8.2+ + Symfony + Google Gemini
- **Workflow**: n8n (coming soon)

## Low-Code/No-Code Principles

This project demonstrates:
- **Microservices Architecture** - Separation of concerns
- **API-First Design** - RESTful interfaces
- **AI Integration** - Google Gemini for intelligent responses
- **Workflow Automation** - n8n for orchestration (coming soon)
- **Minimal Code** - Leveraging frameworks and services

## Features

- CRUD operations for FAQ management
- Category-based organization
- AI-powered responses using Google Gemini
- Modern, minimal admin interface
- RESTful API architecture
- Session tracking
- Keyword-based search optimization

## Contributing

This is an educational project for the "Low Code, No Code & Automation" course.

## License

MIT License - Feel free to use for learning purposes.
