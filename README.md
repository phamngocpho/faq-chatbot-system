# FAQ Chatbot System

An intelligent FAQ chatbot system built with modern low-code/no-code principles, combining traditional backend services with AI automation.

## Project Structure

```
faq-chatbot/
├── backend/          # ExpressJS + MySQL API
├── admin-frontend/   # Vue.js Admin Panel
├── ai-service/       # PHP Symfony AI Service
├── livechat/         # Frontend Chat Interface
├── n8n-workflow/     # n8n Workflow Configuration
├── database.sql      # SQL schema
└── docker-compose.yml # Docker orchestration
```

## Architecture Overview

This project demonstrates a microservices architecture with:
- **Backend API** (ExpressJS) - Data management layer
- **Admin Panel** (Vue.js) - Content management interface
- **AI Service** (PHP Symfony) - AI processing with Google Gemini
- **Workflow Automation** (n8n) - Integration and orchestration layer
- **Livechat** (Frontend) - User chat interface

## Quick Start with Docker (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Gemini API key (get free at https://aistudio.google.com/api-keys)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd faq-chatbot-system
```

2. Create `.env` file:
```bash
echo "GEMINI_API_KEY=your-api-key-here" > .env
```

3. Start all services:
```bash
docker-compose up -d
```

4. Wait for services to start (30 seconds), then access:
- **Backend API**: http://localhost:3000
- **Admin Frontend**: http://localhost:5173
- **n8n**: http://localhost:5678
- **AI Service**: http://localhost:8000
- **Livechat**: http://localhost:8080

### Setup n8n Workflow

After starting services, you need to import and activate the workflow:

1. Open http://localhost:5678 in your browser
2. Click "Add workflow" button
3. Click menu (3 dots) > "Import from File"
4. Select `n8n-workflow/workflow.json`
5. Click "Active" toggle to enable the workflow
6. Verify: `docker logs n8n | grep "Activated workflow"`

Now your chatbot is ready to use!

## VPS Deployment (Ubuntu)

For one-command deployment to Ubuntu VPS:

```bash
bash deploy-vps.sh
```

The script will:
- Auto-install Docker if needed
- Configure firewall
- Update URLs with your VPS IP
- Start all services

After deployment, access n8n from your local browser at `http://YOUR_VPS_IP:5678` to import and activate the workflow.

## Manual Installation (Without Docker)

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

### Step 5: Livechat Setup

```bash
cd livechat
python -m http.server 8080
```

Livechat runs at: http://localhost:8080

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
  "question": "What are your opening hours?",
  "session_id": "test-session"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "question": "What are your opening hours?",
    "answer": "We're open from 8:00 AM to 9:00 PM every day including weekends.",
    "session_id": "test-session",
    "timestamp": "2024-01-01 10:00:00"
  }
}
```

### 6. Test via n8n Webhook
```
POST http://localhost:5678/webhook/chatbot-webhook
Content-Type: application/json

{
  "question": "What are your opening hours?",
  "session_id": "test-session"
}
```

## Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker logs faq-backend
docker logs faq-ai-service
docker logs n8n

# Restart services
docker-compose restart

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## Troubleshooting

### n8n webhook not working
- Make sure workflow is imported and activated in n8n UI
- Check logs: `docker logs n8n | grep "Activated workflow"`
- Verify webhook URL in livechat/config.js

### AI Service error
- Verify GEMINI_API_KEY in .env file
- Check logs: `docker logs faq-ai-service`
- Test directly: `curl http://localhost:8000/`

### Admin Frontend not loading
- Check if backend is running: `curl http://localhost:3000/api/faqs`
- Verify VITE_API_URL in docker-compose.yml

## Development Roadmap

- [x] Step 1: Backend ExpressJS + MySQL
- [x] Step 2: Admin Frontend Vue.js
- [x] Step 3: AI Microservice (PHP Symfony + Gemini)
- [x] Step 4: n8n Workflow Automation
- [x] Step 5: Livechat Frontend
- [x] Docker Compose Integration
- [x] VPS Deployment Automation

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MySQL 8.0 (Docker)
- **Admin Frontend**: Vue.js 3 + Vite
- **AI Service**: PHP 8.2+ + Symfony + Google Gemini (gemini-2.5-flash)
- **Workflow**: n8n (Docker)
- **Livechat**: Vanilla JavaScript
- **Deployment**: Docker Compose

## Low-Code/No-Code Principles

This project demonstrates:
- **Microservices Architecture** - Separation of concerns
- **API-First Design** - RESTful interfaces
- **AI Integration** - Google Gemini for intelligent responses
- **Workflow Automation** - n8n for orchestration
- **Minimal Code** - Leveraging frameworks and services
- **Containerization** - Docker for easy deployment

## Features

- CRUD operations for FAQ management
- Category-based organization
- AI-powered responses using Google Gemini 2.5 Flash
- Modern, minimal admin interface
- RESTful API architecture
- Session tracking
- Keyword-based search optimization
- Docker containerization
- One-command VPS deployment
- Automated workflow with n8n
- Real-time chat interface

## Contributing

This is an educational project for the "Low Code, No Code & Automation" course.

## License

MIT License - Feel free to use for learning purposes.
