#!/usr/bin/env bash
set -e

echo "🚀 HMS Deployment Started"

if ! command -v docker >/dev/null 2>&1; then
  echo "❌ Docker is not installed"
  exit 1
fi

if [ -f docker-compose.yml ]; then
  echo "📦 Starting Docker services"
  docker compose pull
  docker compose up -d
else
  echo "⚠️ docker-compose.yml not found – nothing to deploy"
fi

echo "✅ Deployment completed successfully"
