# Deploy to GitHub Pages - Step by Step

This guide shows you how to host the Email Link Copier add-in for FREE using GitHub Pages. No technical experience required!

## What You'll Need

- GitHub account (free) - [Sign up here](https://github.com/signup)
- The `email-link-copier` folder
- 20 minutes

## Step-by-Step Guide

### Part 1: Create GitHub Account (Skip if you have one)

1. Go to [github.com/signup](https://github.com/signup)
2. Enter your email address
3. Create a password
4. Choose a username
5. Complete verification
6. Click "Create account"

### Part 2: Upload Your Project

#### Option A: Using GitHub Website (Easiest)

1. **Sign in to GitHub**
   - Go to [github.com](https://github.com)
   - Click "Sign in" (top right)

2. **Create a New Repository**
   - Click the "+" button (top right)
   - Click "New repository"

3. **Configure Repository**
   - Repository name: `email-link-copier`
   - Description: "Outlook Add-in to copy email links"
   - Make it **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file"
   - Click "Create repository"

4. **Upload Files**
   - Click "Add file" → "Upload files"
   - Drag the ENTIRE `email-link-copier` folder into the browser
   - Wait for upload to complete
   - Scroll down, click "Commit changes"

#### Option B: Using GitHub Desktop (Alternative)

1. Download [GitHub Desktop](https://desktop.github.com)
2. Install and sign in
3. Click "File" → "New repository"
4. Name: `email-link-copier`
5. Choose location (where your folder is)
6. Click "Create repository"
7. Click "Publish repository"
8. ✅ Uncheck "Keep this code private"
9. Click "Publish repository"

### Part 3: Enable GitHub Pages

1. **Go to Settings**
   - In your repository, click "Settings" tab (top)

2. **Open Pages Settings**
   - In left sidebar, click "Pages"

3. **Configure Source**
   - Under "Build and deployment"
   - Source: Select **"GitHub Actions"**

4. **Done!**
   - GitHub will automatically build and deploy
   - Wait 2-3 minutes for first deployment

### Part 4: Get Your URL

Your add-in will be available at:
```
https://YOUR-USERNAME.github.io/email-link-copier/
```

**Example:**
- Username: `johnsmith`
- URL: `https://johnsmith.github.io/email-link-copier/`

**Check deployment status:**
1. Go to "Actions" tab in your repository
2. Look for a green ✅ checkmark
3. If yellow, wait a bit longer
4. If red ❌, see troubleshooting below

### Part 5: Update Manifest for Your URL

⚠️ **Important:** You need to update the manifest.xml with your actual GitHub Pages URL.

1. **Find Your URL** (from Part 4)

2. **Edit manifest.xml** in GitHub:
   - In your repository, click `manifest.xml`
   - Click the pencil icon ✏️ (Edit this file)

3. **Replace ALL URLs:**
   - Find: `https://localhost:3000`
   - Replace with: `https://YOUR-USERNAME.github.io/email-link-copier`

   **Example replacements:**
   ```xml
   <!-- Find this: -->
   <SourceLocation DefaultValue="https://localhost:3000/src/taskpane.html"/>

   <!-- Replace with: -->
   <SourceLocation DefaultValue="https://johnsmith.github.io/email-link-copier/src/taskpane.html"/>
   ```

4. **Save Changes:**
   - Scroll down
   - Click "Commit changes"
   - Click "Commit changes" again

5. **Wait for Rebuild:**
   - Go to "Actions" tab
   - Wait for new build to finish (green ✅)
   - Takes 2-3 minutes

### Part 6: Download Your Manifest

Now your manifest is ready for users!

**Option A: Direct Download Link**

Share this link with users:
```
https://YOUR-USERNAME.github.io/email-link-copier/manifest.xml
```

Users can right-click → "Save link as..." → Then install.

**Option B: Download from GitHub**

1. In your repository, click `manifest.xml`
2. Click the "Download" button (top right)
3. Send this file to users

### Part 7: Test It Yourself

Before sharing with others, test it:

1. **Download your manifest.xml**
   - Use the link from Part 6

2. **Install in Outlook**
   - Go to [outlook.office.com](https://outlook.office.com)
   - Settings ⚙️ → "Manage add-ins"
   - Click "Add from file"
   - Select your manifest.xml
   - Install

3. **Test the Add-in**
   - Open any email
   - Look for "Email Link Copier"
   - Click "Copy Link"
   - Test pasting the link

4. **Verify Link Works**
   - Paste the copied link in browser
   - Should open the email in Outlook

✅ **If it works, you're ready to share with users!**

---

## Sharing with Users

### Method 1: Direct Download Link

Give users this link:
```
https://YOUR-USERNAME.github.io/email-link-copier/manifest.xml
```

**Instructions for users:**
1. Right-click the link → "Save link as..."
2. Save the `manifest.xml` file
3. Follow the installation guide (see USER_GUIDE_SIMPLE.md)

### Method 2: Send File Directly

1. Download manifest.xml from your repository
2. Email it to users as an attachment
3. Include installation instructions

### Method 3: Company Intranet

1. Upload manifest.xml to company intranet/SharePoint
2. Create a page with:
   - Download link
   - Installation instructions
   - Support contact

---

## Updating the Add-in

When you make changes:

1. **Edit files in GitHub:**
   - Click the file you want to change
   - Click pencil icon ✏️
   - Make your changes
   - Commit changes

2. **Automatic deployment:**
   - GitHub Actions rebuilds automatically
   - Takes 2-3 minutes
   - Check "Actions" tab for status

3. **Users get updates:**
   - Next time they open Outlook
   - Add-in updates automatically
   - No need to reinstall

---

## Troubleshooting

### ❌ Build Failed (Red X in Actions)

**Check the error:**
1. Go to "Actions" tab
2. Click the failed workflow
3. Click the failed job
4. Read error message

**Common fixes:**
- Missing `package.json`: Make sure you uploaded ALL files
- Build error: Check that `npm run build` works locally first
- Permissions issue: Make sure repository is Public

### 🔄 Deployment Still Pending

**Wait longer:**
- First deployment can take 5-10 minutes
- Check "Actions" tab for progress

**Force redeploy:**
1. Go to "Actions" tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

### 🔗 URLs Don't Work

**Check these:**
- Is your URL correct: `https://username.github.io/email-link-copier/`
- Did you update ALL URLs in manifest.xml?
- Did you wait for rebuild after editing manifest?
- Is repository Public (not Private)?

**Test individual files:**
```
https://YOUR-USERNAME.github.io/email-link-copier/src/taskpane.html
```

Should show the taskpane page in your browser.

### 📁 404 Not Found

**Check:**
- Repository name is exactly: `email-link-copier`
- Files are in root of repository (not in subfolder)
- GitHub Pages is enabled (Settings → Pages)
- Deployment succeeded (green ✅ in Actions)

**Force refresh:**
- Wait 10 minutes
- Clear browser cache
- Try incognito mode

### 🚫 "Add-in Error" in Outlook

**Verify:**
1. All URLs in manifest.xml are correct
2. No `localhost` remains in manifest.xml
3. Files are accessible:
   - Test: `https://username.github.io/email-link-copier/manifest.xml`
   - Should download the manifest

**Re-validate manifest:**
```bash
npm run validate
```

Fix any errors shown.

---

## Advanced: Custom Domain (Optional)

Want a nicer URL like `outlook-tools.yourcompany.com`?

1. **Buy a domain** (from Namecheap, Google Domains, etc.)

2. **Configure DNS:**
   - Add CNAME record:
   - Name: `outlook-tools` (or subdomain you want)
   - Value: `YOUR-USERNAME.github.io`

3. **Update GitHub Pages:**
   - Repository Settings → Pages
   - Under "Custom domain"
   - Enter: `outlook-tools.yourcompany.com`
   - Save

4. **Update manifest.xml**
   - Replace GitHub URL with custom domain
   - Commit changes

---

## Cost

**100% FREE** ✅

- GitHub account: Free
- GitHub Pages hosting: Free
- Automatic builds: Free
- Bandwidth: Free (generous limits)
- HTTPS: Free (automatic)

**Limits:**
- 1 GB storage
- 100 GB bandwidth/month
- 10 builds/hour

(More than enough for this add-in!)

---

## Security

✅ **HTTPS**: Automatically enabled
✅ **CDN**: Fast loading worldwide
✅ **No server management**: GitHub handles everything
✅ **Automatic updates**: Deploy by committing changes

---

## Next Steps

1. ✅ Deploy to GitHub Pages (you just did this!)
2. ✅ Test the add-in yourself
3. ✅ Create user guide for your team
4. ✅ Share manifest.xml with users
5. ✅ Provide support contact

**Congratulations!** Your add-in is now hosted and ready for users. 🎉

---

## Quick Reference

**Your GitHub Pages URL:**
```
https://YOUR-USERNAME.github.io/email-link-copier/
```

**Manifest download link for users:**
```
https://YOUR-USERNAME.github.io/email-link-copier/manifest.xml
```

**Check deployment status:**
```
https://github.com/YOUR-USERNAME/email-link-copier/actions
```

**Update files:**
1. Edit in GitHub web interface
2. Or push from GitHub Desktop
3. Wait 2-3 minutes for automatic rebuild

---

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [GitHub Support](https://support.github.com)

**Common issues solved in:**
- SIMPLE_INSTALL.md
- FAQ.md
- SETUP_GUIDE.md
