# n8n Workflow Automation

This guide shows how to set up n8n as the integration layer between Livechat and AI Service.

## What is n8n?

n8n is a workflow automation tool that connects different services without code. In our system, it acts as the "glue" between:
- Livechat (Frontend) → n8n → AI Service → n8n → Livechat

## Installation Options

### Option 1: n8n Cloud (Easiest)

1. Sign up at: https://n8n.io/cloud
2. Free tier available (5,000 executions/month)
3. No installation needed
4. Access via web browser

### Option 2: Self-Hosted with Docker (Recommended)

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Access at: http://localhost:5678

### Option 3: Self-Hosted with npm

```bash
npm install n8n -g
n8n start
```

Access at: http://localhost:5678

## Workflow Setup Guide

### Step 1: Create New Workflow

1. Open n8n (http://localhost:5678)
2. Click "New Workflow"
3. Name it: "FAQ Chatbot Workflow"

### Step 2: Add Webhook Node (Trigger)

1. Click "+" to add node
2. Search for "Webhook"
3. Select "Webhook" node
4. Configure:
   - **HTTP Method**: POST
   - **Path**: `chatbot-webhook`
   - **Response Mode**: "When Last Node Finishes"
   - **Response Data**: "First Entry JSON"

5. Copy the webhook URL (e.g., `http://localhost:5678/webhook/chatbot-webhook`)

### Step 3: Add HTTP Request Node (Call AI Service)

1. Click "+" after Webhook node
2. Search for "HTTP Request"
3. Configure:
   - **Method**: POST
   - **URL**: `http://localhost:8000/api/get-answer`
   - **Authentication**: None
   - **Send Body**: Yes
   - **Body Content Type**: JSON
   - **Specify Body**: Using JSON
   - **JSON Body**:
   ```json
   {
     "question": "={{ $json.body.question }}",
     "session_id": "={{ $json.body.session_id }}"
   }
   ```

### Step 4: Add Response Node (Return to Livechat)

1. Click "+" after HTTP Request node
2. Search for "Respond to Webhook"
3. Configure:
   - **Response Code**: 200
   - **Response Body**: 
   ```json
   {
     "success": true,
     "answer": "={{ $json.data.answer }}",
     "session_id": "={{ $json.data.session_id }}"
   }
   ```

### Step 5: Activate Workflow

1. Click "Active" toggle in top right
2. Workflow is now live!

## Testing the Workflow

### Test with Postman

```bash
POST http://localhost:5678/webhook/chatbot-webhook
Content-Type: application/json

{
  "question": "What are your opening hours?",
  "session_id": "test-123"
}
```

Expected Response:
```json
{
  "success": true,
  "answer": "We're open from 8:00 AM to 9:00 PM every day including weekends.",
  "session_id": "test-123"
}
```

### Test with curl

```bash
curl -X POST http://localhost:5678/webhook/chatbot-webhook \
  -H "Content-Type: application/json" \
  -d '{"question":"What are your opening hours?"}'
```

## Workflow Diagram

```
┌─────────────┐
│  Livechat   │
│  (Frontend) │
└──────┬──────┘
       │ POST /webhook/chatbot-webhook
       │ { question: "..." }
       ▼
┌─────────────┐
│   Webhook   │ (n8n Trigger)
│    Node     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ HTTP Request│ POST http://localhost:8000/api/get-answer
│    Node     │ { question: "..." }
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ AI Service  │ (PHP Symfony + Gemini)
│  (Backend)  │
└──────┬──────┘
       │ { success: true, data: { answer: "..." } }
       ▼
┌─────────────┐
│  Respond to │
│   Webhook   │
└──────┬──────┘
       │ { success: true, answer: "..." }
       ▼
┌─────────────┐
│  Livechat   │
│  (Frontend) │
└─────────────┘
```

## Advanced Features

### Add Error Handling

1. Add "IF" node after HTTP Request
2. Check if `{{ $json.success }}` is true
3. Route errors to different response

### Add Logging

1. Add "Set" node to format data
2. Add "HTTP Request" to log service
3. Store conversation history

### Add Rate Limiting

1. Add "Function" node
2. Check request frequency
3. Return error if too many requests

## Environment Variables

Create `.env` file for n8n:

```
N8N_PORT=5678
N8N_PROTOCOL=http
N8N_HOST=localhost
WEBHOOK_URL=http://localhost:5678/
```

## Production Deployment

### Using Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your_password
    volumes:
      - ~/.n8n:/home/node/.n8n
```

Start:
```bash
docker-compose up -d
```

## Troubleshooting

### Webhook not receiving requests
- Check if n8n is running
- Verify webhook URL is correct
- Check firewall settings

### AI Service not responding
- Ensure AI Service is running on port 8000
- Check Gemini API key is valid
- Verify Backend API is accessible

### CORS errors
- Add CORS headers in Respond to Webhook node
- Or configure CORS in AI Service

## Next Steps

After n8n is working:
1. Build Livechat Frontend (Step 5)
2. Connect Livechat to n8n webhook
3. Test end-to-end flow
4. Add analytics and monitoring

## Resources

- n8n Documentation: https://docs.n8n.io
- n8n Community: https://community.n8n.io
- Workflow Templates: https://n8n.io/workflows
