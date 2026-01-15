# Email Link Copier - Complete Setup Guide

This guide walks you through setting up the Email Link Copier Outlook Add-in from scratch.

## Quick Start

For experienced developers who want to get started immediately:

```bash
cd email-link-copier
npm install
npx office-addin-dev-certs install
npm start
```

Then sideload `manifest.xml` into Outlook.

## Detailed Setup Instructions

### Step 1: Install Node.js

1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Install version 14 or higher
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install Project Dependencies

Navigate to the project folder and install dependencies:

```bash
cd email-link-copier
npm install
```

This installs:
- Office.js libraries
- MSAL (Microsoft Authentication Library)
- Webpack and build tools
- Development certificates utility

### Step 3: Generate SSL Certificate

Office Add-ins require HTTPS for security. Generate a development certificate:

```bash
npx office-addin-dev-certs install
```

When prompted:
- macOS: Enter your password to trust the certificate
- Windows: Confirm administrator access

This creates a self-signed certificate trusted by your system.

### Step 4: Start the Development Server

```bash
npm start
```

You should see:
```
Project is running at https://localhost:3000/
webpack compiled successfully
```

Keep this terminal window open. The server must run while testing the add-in.

### Step 5: Sideload the Add-in into Outlook

Choose the method based on your platform:

#### Outlook Desktop (Windows)

1. Open Outlook Desktop
2. Open any email
3. Click "Get Add-ins" in the ribbon
4. Click "My add-ins" on the left
5. Scroll to "Custom add-ins" section
6. Click "Add a custom add-in" > "Add from file..."
7. Browse to your project folder
8. Select `manifest.xml`
9. Click "Install"
10. Read the warning and click "Install" again

#### Outlook Desktop (Mac)

1. Open Outlook Desktop
2. Click "Get Add-ins" in the toolbar
3. Click "My add-ins"
4. Under "Custom add-ins", click "+ Add a custom add-in" > "Add from file..."
5. Navigate to your project folder
6. Select `manifest.xml`
7. Click "Install"

#### Outlook Web App (All Platforms)

