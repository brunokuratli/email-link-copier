# Email Link Copier - Outlook Add-in

A lightweight Outlook Add-in that allows users to quickly copy the URL of the currently opened email to their clipboard.

## Features

- One-click email link copying
- Works in Outlook Desktop and Outlook Web App
- Direct integration into Outlook ribbon
- Fallback display for manual copying
- Minimal permissions required (Mail.Read)

## 🚀 Quick Start - Choose Your Path

### For Non-Technical Users (Easiest)

**Just want to use it?** See **[SIMPLE_INSTALL.md](SIMPLE_INSTALL.md)** for:
- ✅ 3-click installation (no coding required)
- ✅ Automatic deployment via Microsoft 365 Admin Center
- ✅ Free hosting on GitHub Pages

**Installation for end users:**
1. Download `manifest.xml` (IT admin provides this)
2. Go to Outlook Settings → Manage add-ins → Add from file
3. Done! (See [USER_GUIDE_SIMPLE.md](USER_GUIDE_SIMPLE.md))

### For IT Admins

**Want to deploy organization-wide?**
- See **[SIMPLE_INSTALL.md](SIMPLE_INSTALL.md)** - Deploy via Admin Center (users get it automatically)
- See **[DEPLOY_GITHUB.md](DEPLOY_GITHUB.md)** - Free hosting with GitHub Pages

### For Developers

**Want to customize or develop?** Continue reading below for full development setup.

---

## Developer Installation

### Prerequisites

- Node.js (v14 or higher)
- Microsoft 365 account with Exchange Online
- Outlook Desktop or access to Outlook Web App
- Chrome browser (for testing)

## Installation

### 1. Clone or Download the Project

```bash
cd email-link-copier
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate SSL Certificate (Required for Development)

Office Add-ins require HTTPS. Generate a self-signed certificate:

```bash
npx office-addin-dev-certs install
```

### 4. Azure AD App Registration (Optional - For Graph API Integration)

If you want to use Microsoft Graph API features:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory > App registrations
3. Click "New registration"
4. Name: "Email Link Copier"
5. Supported account types: "Accounts in any organizational directory and personal Microsoft accounts"
6. Redirect URI: Web - `https://localhost:3000/src/taskpane.html`
7. After creation, copy the "Application (client) ID"
8. Go to "API permissions" > Add permission > Microsoft Graph > Delegated permissions
9. Add "Mail.Read" permission
10. Update `src/auth.js` with your Client ID:

```javascript
clientId: "YOUR_CLIENT_ID_HERE"
```

Note: The add-in works without Azure AD registration using Office.js APIs, but Graph API features require it.

## Development

### Start Development Server

```bash
npm start
```

This will start a webpack dev server at `https://localhost:3000`

### Sideload the Add-in

#### For Outlook Desktop (Windows/Mac):

1. Open Outlook Desktop
2. Go to "Get Add-ins" or "Store"
3. Click "My add-ins" tab
4. Under "Custom add-ins", click "Add from file..."
5. Browse to `manifest.xml` in your project folder
6. Click "Install"

#### For Outlook Web App:

1. Open Outlook in your browser (Chrome recommended)
2. Click the Settings gear icon
3. Search for "Manage add-ins"
4. Click "Add from file"
5. Upload the `manifest.xml` file
6. Click "Install"

### Testing the Add-in

1. Open any email in Outlook
2. Look for "Email Link Copier" in the ribbon
3. Click "Copy Link" button or open the taskpane
4. The email URL will be copied to your clipboard
5. Test pasting the link in a browser to verify it opens the email

## Usage

### Method 1: Ribbon Button (Quick Action)

1. Open an email in Outlook
2. Click the "Copy Link" button in the ribbon
3. A notification will confirm the link was copied
4. Paste the link wherever needed

### Method 2: Task Pane

1. Open an email in Outlook
2. Click "Show Taskpane" button
3. Click "Copy Email Link" in the task pane
4. The link will be displayed and copied to clipboard

## Project Structure

```
email-link-copier/
├── src/
│   ├── taskpane.html      # Main UI for task pane
│   ├── taskpane.js        # Task pane functionality
│   ├── taskpane.css       # Styling
│   ├── commands.html      # Commands handler page
│   ├── commands.js        # Ribbon button commands
│   └── auth.js            # Authentication helpers (Graph API)
├── assets/                # Icons (add your own)
├── manifest.xml           # Add-in manifest
├── package.json           # Dependencies
├── webpack.config.js      # Webpack configuration
└── README.md             # This file
```

## Generated Email URL Format

The add-in generates URLs in the following format:

```
https://outlook.office.com/mail/id/<email-ID>
```

Where `<email-ID>` is the REST API format email identifier.

## Customization

### Update Manifest ID

Before deploying, generate a unique GUID for your add-in:

1. Generate a GUID at [guidgenerator.com](https://www.guidgenerator.com/)
2. Replace the `<Id>` value in `manifest.xml`

### Add Custom Icons

Place icon files in the `assets/` folder:
- `icon-16.png` (16x16 pixels)
- `icon-32.png` (32x32 pixels)
- `icon-64.png` (64x64 pixels)
- `icon-80.png` (80x80 pixels)

## Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

## Deployment Options

### Option 1: Individual User Installation (Recommended for Personal Use)

Users can sideload the add-in using the manifest.xml file as described above.

### Option 2: Organizational Deployment

IT admins can deploy the add-in organization-wide:

1. Build the production version
2. Host the add-in files on a secure HTTPS server
3. Update manifest.xml URLs to point to the hosted location
4. Upload manifest to Microsoft 365 admin center
5. Deploy to users

### Option 3: Microsoft AppSource (Store Deployment)

For public distribution:

1. Complete all Microsoft validation requirements
2. Submit to Partner Center
3. Wait for approval (approximately 16 hours of additional work for compliance)

## Troubleshooting

### Certificate Issues

If you get SSL errors:
```bash
npx office-addin-dev-certs install --force
```

### Add-in Not Appearing

- Verify the dev server is running on https://localhost:3000
- Clear Outlook cache and restart
- Check browser console for errors (F12)

### Clipboard Not Working

- Ensure you're using HTTPS
- Check browser clipboard permissions
- Some browsers require user interaction before clipboard access

### Email Link Not Opening

- Verify you're signed into the same Microsoft 365 account
- Try the link in an incognito/private browser window
- Check that the email still exists in your mailbox

## Security & Privacy

- The add-in only requests `Mail.Read` permission
- No email data is stored or transmitted to external servers
- All operations happen locally in the browser
- Email URLs are generated client-side

## Browser Support

- Chrome (Primary testing browser)
- Edge
- Safari
- Firefox

## Compatibility

- Outlook 2016 or later (Windows/Mac)
- Outlook on the web
- Microsoft 365 accounts with Exchange Online

## License

MIT License - Feel free to modify and distribute

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Office Add-ins documentation: https://docs.microsoft.com/office/dev/add-ins/
3. Check the browser console for error messages

## Future Enhancements

Potential features for future versions:
- Copy multiple email links at once
- Custom URL format options
- Keyboard shortcuts
- Link history
- Batch operations on selected emails

## Contributing

Contributions are welcome. Please ensure:
- Code follows existing style
- Test in both Outlook Desktop and Web App
- Update documentation for new features

## Version History

- **1.0.0** - Initial release
  - Basic email link copying functionality
  - Ribbon button integration
  - Task pane interface
  - Clipboard API support with fallback
