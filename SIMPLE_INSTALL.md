# Simple Installation for Non-Technical Users

This guide explains the easiest ways to install the Email Link Copier add-in without requiring technical skills.

## Option 1: Direct Web Hosting (Easiest for End Users)

### For IT Admin (One-time Setup)

The IT admin hosts the add-in files once, then users can install with just a few clicks.

#### Step 1: Host the Files

1. Use a free hosting service like:
   - **GitHub Pages** (free, easy)
   - **Netlify** (free, automatic HTTPS)
   - **Vercel** (free, automatic HTTPS)
   - Your organization's web server

#### Step 2: Build and Upload

```bash
# Run these commands once:
npm install
npm run build

# Upload the 'dist' folder contents to your hosting service
```

#### Step 3: Update Manifest

Edit `manifest.xml` and replace ALL instances of `localhost:3000` with your hosted URL:

```xml
<!-- Change from: -->
https://localhost:3000/src/taskpane.html

<!-- To your hosted URL: -->
https://yourusername.github.io/email-link-copier/src/taskpane.html
```

#### Step 4: Share the Manifest

Give users the `manifest.xml` file via:
- Email attachment
- Shared network drive
- Company intranet download link

### For End User (Simple 3-Step Installation)

**No technical skills required!**

1. **Download** the `manifest.xml` file (sent by your IT admin)

