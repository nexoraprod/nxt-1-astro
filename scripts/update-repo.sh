#!/bin/bash

# Repository Update Script
# Script untuk commit dan push semua perubahan ke GitHub

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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

info() {
    echo -e "${PURPLE}[$(date +'%Y-%m-%d %H:%M:%S')] ℹ️  $1${NC}"
}

echo ""
echo "=========================================="
echo "🔄 REPOSITORY UPDATE SCRIPT"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    error "Not a git repository. Please run this script from the repository root."
    exit 1
fi

# Check git status
log "🔍 Checking git status..."
echo ""
git status --short
echo ""

# Count changes
CHANGED_FILES=$(git status --short | wc -l)

if [ "$CHANGED_FILES" -eq 0 ]; then
    success "No changes to commit. Repository is up to date!"
    exit 0
fi

info "Found $CHANGED_FILES changed files"
echo ""

# Show summary of changes
log "📊 Summary of changes:"
echo ""
echo "Modified files:"
git status --short | grep "^ M" | wc -l | xargs echo "  - Modified:"
git status --short | grep "^??" | wc -l | xargs echo "  - New files:"
git status --short | grep "^ D" | wc -l | xargs echo "  - Deleted:"
echo ""

# Ask for confirmation
read -p "Do you want to commit all changes? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    warning "Update cancelled by user"
    exit 0
fi

echo ""

# Stage all changes
log "📦 Staging all changes..."
git add -A
success "All changes staged"
echo ""

# Ask for commit message
echo "Select commit message:"
echo "1) Update: Fix bugs, add monitoring, update docs"
echo "2) Update: Repository improvements and bug fixes"
echo "3) Update: Add observability and optimization features"
echo "4) Custom message"
echo ""
read -p "Select option (1-4): " MSG_CHOICE

case $MSG_CHOICE in
    1)
        COMMIT_MSG="Update: Fix bugs, add monitoring, update docs"
        ;;
    2)
        COMMIT_MSG="Update: Repository improvements and bug fixes"
        ;;
    3)
        COMMIT_MSG="Update: Add observability and optimization features"
        ;;
    4)
        read -p "Enter custom commit message: " COMMIT_MSG
        ;;
    *)
        COMMIT_MSG="Update repository"
        ;;
esac

echo ""
log "📝 Commit message: $COMMIT_MSG"
echo ""

# Commit changes
log "💾 Committing changes..."
git commit -m "$COMMIT_MSG"
success "Changes committed"
echo ""

# Check remote
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE_URL" ]; then
    warning "No remote configured"
    read -p "Enter GitHub repository URL: " REMOTE_URL
    git remote add origin "$REMOTE_URL"
    success "Remote added: $REMOTE_URL"
else
    success "Remote configured: $REMOTE_URL"
fi

echo ""

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
log "📍 Current branch: $CURRENT_BRANCH"
echo ""

# Pull latest changes (if any)
log "🔄 Pulling latest changes from remote..."
if git pull --rebase origin "$CURRENT_BRANCH" 2>&1; then
    success "Pull successful"
else
    warning "Pull failed or no remote branch yet"
    
    if git ls-remote origin "$CURRENT_BRANCH" | grep -q "$CURRENT_BRANCH"; then
        error "Pull failed. There might be conflicts."
        echo ""
        echo "Options:"
        echo "1) Force push (overwrite remote)"
        echo "2) Cancel and resolve manually"
        echo ""
        read -p "Select option (1-2): " PULL_CHOICE
        
        case $PULL_CHOICE in
            1)
                warning "⚠️  Force push will overwrite remote changes!"
                read -p "Are you sure? Type 'yes' to confirm: " CONFIRM_FORCE
                
                if [ "$CONFIRM_FORCE" = "yes" ]; then
                    git push --force origin "$CURRENT_BRANCH"
                    success "Force push completed"
                else
                    warning "Force push cancelled"
                    exit 0
                fi
                ;;
            2)
                warning "Operation cancelled. Please resolve conflicts manually."
                exit 0
                ;;
            *)
                error "Invalid option"
                ;;
        esac
    else
        info "Remote branch doesn't exist yet. Will create new branch."
    fi
fi

echo ""

# Push to remote
log "🚀 Pushing to GitHub..."

if git push -u origin "$CURRENT_BRANCH" 2>&1; then
    success "Push successful!"
    echo ""
    echo "=========================================="
    echo "🎉 UPDATE COMPLETE!"
    echo "=========================================="
    echo ""
    echo "📊 Summary:"
    echo "  - Files changed: $CHANGED_FILES"
    echo "  - Branch: $CURRENT_BRANCH"
    echo "  - Remote: $REMOTE_URL"
    echo ""
    echo "🔗 View your repository at:"
    echo "  ${REMOTE_URL%.git}"
    echo ""
    echo "📋 Next steps:"
    echo "  1. Check GitHub Actions: ${REMOTE_URL%.git}/actions"
    echo "  2. Configure secrets if needed (see GITHUB_ACTIONS_CONFIG.md)"
    echo "  3. Test deployment: ./scripts/quick-deploy.sh"
    echo ""
else
    error "Push failed!"
    echo ""
    echo "Possible solutions:"
    echo "1. Check your internet connection"
    echo "2. Verify GitHub credentials"
    echo "3. Check repository permissions"
    echo "4. Try: git push --force origin $CURRENT_BRANCH"
    echo ""
    exit 1
fi

# Show git log
log "📜 Recent commits:"
echo ""
git log --oneline -5
echo ""

success "🎉 Repository update completed successfully!"
echo ""
