# Quick Start Guide

Get the Email Link Copier add-in running in 5 minutes.

## Prerequisites

- Node.js installed ([download](https://nodejs.org/))
- Microsoft 365 account
- Outlook Desktop or access to Outlook Web App

## Installation (5 Steps)

### 1. Install Dependencies

```bash
cd email-link-copier
npm install
```

### 2. Generate SSL Certificate

```bash
npx office-addin-dev-certs install
```

Enter your password when prompted (macOS) or confirm admin access (Windows).

### 3. Start Dev Server

```bash
npm start
```

Leave this terminal window open. You should see:
```
Project is running at https://localhost:3000/
```

### 4. Sideload into Outlook

**Outlook Web App** (Easiest):
1. Open [outlook.office.com](https://outlook.office.com)
2. Click Settings (gear icon) → View all Outlook settings
3. Go to Mail → Customize actions → Manage add-ins
4. Click "+ Add from file"
5. Choose `manifest.xml` from the project folder
6. Click Install

**Outlook Desktop**:
1. Open Outlook
2. Click "Get Add-ins" in ribbon
3. Click "My add-ins"
4. Under "Custom add-ins", click "Add from file"
5. Select `manifest.xml`
6. Click Install

### 5. Test It

1. Open any email
2. Look for "Email Link Copier" in the ribbon
3. Click "Copy Link" button
4. Paste somewhere (Ctrl+V or Cmd+V)
5. You should see: `https://outlook.office.com/mail/id/AAMk...`

## That's It!

The add-in is now working. Click "Copy Link" on any email to copy its URL.

## Troubleshooting

**Add-in doesn't appear?**
- Make sure dev server is running (`npm start`)
- Restart Outlook
- Clear browser cache (Outlook Web App)

**Certificate error?**
```bash
npx office-addin-dev-certs install --force
```

**Can't copy link?**
- Ensure you're viewing an email (not composing)
- Try a different email
- Check browser console (F12) for errors

## Next Steps

- Read **README.md** for full documentation
- See **SETUP_GUIDE.md** for detailed instructions
- Check **ARCHITECTURE.md** for technical details

## Need Help?

Check the troubleshooting section in **SETUP_GUIDE.md** or review error messages in the browser console (press F12).
