# n8n Quick Start Guide

## Fastest Way to Get Started

### 1. Install n8n with Docker (Recommended)

```bash
cd n8n-workflow
docker-compose up -d
```

Wait 10 seconds, then open: http://localhost:5678

### 2. Create Account

- First time: Create admin account
- Username: admin
- Password: (your choice)

### 3. Import Workflow

1. Click "Workflows" in sidebar
2. Click "Import from File"
3. Select `workflow.json` from this folder
4. Click "Import"

### 4. Configure Workflow

The workflow has 3 nodes:

**Node 1: Webhook (Trigger)**
- Already configured
- Webhook URL: `http://localhost:5678/webhook/chatbot-webhook`

**Node 2: Call AI Service**
- Check URL is correct: `http://localhost:8000/api/get-answer`
- If AI Service runs on different port, update here

**Node 3: Respond to Webhook**
- Already configured
- Returns answer to caller

### 5. Activate Workflow

1. Click "Active" toggle (top right)
2. Should turn green
3. Workflow is now live!

### 6. Test It!

Open Postman and send:

```
POST http://localhost:5678/webhook/chatbot-webhook
Content-Type: application/json

{
  "question": "What are your opening hours?"
}
```

You should get:
```json
{
  "success": true,
  "answer": "We're open from 8:00 AM to 9:00 PM every day including weekends.",
  "session_id": "session_xxx",
  "timestamp": "2024-01-01 10:00:00"
}
```

## Troubleshooting

### n8n won't start
```bash
docker-compose down
docker-compose up -d
docker-compose logs -f
```

### Webhook not working
1. Check workflow is "Active" (green toggle)
2. Verify AI Service is running: `http://localhost:8000/`
3. Check Backend API is running: `http://localhost:3000/api/faqs`

### Can't import workflow
1. Download `workflow.json` from this folder
2. In n8n: Workflows → Import from File
3. Select the file
4. Click Import

## What's Next?

After n8n is working:
1. Test webhook with Postman
2. Verify AI responses are correct
3. Build Livechat Frontend (Step 5)
4. Connect Livechat to n8n webhook

## Visual Guide

```
Your Request → n8n Webhook → AI Service → n8n Response → Your App
     ↓              ↓              ↓            ↓            ↓
  Question      Receives       Processes    Formats      Returns
               & Routes        with AI      Response     Answer
```

## Need Help?

- Check n8n logs: `docker-compose logs -f`
- Visit n8n docs: https://docs.n8n.io
- Check our main README.md for full system overview
