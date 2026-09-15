#!/bin/bash

# GitHub API Validator & Fixer
# Script untuk diagnose dan fix error "GitHub API validation"

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
echo "🔧 GITHUB API VALIDATION FIXER"
echo "=========================================="
echo ""

# Step 1: Check Git Configuration
log "🔍 Step 1: Checking Git configuration..."
echo ""

GIT_USER=$(git config user.name 2>/dev/null || echo "")
GIT_EMAIL=$(git config user.email 2>/dev/null || echo "")

if [ -z "$GIT_USER" ]; then
    warning "Git user.name not set"
    read -p "Enter your GitHub username: " GIT_USER
    git config --global user.name "$GIT_USER"
else
    success "Git user.name: $GIT_USER"
fi

if [ -z "$GIT_EMAIL" ]; then
    warning "Git user.email not set"
    read -p "Enter your GitHub email: " GIT_EMAIL
    git config --global user.email "$GIT_EMAIL"
else
    success "Git user.email: $GIT_EMAIL"
fi

echo ""

# Step 2: Check Remote URL
log "🔍 Step 2: Checking remote URL..."
echo ""

REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE_URL" ]; then
    error "No remote 'origin' configured"
    echo ""
    read -p "Enter repository URL (https://github.com/username/repo.git): " NEW_URL
    git remote add origin "$NEW_URL"
    REMOTE_URL="$NEW_URL"
    success "Remote added: $REMOTE_URL"
