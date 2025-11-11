#!/bin/bash
# Validate commit message format before committing

set -e

COMMIT_MSG_FILE="$1"

if [ -z "$COMMIT_MSG_FILE" ]; then
  echo "Usage: validate-commit.sh <commit-msg-file>"
  exit 1
fi

# Read the commit message
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Validate using commitlint
echo "$COMMIT_MSG" | bun run commitlint --stdin

