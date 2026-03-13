// Configuration file for Livechat
// Update these values based on your setup

const CONFIG = {
  // n8n webhook URL
  N8N_WEBHOOK_URL: 'http://localhost:5678/webhook/chatbot-webhook',
  
  // Alternative: Direct AI Service (bypass n8n)
  // AI_SERVICE_URL: 'http://localhost:8000/api/get-answer',
  
  // Chat settings
  TYPING_DELAY: 500, // milliseconds
  AUTO_SCROLL: true,
  
  // UI settings
  THEME: 'light', // 'light' or 'dark'
  MAX_MESSAGE_LENGTH: 500,
  
  // Session settings
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
