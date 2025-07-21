#!/bin/bash

# Configuration
BACKEND_REPO_URL="${BACKEND_REPO_URL:-https://github.com/your-org/backend-repo.git}"
TEMP_DIR="./temp-backend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 Starting frontend version sync...${NC}"

# Extract version from package.json
VERSION=$(node -p "require('./package.json').version")
MAJOR_VERSION=$(echo $VERSION | cut -d. -f1)

echo -e "${BLUE}📦 Frontend version: ${VERSION}${NC}"
echo -e "${BLUE}🔢 Major version: ${MAJOR_VERSION}${NC}"

# Clean up any existing temp directory
if [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
fi

# Clone backend repository
echo -e "${BLUE}📥 Cloning backend repository...${NC}"
git clone "$BACKEND_REPO_URL" "$TEMP_DIR"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to clone backend repository${NC}"
    exit 1
fi

# Navigate to backend directory
cd "$TEMP_DIR"

# Create or update version file
echo "FRONTEND_MAJOR_VERSION=$MAJOR_VERSION" > .env.frontend-version
echo "FRONTEND_FULL_VERSION=$VERSION" >> .env.frontend-version
echo "LAST_UPDATED=$(date -u +%Y-%m-%dT%H:%M:%SZ)" >> .env.frontend-version

# Configure git
git config user.name "Frontend Version Sync"
git config user.email "noreply@yourcompany.com"

# Add and commit changes
git add .env.frontend-version

if git diff --staged --quiet; then
    echo -e "${BLUE}ℹ️  No version changes to commit${NC}"
else
    git commit -m "chore: update frontend version to $VERSION (major: $MAJOR_VERSION)"
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Version successfully synced to backend repository${NC}"
    else
        echo -e "${RED}❌ Failed to push changes to backend repository${NC}"
        cd ..
        rm -rf "$TEMP_DIR"
        exit 1
    fi
fi

# Cleanup
cd ..
rm -rf "$TEMP_DIR"

echo -e "${GREEN}🎉 Frontend version sync completed!${NC}"