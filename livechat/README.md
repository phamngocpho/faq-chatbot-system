# Livechat Frontend

Simple, modern chat interface for end users to interact with the FAQ chatbot.

## Features

- Clean, minimal design
- Real-time messaging
- Typing indicators
- Session management
- Mobile responsive
- Smooth animations
- Auto-scroll to latest message

## Installation

No installation required! This is a static HTML/CSS/JS application.

## Usage

### Option 1: Open directly in browser

```bash
cd livechat
# Open index.html in your browser
```

Or double-click `index.html`

### Option 2: Use a local server (Recommended)

```bash
cd livechat

# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then open: http://localhost:8080

## Configuration

Edit `script.js` to change the n8n webhook URL:

```javascript
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/chatbot-webhook';
```

If you want to bypass n8n and call AI Service directly:

```javascript
const AI_SERVICE_URL = 'http://localhost:8000/api/get-answer';
```

## Testing

1. Ensure all services are running:
   - Backend API: http://localhost:3000
   - AI Service: http://localhost:8000
   - n8n: http://localhost:5678

2. Open livechat in browser

3. Type a question and press Enter

4. You should see:
   - Your message appears immediately
   - Typing indicator shows
   - Bot response appears after ~1-2 seconds

## Project Structure

```
livechat/
├── index.html       # Main HTML structure
├── style.css        # Styling and animations
├── script.js        # Chat logic and API calls
├── config.js        # Configuration (optional)
└── README.md        # This file
```

## Customization

### Change Colors

Edit `style.css`:

```css
/* User message background */
.user-message .message-content {
  background: #1a1a1a; /* Change this */
}

/* Bot message background */
.bot-message .message-content {
  background: #f5f5f5; /* Change this */
}
```

### Change Welcome Message

Edit `index.html`:

```html
<div class="message bot-message">
  <div class="message-content">
    Your custom welcome message here
  </div>
</div>
```

### Add Dark Mode

Add to `style.css`:

```css
body.dark-mode {
  background: #1a1a1a;
}

body.dark-mode .chat-container {
  background: #262626;
  border-color: #404040;
}
```

## API Integration

The chat sends requests to n8n webhook:

```javascript
POST http://localhost:5678/webhook/chatbot-webhook
Content-Type: application/json

{
  "question": "What are your opening hours?",
  "session_id": "session_123456"
}
```

Expected response:

```json
{
  "success": true,
  "answer": "We're open from 8:00 AM to 9:00 PM daily.",
  "session_id": "session_123456"
}
```

## Troubleshooting

### CORS Error

If you see CORS errors in console:

1. Use a local server (not file://)
2. Or add CORS headers in n8n webhook response

### Messages not sending

1. Check n8n is running: http://localhost:5678
2. Check workflow is active (green toggle)
3. Check browser console for errors
4. Verify webhook URL in `script.js`

### Styling issues

1. Clear browser cache (Ctrl+F5)
2. Check CSS file is loaded
3. Inspect element in browser DevTools

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Performance

- Lightweight: ~10KB total
- No external dependencies
- Fast load time
- Smooth animations

## Security Notes

For production:
- Use HTTPS for all API calls
- Implement rate limiting
- Sanitize user input
- Add authentication if needed

## Next Steps

- Add message history persistence
- Add file upload support
- Add emoji picker
- Add voice input
- Add multi-language support

## Tech Stack

- Pure HTML5
- Pure CSS3
- Vanilla JavaScript (ES6+)
- No frameworks or libraries

## License

MIT License - Educational purposes