else
    success "Remote URL: $REMOTE_URL"
    
    # Validate URL format
    if [[ ! "$REMOTE_URL" =~ ^https://github\.com/[^/]+/[^/]+\.git$ ]] && \
       [[ ! "$REMOTE_URL" =~ ^git@github\.com:[^/]+/[^/]+\.git$ ]]; then
        warning "Remote URL format might be incorrect"
        echo ""
        echo "Expected format:"
        echo "  HTTPS: https://github.com/username/repo.git"
        echo "  SSH:   git@github.com:username/repo.git"
        echo ""
        read -p "Do you want to update the URL? (y/n): " UPDATE_URL
        
        if [ "$UPDATE_URL" = "y" ] || [ "$UPDATE_URL" = "Y" ]; then
            read -p "Enter correct URL: " NEW_URL
            git remote set-url origin "$NEW_URL"
            success "Remote URL updated: $NEW_URL"
        fi
    fi
fi

echo ""

# Step 3: Test GitHub Connection
log "🔍 Step 3: Testing GitHub connection..."
echo ""

# Extract username and repo from URL
if [[ "$REMOTE_URL" =~ ^https://github\.com/([^/]+)/([^/]+)\.git$ ]]; then
    GITHUB_USER="${BASH_REMATCH[1]}"
    GITHUB_REPO="${BASH_REMATCH[2]}"
elif [[ "$REMOTE_URL" =~ ^git@github\.com:([^/]+)/([^/]+)\.git$ ]]; then
    GITHUB_USER="${BASH_REMATCH[1]}"
    GITHUB_REPO="${BASH_REMATCH[2]}"
else
    error "Could not parse GitHub username and repo from URL"
    exit 1
fi

success "GitHub User: $GITHUB_USER"
success "GitHub Repo: $GITHUB_REPO"

echo ""
log "Testing SSH connection..."
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    success "SSH connection: OK"
    SSH_OK=true
else
    warning "SSH connection failed or not configured"
    SSH_OK=false
fi

echo ""
log "Testing HTTPS connection..."
if curl -s -o /dev/null -w "%{http_code}" "https://api.github.com/repos/$GITHUB_USER/$GITHUB_REPO" | grep -q "200"; then
    success "HTTPS connection: OK (repository exists)"
    HTTPS_OK=true
elif curl -s -o /dev/null -w "%{http_code}" "https://api.github.com/repos/$GITHUB_USER/$GITHUB_REPO" | grep -q "404"; then
    warning "Repository not found on GitHub"
    echo ""
    echo "Please create the repository first:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: $GITHUB_REPO"
    echo "3. DO NOT initialize with README"
    echo "4. Click 'Create repository'"
    echo ""
    read -p "Have you created the repository? (y/n): " CREATED
    
    if [ "$CREATED" != "y" ] && [ "$CREATED" != "Y" ]; then
        error "Please create the repository first"
        exit 1
    fi
    HTTPS_OK=true
else
    warning "HTTPS connection test inconclusive"
    HTTPS_OK=false
fi

echo ""

# Step 4: Check Authentication
log "🔍 Step 4: Checking authentication..."
echo ""

if [ "$SSH_OK" = true ]; then
    success "Using SSH authentication"
    AUTH_METHOD="ssh"
else
    warning "SSH not configured, using HTTPS"
    AUTH_METHOD="https"
    
    echo ""
    echo "For HTTPS authentication, you need a Personal Access Token:"
    echo ""
    echo "1. Go to: https://github.com/settings/tokens"
    echo "2. Click 'Generate new token (classic)'"
    echo "3. Select scopes: repo, workflow (if needed)"
    echo "4. Copy the token"
    echo ""
    read -p "Do you have a Personal Access Token? (y/n): " HAS_TOKEN
    
    if [ "$HAS_TOKEN" = "y" ] || [ "$HAS_TOKEN" = "Y" ]; then
        read -sp "Enter your Personal Access Token: " TOKEN
        echo ""
        
        # Store credential
        git config --global credential.helper store
        echo "https://$GITHUB_USER:$TOKEN@github.com" > ~/.git-credentials
        success "Credentials stored"
    else
        warning "No token provided. Push might fail."
        echo ""
        echo "You can set it later with:"
        echo "  git config --global credential.helper store"
        echo "  Then push and enter token when prompted"
    fi
fi

echo ""

# Step 5: Verify Repository Access
log "🔍 Step 5: Verifying repository access..."
echo ""

if [ "$AUTH_METHOD" = "ssh" ]; then
    if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
        success "Repository access: OK"
    else
        error "Cannot access repository via SSH"
        echo ""
        echo "Make sure:"
        echo "1. SSH key is added to GitHub"
        echo "2. You have write access to the repository"
        exit 1
    fi
else
    # Try to list branches
    if git ls-remote origin 2>&1 | grep -q "HEAD"; then
        success "Repository access: OK"
    else
        error "Cannot access repository"
        echo ""
        echo "Possible issues:"
        echo "1. Token is invalid or expired"
        echo "2. Token doesn't have 'repo' scope"
        echo "3. You don't have write access"
        echo ""
        read -p "Do you want to regenerate token? (y/n): " REGEN
        
        if [ "$REGEN" = "y" ] || [ "$REGEN" = "Y" ]; then
            echo ""
            echo "Please go to: https://github.com/settings/tokens"
            echo "Generate new token with 'repo' scope"
            echo ""
            read -sp "Enter new token: " NEW_TOKEN
            echo ""
            
            echo "https://$GITHUB_USER:$NEW_TOKEN@github.com" > ~/.git-credentials
            success "New token stored"
        fi
    fi
fi

echo ""

# Step 6: Check Git Status
log "🔍 Step 6: Checking git status..."
echo ""

CURRENT_BRANCH=$(git branch --show-current)
success "Current branch: $CURRENT_BRANCH"

# Check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    warning "Uncommitted changes detected"
    echo ""
    read -p "Do you want to commit all changes? (y/n): " COMMIT
    
    if [ "$COMMIT" = "y" ] || [ "$COMMIT" = "Y" ]; then
        git add -A
        read -p "Enter commit message: " MSG
        git commit -m "$MSG"
        success "Changes committed"
    fi
fi

echo ""

# Step 7: Pull Latest Changes
log "🔍 Step 7: Pulling latest changes..."
echo ""

if git pull --rebase origin "$CURRENT_BRANCH" 2>&1; then
    success "Pull successful"
else
    warning "Pull failed or no remote branch yet"
    
    if git ls-remote origin "$CURRENT_BRANCH" | grep -q "$CURRENT_BRANCH"; then
        error "Pull failed. There might be conflicts."
        echo ""
        echo "Try: git pull --rebase origin $CURRENT_BRANCH"
        echo "Then resolve conflicts manually"
        exit 1
    else
        warning "Remote branch doesn't exist yet (first push)"
    fi
fi

echo ""

# Step 8: Push to GitHub
log "🔍 Step 8: Pushing to GitHub..."
echo ""

if git push -u origin "$CURRENT_BRANCH" 2>&1; then
    success "Push successful!"
    echo ""
    echo "=========================================="
    echo "🎉 SUCCESS!"
    echo "=========================================="
    echo ""
    echo "Repository: https://github.com/$GITHUB_USER/$GITHUB_REPO"
    echo "Branch: $CURRENT_BRANCH"
    echo ""
else
    error "Push failed"
    echo ""
    echo "Possible solutions:"
    echo "1. Check your token has 'repo' scope"
    echo "2. Verify you have write access"
    echo "3. Try force push: git push --force origin $CURRENT_BRANCH"
    echo ""
    exit 1
fi

echo ""
success "🎉 GitHub API validation completed successfully!"
echo ""
