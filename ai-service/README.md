# AI Microservice (PHP Symfony)

AI-powered service for processing user questions and generating intelligent responses based on FAQ data using Google Gemini API.

## Requirements

- PHP 8.2 or higher
- Composer
- Google Gemini API Key (free at https://makersuite.google.com/app/apikey)

## Installation

1. Install dependencies:
```bash
cd ai-service
composer install
```

2. Configure environment:
```bash
cp .env.example .env
```

Edit `.env`:
```
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-1.5-flash
BACKEND_API_URL=http://localhost:3000/api
```

3. Start development server:
```bash
php -S localhost:8000 -t public
```

Or using Symfony CLI:
```bash
symfony server:start
```

## Getting Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google Account
3. Click "Create API Key"
4. Copy key and paste into `.env` file

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
  "version": "1.0.0",
  "timestamp": "2024-01-01 10:00:00"
}
```

### Get AI Answer
```
POST http://localhost:8000/api/get-answer
Content-Type: application/json

{
  "question": "What are your opening hours?",
  "session_id": "optional-session-id"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "question": "What are your opening hours?",
    "answer": "We're open from 8:00 AM to 9:00 PM every day including weekends.",
    "session_id": "session_123",
    "timestamp": "2024-01-01 10:00:00"
  }
}
```

## Testing with Postman

1. Health check:
```
GET http://localhost:8000/
```

2. Ask a question:
```
POST http://localhost:8000/api/get-answer
Content-Type: application/json

{
  "question": "How much is a t-shirt?"
}
```

## Important Notes

- Ensure Backend API (ExpressJS) is running on port 3000
- Valid Gemini API key required (free tier available)
- Default model: gemini-1.5-flash (fast and free)
- Can switch to gemini-1.5-pro in `.env` for more detailed responses

## Gemini Advantages

- Free tier (60 requests/minute)
- No credit card required
- Excellent Vietnamese language support
- Fast and accurate responses
- Easy integration

## Project Structure

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

1. Receive question from client
2. Call Backend API to fetch all FAQs
3. Format FAQs as context for AI
4. Send request to Gemini with prompt + context
5. Return AI-generated answer to client

## Architecture

This microservice acts as the "brain" of the chatbot system:
- Decoupled from main backend
- Specialized AI processing
- Easy to scale independently
- Can switch AI providers without affecting other services

## Error Handling

The service includes comprehensive error handling:
- Invalid requests (400)
- Missing FAQs (503)
- Gemini API errors (500)
- Detailed error messages for debugging

## Configuration

### Available Models

- `gemini-1.5-flash` - Fast, free, recommended for most use cases
- `gemini-1.5-pro` - More powerful, detailed responses
- `gemini-pro` - Stable, general purpose

### Temperature Setting

Adjust in `GeminiService.php`:
- `0.0` - Deterministic, consistent answers
- `0.7` - Balanced (default)
- `1.0` - Creative, varied responses

## Low-Code Principles

This service demonstrates:
- Microservices architecture
- API-first design
- AI integration without complex ML setup
- Configuration over code
- Minimal business logic

## License

MIT License - Educational purposes
