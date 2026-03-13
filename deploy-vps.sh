#!/bin/bash

# FAQ Chatbot VPS Auto Deploy Script
# Usage: bash deploy-vps.sh

set -e

echo "================================"
echo "FAQ Chatbot VPS Deployment"
echo "================================"
echo ""

# Get VPS IP
VPS_IP=$(curl -s ifconfig.me)
echo "VPS IP: $VPS_IP"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "[1/5] Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    apt install -y docker-compose
else
    echo "[1/5] Docker already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "[2/5] Creating .env file..."
    echo "Please enter your Gemini API Key:"
    read GEMINI_KEY
    cat > .env <<EOF
GEMINI_API_KEY=$GEMINI_KEY
EOF
else
    echo "[2/5] .env file already exists"
fi

# Update livechat webhook URL
echo "[3/5] Updating livechat configuration..."
sed -i "s|http://localhost:5678|http://$VPS_IP:5678|g" livechat/script.js

# Setup firewall
echo "[4/5] Configuring firewall..."
ufw allow 22
ufw allow 3000
ufw allow 5173
ufw allow 5678
ufw allow 8000
ufw allow 8080
ufw --force enable

# Start all services
echo "[5/5] Starting all services..."
docker-compose down 2>/dev/null || true
docker-compose up -d --build

# Wait for services to start
echo ""
echo "Waiting for services to start..."
sleep 10

# Check services
echo ""
echo "Checking services..."
docker-compose ps

echo ""
echo "================================"
echo "Deployment Complete!"
echo "================================"
echo ""
echo "Access your application:"
echo "  Backend API:      http://$VPS_IP:3000"
echo "  Admin Frontend:   http://$VPS_IP:5173"
echo "  n8n:              http://$VPS_IP:5678"
echo "  AI Service:       http://$VPS_IP:8000"
echo "  Livechat:         http://$VPS_IP:8080"
echo ""
echo "IMPORTANT: Setup n8n workflow (from your Windows browser):"
echo "  1. Open http://$VPS_IP:5678 in your browser"
echo "  2. Click 'Add workflow' button"
echo "  3. Click menu (3 dots) > Import from File"
echo "  4. Select n8n-workflow/workflow.json from your local machine"
echo "  5. Click 'Active' toggle to enable the workflow"
echo "  6. Verify in logs: docker logs n8n | grep 'Activated workflow'"
echo ""
echo "View logs: docker-compose logs -f"
echo "Restart: docker-compose restart"
echo "Stop: docker-compose down"
echo ""
