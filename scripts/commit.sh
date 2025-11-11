#!/bin/bash
# Helper script for easier commits using commitizen

# Check if there are staged changes
if ! git diff --cached --quiet; then
  # Use commitizen for interactive commit
  bun run commit
else
  echo "No staged changes found. Please stage your changes first with 'git add'"
  exit 1
fi

