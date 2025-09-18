#!/bin/bash
# docker-build-and-push.sh

# Get current timestamp for unique tag
VERSION=$(date +%Y%m%d%H%M%S)
IMAGE_TAG="kboehlen/beacon-backend:$VERSION"

echo "🔨 Building image: $IMAGE_TAG"

# Build with unique tag
docker build --platform linux/amd64 -t $IMAGE_TAG ./backend --no-cache

# Also tag as latest
docker tag $IMAGE_TAG kboehlen/beacon-backend:latest

# Push both tags
docker push $IMAGE_TAG
docker push kboehlen/beacon-backend:latest

echo "📤 Pushed: $IMAGE_TAG"

# Write/update BEACON_IMAGE in .env.deploy
if grep -q "BEACON_IMAGE=" ./backend/.env.deploy; then
    # Update existing line
    sed -i.bak "s|BEACON_IMAGE=.*|BEACON_IMAGE=$IMAGE_TAG|" ./backend/.env.deploy
else
    # Add new line
    echo "BEACON_IMAGE=$IMAGE_TAG" >> ./backend/.env.deploy
fi

echo "✅ Updated .env.deploy with image: $IMAGE_TAG"