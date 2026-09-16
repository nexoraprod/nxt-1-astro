#!/bin/bash

# GitHub Conflict Resolver & Publisher
# Script untuk resolve konflik dan push ke GitHub

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

echo ""
echo "=========================================="
echo "🔧 GITHUB CONFLICT RESOLVER"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    error "Git is not installed. Please install Git first."
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    warning "Not a git repository. Initializing..."
    git init
    git branch -M main
fi

# Check remote
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE_URL" ]; then
    log "🔗 No remote configured. Setting up..."
    echo ""
    read -p "Enter GitHub repository URL (e.g., https://github.com/1astro/nxt-1-astro.git): " repo_url
    
    if [ -z "$repo_url" ]; then
        error "Repository URL is required"
    fi
    
    git remote add origin "$repo_url"
    success "Remote added: $repo_url"
else
    success "Remote configured: $REMOTE_URL"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
log "📍 Current branch: $CURRENT_BRANCH"

# Check git status
log "🔍 Checking git status..."
git status --short

# Check for conflicts
if git ls-files -u | grep -q "^"; then
    warning "⚠️  Conflicts detected!"
    echo ""
    echo "Conflicted files:"
    git ls-files -u | awk '{print $4}' | sort -u
    echo ""
    echo "Please resolve conflicts manually, then run this script again."
    echo ""
    echo "Or use: git mergetool"
    exit 1
fi

# Check if there are uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    warning "⚠️  Uncommitted changes detected"
    echo ""
    read -p "Do you want to commit all changes? (y/n): " commit_choice
    
    if [ "$commit_choice" = "y" ] || [ "$commit_choice" = "Y" ]; then
        log "📝 Staging all changes..."
        git add -A
        
        echo ""
        read -p "Enter commit message (or press Enter for default): " commit_msg
        
        if [ -z "$commit_msg" ]; then
            commit_msg="Update: $(date +'%Y-%m-%d %H:%M') - Auto commit"
        fi
        
        git commit -m "$commit_msg"
        success "Changes committed"
    else
        warning "Skipping commit. Please commit manually before pushing."
        exit 0
    fi
fi

# Check if remote branch exists
log "🔍 Checking remote branch..."
if git ls-remote --heads origin "$CURRENT_BRANCH" | grep -q "$CURRENT_BRANCH"; then
    log "Remote branch exists. Pulling changes..."
    
    # Try to pull with rebase
    if git pull --rebase origin "$CURRENT_BRANCH"; then
        success "Successfully pulled and rebased"
    else
        warning "⚠️  Pull failed. There might be conflicts."
        echo ""
        echo "Options:"
        echo "1) Abort rebase and try merge"
        echo "2) Force push (⚠️  WARNING: This will overwrite remote)"
        echo "3) Cancel and resolve manually"
        echo ""
        read -p "Select option (1-3): " pull_choice
        
        case $pull_choice in
            1)
                git rebase --abort
                log "Attempting merge..."
                git pull origin "$CURRENT_BRANCH" --no-rebase
                ;;
            2)
                warning "⚠️  Force push will overwrite remote changes!"
                read -p "Are you sure? Type 'yes' to confirm: " confirm
                
                if [ "$confirm" = "yes" ]; then
                    git push --force origin "$CURRENT_BRANCH"
                    success "Force push completed"
                else
                    warning "Force push cancelled"
                    exit 0
                fi
                ;;
            3)
                warning "Operation cancelled. Please resolve conflicts manually."
                exit 0
                ;;
            *)
                error "Invalid option"
                ;;
        esac
    fi
else
    log "Remote branch doesn't exist. Will create new branch."
fi

# Push to remote
log "🚀 Pushing to GitHub..."

if git push -u origin "$CURRENT_BRANCH"; then
    success "Successfully pushed to GitHub!"
    echo ""
    echo "=========================================="
    echo "🎉 PUSH SUCCESSFUL!"
    echo "=========================================="
    echo ""
    echo "📍 Branch: $CURRENT_BRANCH"
    echo "🔗 Remote: $REMOTE_URL"
    echo ""
    echo "View your repository at:"
    echo "${REMOTE_URL%.git}"
    echo ""
else
    error "Push failed!"
    echo ""
    echo "Possible solutions:"
    echo "1) Check your internet connection"
    echo "2) Verify GitHub credentials: git config credential.helper"
    echo "3) Check repository permissions"
    echo "4) Try: git push --force origin $CURRENT_BRANCH"
    echo ""
    exit 1
fi

# Verify push
log "🔍 Verifying push..."
if git status | grep -q "Your branch is up to date"; then
    success "✅ Repository is up to date with remote"
else
    warning "⚠️  Repository might not be fully synced"
fi

echo ""
success "🎉 GitHub publishing completed successfully!"
echo ""