1. Open [outlook.office.com](https://outlook.office.com) in Chrome
2. Sign in with your Microsoft 365 account
3. Click the Settings gear icon (top right)
4. Search for "add-ins" or scroll to "View all Outlook settings"
5. Go to "Mail" > "Customize actions" > "Manage add-ins"
6. Click "+ Add from file"
7. Click "Browse" and select `manifest.xml`
8. Click "Install"
9. Read the permissions and click "Install"

### Step 6: Test the Add-in

1. Open any email in Outlook
2. In the ribbon, look for "Email Link Copier" section
3. You should see two options:
   - "Copy Link" button (quick action)
   - "Show Taskpane" button

#### Test Method 1: Quick Copy

1. Click "Copy Link" button
2. You should see a notification: "Email link copied to clipboard!"
3. Open a text editor or browser
4. Paste (Ctrl+V or Cmd+V)
5. You should see a URL like: `https://outlook.office.com/mail/id/AAMk...`

#### Test Method 2: Task Pane

1. Click "Show Taskpane" button
2. A side panel opens on the right
3. Click "Copy Email Link" button
4. The link appears in the text field below
5. Status message shows "Email link copied to clipboard!"
6. Paste the link elsewhere to verify

#### Verify the Link Works

1. Copy the email link
2. Open a new browser tab
3. Paste the link in the address bar
4. Press Enter
5. Outlook Web App should open with that specific email

## Optional: Azure AD Configuration

The add-in works without Azure AD using Office.js APIs. However, if you want to extend functionality with Microsoft Graph API:

### Step 1: Register App in Azure

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to "Azure Active Directory"
3. Click "App registrations" in the left menu
4. Click "+ New registration"

### Step 2: Configure Registration

Fill in the form:
- **Name**: Email Link Copier
- **Supported account types**: Select "Accounts in any organizational directory and personal Microsoft accounts"
- **Redirect URI**:
  - Platform: Web
  - URI: `https://localhost:3000/src/taskpane.html`
- Click "Register"

### Step 3: Note the Client ID

1. On the app overview page, copy the "Application (client) ID"
2. Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### Step 4: Configure API Permissions

1. Click "API permissions" in left menu
2. Click "+ Add a permission"
3. Choose "Microsoft Graph"
4. Choose "Delegated permissions"
5. Search for and select "Mail.Read"
6. Click "Add permissions"

### Step 5: Update the Code

Open `src/auth.js` and replace the placeholder:

```javascript
clientId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"  // Your actual Client ID
```

### Step 6: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
npm start
```

## Icon Customization

The manifest references icon files. To add proper icons:

### Create Icons

Create PNG files with these exact dimensions:
- `icon-16.png` - 16x16 pixels
- `icon-32.png` - 32x32 pixels
- `icon-64.png` - 64x64 pixels
- `icon-80.png` - 80x80 pixels

### Add to Project

1. Save icons in the `assets/` folder
2. The webpack configuration automatically copies them to `dist/assets/`

### Icon Design Tips

- Use a simple, recognizable design
- Consider using a link or chain icon
- Use your brand colors
- Ensure clarity at small sizes (16x16)

## Customization Guide

### Change Add-in Name

Edit `manifest.xml`:

```xml
<DisplayName DefaultValue="Your Custom Name"/>
<Description DefaultValue="Your custom description"/>
```

### Change Button Labels

Edit the `Resources` section in `manifest.xml`:

```xml
<bt:String id="ActionButton.Label" DefaultValue="Your Button Text"/>
```

### Generate Unique Add-in ID

Before deploying:

1. Visit [guidgenerator.com](https://www.guidgenerator.com/)
2. Generate a new GUID
3. Replace in `manifest.xml`:

```xml
<Id>YOUR-NEW-GUID-HERE</Id>
```

### Modify Port (if 3000 is taken)

Edit `webpack.config.js`:

```javascript
devServer: {
  port: 3001  // Change to any available port
}
```

Then update all URLs in `manifest.xml` to use the new port.

## Troubleshooting

### Issue: "Cannot connect to localhost:3000"

**Solution:**
- Ensure dev server is running (`npm start`)
- Check firewall isn't blocking port 3000
- Try restarting the dev server

### Issue: "Certificate not trusted" error

**Solution:**
```bash
npx office-addin-dev-certs install --force
```

Restart Outlook after installing the certificate.

### Issue: Add-in doesn't appear in ribbon

**Solution:**
- Close and reopen Outlook completely
- Clear Outlook cache:
  - Windows: Delete `%LOCALAPPDATA%\Microsoft\Outlook`
  - Mac: Delete `~/Library/Caches/com.microsoft.Outlook`
- Verify manifest.xml loaded without errors

### Issue: "Failed to get email ID"

**Solution:**
- Ensure you're viewing an email (not composing)
- Try with different emails
- Check browser console (F12) for errors

### Issue: Clipboard copy fails

**Solution:**
- Ensure using HTTPS (required for clipboard API)
- Try granting clipboard permissions in browser
- Use the manual copy from the displayed link

### Issue: Email link doesn't open

**Solution:**
- Verify you're signed into the same Microsoft 365 account
- Try opening in an incognito/private window
- Check the email still exists in your mailbox

## Development Tips

### View Console Logs

#### Outlook Web App
1. Press F12 to open Developer Tools
2. Check the Console tab for errors/logs

#### Outlook Desktop (Windows)
1. Right-click the task pane
2. Select "Inspect"
3. View Console tab

#### Outlook Desktop (Mac)
1. Enable developer mode in Safari
2. Right-click task pane > "Inspect Element"

### Live Reloading

Webpack dev server supports hot reload:
- Edit any file in `src/`
- Save the file
- Refresh the task pane to see changes

### Testing Different Scenarios

Test the add-in with:
- Different email types (received, sent, drafts)
- Emails in different folders
- Emails from different dates
- Shared mailboxes (if applicable)

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates optimized files in `dist/` folder with:
- Minified JavaScript
- Optimized assets
- Production manifest

### Deployment Checklist

Before deploying to production:

- [ ] Generate unique GUID for manifest
- [ ] Update all localhost URLs to production URLs
- [ ] Add production icons to assets folder
- [ ] Test with real users on different platforms
- [ ] Update Azure AD redirect URIs (if using)
- [ ] Host files on secure HTTPS server
- [ ] Validate manifest: `npm run validate`

## Next Steps

After successful setup:

1. **Customize**: Modify UI, colors, and branding
2. **Enhance**: Add new features based on requirements
3. **Test**: Thoroughly test on all target platforms
4. **Deploy**: Roll out to users via chosen method
5. **Monitor**: Collect feedback and iterate

## Additional Resources

- [Office Add-ins Documentation](https://docs.microsoft.com/office/dev/add-ins/)
- [Office.js API Reference](https://docs.microsoft.com/javascript/api/office)
- [Webpack Documentation](https://webpack.js.org/)
- [MSAL.js Documentation](https://docs.microsoft.com/azure/active-directory/develop/msal-overview)

## Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review browser console for error messages
3. Verify all prerequisites are installed
4. Test with a fresh email
5. Try in a different Outlook client (Desktop vs Web)

## Success Checklist

You've successfully set up the add-in when:

- [ ] Dev server runs without errors
- [ ] Add-in appears in Outlook ribbon
- [ ] Clicking "Copy Link" shows success notification
- [ ] Link is copied to clipboard
- [ ] Pasted link opens the correct email
- [ ] Task pane opens and functions properly
- [ ] No errors in browser console
