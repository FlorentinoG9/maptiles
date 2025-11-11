#!/bin/bash
# Single command to stage, add changeset (if needed), and commit

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Quick Save${NC}"
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo -e "${RED}❌ Not a git repository${NC}"
  exit 1
fi

# Check if there are any changes
if git diff --quiet && git diff --cached --quiet; then
  echo -e "${YELLOW}⚠️  No changes to commit${NC}"
  exit 0
fi

# Stage all changes
echo -e "${GREEN}📦 Staging changes...${NC}"
git add .

# Check if there are changesets already (excluding README.md)
if [ -d ".changeset" ]; then
  CHANGESET_COUNT=$(find .changeset -name "*.md" -type f ! -name "README.md" 2>/dev/null | wc -l | tr -d ' ')
else
  CHANGESET_COUNT=0
fi

# Ask if user wants to add a changeset
if [ "$CHANGESET_COUNT" -eq 0 ]; then
  echo ""
  echo -e "${YELLOW}📝 No changeset found. Do you want to add one? (y/n)${NC}"
  read -r response
  if [[ "$response" =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}➕ Adding changeset...${NC}"
    bun run changeset:add
  else
    echo -e "${YELLOW}⏭️  Skipping changeset${NC}"
  fi
else
  echo -e "${GREEN}✅ Changeset already exists${NC}"
fi

# Commit using Commitizen
echo ""
echo -e "${GREEN}💾 Committing changes...${NC}"
bun run commit

echo ""
echo -e "${GREEN}✅ Done!${NC}"
echo -e "${BLUE}💡 Tip: Run 'git push' to push your changes${NC}"

