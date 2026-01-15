# Deploy to GitHub - Complete These Steps Now

Your project is ready! I've initialized git and committed all files. Follow these steps to complete the GitHub deployment.

## ✅ What's Already Done

- ✅ Git repository initialized
- ✅ All files committed
- ✅ GitHub Actions workflow configured
- ✅ Project ready to push

## 🚀 Complete These Steps (10 minutes)

### Step 1: Configure Git (2 minutes)

Run these commands in your terminal (replace with YOUR information):

```bash
cd /Users/brunokuratli/claude/email-link-copier

git config --global user.name "Your GitHub Username"
git config --global user.email "your-email@example.com"

# Fix the commit author
git commit --amend --reset-author --no-edit
```

**Example:**
```bash
git config --global user.name "brunokuratli"
git config --global user.email "bruno@example.com"
git commit --amend --reset-author --no-edit
```

### Step 2: Create GitHub Repository (3 minutes)

**Option A: Via GitHub Website (Recommended)**

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `email-link-copier`
3. Description: `Outlook Add-in to copy email links to clipboard`
4. Make it **Public** (required for free GitHub Pages)
5. **DO NOT** check "Add a README file" (we already have one)
6. **DO NOT** add .gitignore (we already have one)
7. Click "**Create repository**"

**Option B: Via GitHub CLI (If you have it installed)**

```bash
gh repo create email-link-copier --public --source=. --remote=origin --push
```

Then skip to Step 4.

### Step 3: Push to GitHub (2 minutes)

After creating the repository, GitHub will show you commands. Use these:

```bash
cd /Users/brunokuratli/claude/email-link-copier

# Add the remote (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/email-link-copier.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/brunokuratli/email-link-copier.git
git branch -M main
git push -u origin main
```

You may be asked to authenticate - follow GitHub's prompts.

### Step 4: Enable GitHub Pages (3 minutes)

1. Go to your repository on GitHub
2. Click "**Settings**" tab (top right)
3. Click "**Pages**" in the left sidebar
4. Under "**Build and deployment**":
   - Source: Select "**GitHub Actions**"
5. Done! GitHub will automatically build and deploy

### Step 5: Wait for Deployment (2-3 minutes)

1. Go to "**Actions**" tab in your repository
2. You should see a workflow running: "Deploy to GitHub Pages"
3. Wait for the green ✅ checkmark
4. This means your site is live!

### Step 6: Get Your GitHub Pages URL

Your add-in is now hosted at:
```
https://YOUR-USERNAME.github.io/email-link-copier/
```

**Example:**
```
https://brunokuratli.github.io/email-link-copier/
```

**Verify it works:**
- Open this URL in browser: `https://YOUR-USERNAME.github.io/email-link-copier/src/taskpane.html`
- You should see the Email Link Copier interface

### Step 7: Update manifest.xml with Your URL (5 minutes)

Now update the manifest to use your GitHub Pages URL:

**Option A: Edit on GitHub (Easiest)**

1. In your GitHub repository, click `manifest.xml`
2. Click the pencil icon ✏️ (Edit this file)
3. Find and replace ALL instances of `localhost:3000` with your URL
4. Example replacements:

```xml
<!-- FIND: -->
https://localhost:3000/src/taskpane.html

<!-- REPLACE WITH (use YOUR username): -->
https://brunokuratli.github.io/email-link-copier/src/taskpane.html
```

5. Do this for ALL URLs in the file (there are about 6-8 instances)
6. Scroll down, click "Commit changes"
7. Click "Commit changes" again

**Option B: Edit Locally**

I can help you do this automatically. Just tell me your GitHub username and I'll update it for you.

### Step 8: Wait for Rebuild (2 minutes)

1. Go to "Actions" tab
2. A new workflow will start automatically
3. Wait for green ✅ checkmark
4. Your manifest is now updated!

### Step 9: Download Your Manifest

Your manifest.xml is ready for users!

**Download link:**
```
https://YOUR-USERNAME.github.io/email-link-copier/manifest.xml
```

**Right-click → Save as** to download it.

### Step 10: Test It Yourself (5 minutes)

1. Download the manifest.xml from the link above
2. Go to [outlook.office.com](https://outlook.office.com)
3. Click ⚙️ Settings → Search "add-ins" → "Manage add-ins"
4. Click "Add from file"
5. Select the downloaded manifest.xml
6. Click "Install"
7. Open any email
8. Look for "Email Link Copier" in the ribbon
9. Click "Copy Link"
10. Test pasting it!

✅ **If it works, you're done!**

---

## 🎉 What You Now Have

✅ **Free hosting** on GitHub Pages
✅ **Automatic HTTPS** enabled
✅ **Auto-deployment** - just commit changes and they deploy automatically
✅ **Global CDN** - fast loading worldwide
✅ **Ready to share** with users

---

## 📤 Share with Users

### For End Users:

Send them this link to download the manifest:
```
https://YOUR-USERNAME.github.io/email-link-copier/manifest.xml
```

And these installation instructions:

```
1. Download manifest.xml from the link above
2. Go to outlook.office.com
3. Click Settings ⚙️ → Search "add-ins" → "Manage add-ins"
4. Click "Add from file" → Select manifest.xml → Install
5. Done! Open an email and click "Copy Link" in the ribbon
```

Or send them the [USER_GUIDE_SIMPLE.md](USER_GUIDE_SIMPLE.md) file.

---

## 🔄 How to Update Later

When you make changes:

1. Edit files (either on GitHub or locally)
2. If editing locally:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. GitHub Actions automatically rebuilds (2-3 minutes)
4. Users get updates next time they open Outlook

---

## 📊 Current Status

**What's ready:**
- ✅ All source code
- ✅ All documentation
- ✅ Git repository initialized
- ✅ First commit created
- ✅ GitHub Actions workflow configured

**What you need to do:**
1. Configure git user (Step 1)
2. Create GitHub repository (Step 2)
3. Push to GitHub (Step 3)
4. Enable GitHub Pages (Step 4)
5. Update manifest.xml (Step 7)
6. Test it (Step 10)

**Time needed:** ~20 minutes total

---

## ❓ Need Help?

### Can't push to GitHub?

Make sure you're authenticated. You may need to:
- Use GitHub CLI: `gh auth login`
- Or use a Personal Access Token
- Or use SSH keys

See: https://docs.github.com/en/authentication

### Build failed?

1. Check the Actions tab for error messages
2. Make sure all files were pushed
3. Verify package.json exists
4. Try re-running the workflow

### Manifest doesn't work?

1. Verify all URLs are updated (no `localhost:3000` remaining)
2. Check that files are accessible:
   - Test: `https://YOUR-USERNAME.github.io/email-link-copier/src/taskpane.html`
3. Clear Outlook cache and reinstall

---

## 🎯 Quick Commands Summary

```bash
# 1. Configure git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git commit --amend --reset-author --no-edit

# 2. Push to GitHub (after creating repo on github.com)
git remote add origin https://github.com/YOUR-USERNAME/email-link-copier.git
git branch -M main
git push -u origin main

# 3. That's it! GitHub Actions handles the rest
```

---

## 📞 Next Steps After Deployment

1. ✅ Test the add-in yourself
2. ✅ Share with a small pilot group (5-10 users)
3. ✅ Gather feedback
4. ✅ Make any needed adjustments
5. ✅ Roll out to all users

**You're almost there! Just follow the steps above and you'll have a fully deployed add-in in about 20 minutes.**
