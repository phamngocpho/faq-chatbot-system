// Configuration
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/chatbot-webhook';
const SESSION_ID = generateSessionId();

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Generate unique session ID
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get current time
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

// Add message to chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  
  messageDiv.innerHTML = `
    <div class="message-content">${content}</div>
    <div class="message-time">${getCurrentTime()}</div>
  `;
  
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Add typing indicator
function addTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot-message';
  typingDiv.id = 'typingIndicator';
  
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Scroll to bottom
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to n8n webhook
async function sendMessage(question) {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
        session_id: SESSION_ID
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.answer) {
      return data.answer;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const question = messageInput.value.trim();
  if (!question) return;
  
  // Add user message
  addMessage(question, true);
  messageInput.value = '';
  
  // Disable input while processing
  messageInput.disabled = true;
  sendButton.disabled = true;
  
  // Show typing indicator
  addTypingIndicator();
  
  try {
    // Send to n8n webhook
    const answer = await sendMessage(question);
    
    // Remove typing indicator
    removeTypingIndicator();
    
    // Add bot response
    addMessage(answer, false);
  } catch (error) {
    // Remove typing indicator
    removeTypingIndicator();
    
    // Show error message
    addMessage(
      'Sorry, I encountered an error. Please make sure the chatbot service is running and try again.',
      false
    );
  } finally {
    // Re-enable input
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.focus();
  }
});

// Focus input on load
messageInput.focus();

// Handle Enter key
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event('submit'));
  }
});