2. **Open Outlook** (Web App is easiest)
   - Go to [outlook.office.com](https://outlook.office.com)
   - Click Settings ⚙️ (top right)
   - Type "add-ins" in search
   - Click "Manage add-ins"

3. **Install**
   - Click "Add from file"
   - Choose the downloaded `manifest.xml`
   - Click "Install"
   - Done! ✅

**That's it!** The add-in is now installed. Open any email and look for "Email Link Copier" in the ribbon.

---

## Option 2: Microsoft 365 Admin Center (Automatic for All Users)

### For IT Admin Only

This is the BEST option for organizations - users get the add-in automatically without doing anything!

#### Benefits
- ✅ Users don't need to install anything
- ✅ Add-in appears automatically in Outlook
- ✅ Centralized management
- ✅ Easy to update
- ✅ No user technical knowledge needed

#### Steps

1. **Host the files** (same as Option 1)

2. **Update manifest.xml** with hosted URLs

3. **Upload to Microsoft 365 Admin Center**:
   - Sign in to [admin.microsoft.com](https://admin.microsoft.com)
   - Go to **Settings** → **Integrated apps**
   - Click **Upload custom apps**
   - Upload `manifest.xml`
   - Assign to users or groups
   - Click **Deploy**

4. **Done!** Users will see the add-in automatically (may take a few hours)

### For End User

**No action required!** The add-in appears automatically in Outlook.

---

## Option 3: GitHub Pages (Free Hosting for Small Teams)

### Complete Setup Guide for Non-Developers

#### Step 1: Create GitHub Account (5 minutes)

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Create a free account

#### Step 2: Upload the Project (10 minutes)

1. Click "New repository"
2. Name it: `email-link-copier`
3. Make it **Public**
4. Click "Create repository"
5. Click "Upload files"
6. Drag and drop the entire `email-link-copier` folder
7. Click "Commit changes"

#### Step 3: Enable GitHub Pages (2 minutes)

1. Go to repository "Settings"
2. Click "Pages" (left sidebar)
3. Under "Source", select **"GitHub Actions"**
4. Done!

Your files will be available at:
```
https://YOUR-USERNAME.github.io/email-link-copier/
```

#### Step 4: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Step 5: Update Manifest

Edit `manifest.xml` and replace `localhost:3000` with your GitHub Pages URL.

#### Step 6: Share with Users

Send users the link to download the manifest:
```
https://YOUR-USERNAME.github.io/email-link-copier/manifest.xml
```

Users just download and install (3 steps from Option 1).

---

## Option 4: Single-Click Installer Script (Windows)

### For IT Admin: Create the Installer

Create a Windows batch file that automates everything:

**`install-email-link-copier.bat`**:

```batch
@echo off
echo ================================================
echo Email Link Copier - Automatic Installer
echo ================================================
echo.
echo This will install the Email Link Copier add-in
echo for Outlook Web App.
echo.
pause

echo.
echo Downloading manifest file...
powershell -Command "Invoke-WebRequest -Uri 'https://your-hosted-url.com/manifest.xml' -OutFile '%TEMP%\email-link-copier-manifest.xml'"

echo.
echo Opening browser to install add-in...
echo.
echo Please follow these steps in your browser:
echo 1. Sign in to Outlook if prompted
echo 2. Go to Settings (gear icon)
echo 3. Search for "add-ins"
echo 4. Click "Manage add-ins"
echo 5. Click "Add from file"
echo 6. Select the manifest file at: %TEMP%\email-link-copier-manifest.xml
echo.
start https://outlook.office.com

pause
```

### For End User

1. Double-click `install-email-link-copier.bat`
2. Follow the simple on-screen instructions
3. Done!

---

## Option 5: Pre-Built Installer Package

### For IT Admin: Create Installation Package

Create a folder with everything users need:

```
EmailLinkCopierInstaller/
├── manifest.xml (with hosted URLs)
├── INSTALL_INSTRUCTIONS.pdf (with screenshots)
└── install.bat (Windows) or install.sh (Mac)
```

**Simple Instructions PDF** should include:
- Large, clear screenshots
- Numbered steps with arrows
- "Click here" indicators
- Troubleshooting tips

### For End User

1. Download the installer folder
2. Open `INSTALL_INSTRUCTIONS.pdf`
3. Follow the picture guide
4. Done!

---

## Comparison: Which Option Is Best?

| Option | User Difficulty | Admin Setup | Best For |
|--------|----------------|-------------|----------|
| **Option 2: Admin Center** | ⭐ None (automatic) | ⭐⭐⭐ Medium | Organizations with IT |
| **Option 1: Web Hosting** | ⭐⭐ Very Easy | ⭐⭐⭐ Medium | Small teams |
| **Option 3: GitHub Pages** | ⭐⭐ Very Easy | ⭐⭐ Easy | Free solution |
| **Option 4: Batch Script** | ⭐⭐ Easy | ⭐ Very Easy | Windows users |
| **Option 5: Package** | ⭐⭐ Easy | ⭐⭐ Easy | Mixed environments |

**Recommendation**:
- **For organizations**: Use **Option 2** (Admin Center) - users get it automatically
- **For small teams/individuals**: Use **Option 3** (GitHub Pages) - free and simple
- **For quick deployment**: Use **Option 1** (Web Hosting) with simple user guide

---

## Simplified User Guide Template

Use this template for your non-technical users:

---

### How to Install Email Link Copier (3 Steps)

**Step 1: Download the File**
- Click this link: [Download manifest.xml](YOUR-LINK-HERE)
- Save the file to your Downloads folder

**Step 2: Open Outlook Settings**
- Go to [outlook.office.com](https://outlook.office.com)
- Click the ⚙️ Settings button (top right corner)
- Type "add-ins" in the search box
- Click "Manage add-ins"

**Step 3: Install**
- Click "+ Add from file"
- Click "Browse"
- Find and select `manifest.xml` from your Downloads
- Click "Install"
- Click "Install" again to confirm

**Done!** 🎉

Open any email and you'll see "Email Link Copier" in the ribbon at the top.

**To use it:**
1. Open any email
2. Click "Copy Link" button
3. Paste anywhere (Ctrl+V)

**Need help?** Contact [your-it@company.com](mailto:your-it@company.com)

---

---

## Quick Setup for Different Hosting Services

### Using Netlify (Easiest)

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Drag and drop your `dist` folder
4. Get your URL: `https://your-app.netlify.app`
5. Update manifest.xml with this URL
6. Re-upload to update

### Using Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up (free)
3. Click "New Project"
4. Import your GitHub repo or upload files
5. Deploy
6. Get your URL: `https://your-app.vercel.app`

### Using Your Company Server

1. Get server access from IT
2. Upload `dist` folder contents to web root
3. Ensure HTTPS is enabled
4. Use URL: `https://yourcompany.com/email-link-copier/`

---

## Troubleshooting for Non-Technical Users

### "I can't find the add-in after installing"

**Solution:**
1. Close Outlook completely
2. Reopen Outlook
3. Open any email
4. Look for "Email Link Copier" in the ribbon at the top

### "The file won't install"

**Solution:**
1. Make sure you downloaded `manifest.xml` (not a different file)
2. Make sure you're signed into Outlook Web App
3. Try using a different browser (Chrome recommended)

### "I don't see a Settings button"

**Solution:**
- Make sure you're at [outlook.office.com](https://outlook.office.com)
- The ⚙️ button is in the top-right corner
- If using desktop Outlook, switch to Outlook Web App instead

### "It says 'Add-in error'"

**Solution:**
1. Contact your IT admin
2. The hosted files might be down
3. The manifest URL might need updating

---

## For IT Admins: Rollout Checklist

- [ ] Choose hosting option (GitHub Pages, Netlify, company server)
- [ ] Build the project: `npm run build`
- [ ] Upload to hosting service
- [ ] Update manifest.xml with hosted URLs
- [ ] Test manifest in your own Outlook
- [ ] Create simple user guide with screenshots
- [ ] Choose distribution method:
  - [ ] Admin Center (automatic) OR
  - [ ] Email manifest to users OR
  - [ ] Put on company intranet
- [ ] Send announcement to users
- [ ] Provide support contact
- [ ] Monitor for issues

---

## Summary

**For the simplest end-user experience:**

1. **IT Admin** hosts files once (GitHub Pages, Netlify, or company server)
2. **IT Admin** updates manifest.xml with hosted URL
3. **IT Admin** either:
   - Deploys via Admin Center (users get it automatically), OR
   - Sends users a 3-step guide with the manifest file

**Result**: Non-technical users can install in 3 clicks or get it automatically!

No command line, no Node.js, no certificates - just download and install.
