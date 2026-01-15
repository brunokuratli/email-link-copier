# Email Link Copier - Complete Checklist

Use this checklist to ensure your add-in is properly set up, tested, and deployed.

## Initial Setup Checklist

### Prerequisites
- [ ] Node.js installed (v14 or higher)
- [ ] Microsoft 365 account with Exchange Online
- [ ] Access to Outlook (Desktop or Web App)
- [ ] Chrome browser for testing

### Installation
- [ ] Navigate to project folder: `cd email-link-copier`
- [ ] Install dependencies: `npm install`
- [ ] Generate SSL certificate: `npx office-addin-dev-certs install`
- [ ] Start dev server: `npm start`
- [ ] Verify server running at https://localhost:3000

### Manifest Configuration
- [ ] Review manifest.xml
- [ ] Generate unique GUID for `<Id>` (production only)
- [ ] Update `DisplayName` if customizing
- [ ] Update `Description` if customizing
- [ ] Verify all URLs point to correct server (localhost:3000 for dev)

### Icon Assets (Optional)
- [ ] Create icon-16.png (16x16 pixels)
- [ ] Create icon-32.png (32x32 pixels)
- [ ] Create icon-64.png (64x64 pixels)
- [ ] Create icon-80.png (80x80 pixels)
- [ ] Save all icons in `assets/` folder

## Sideloading Checklist

### Outlook Web App
- [ ] Open outlook.office.com in Chrome
- [ ] Sign in with Microsoft 365 account
- [ ] Click Settings (gear icon)
- [ ] Navigate to "Manage add-ins"
- [ ] Click "Add from file"
- [ ] Select manifest.xml
- [ ] Accept permissions
- [ ] Verify "Email Link Copier" appears in add-ins list

### Outlook Desktop (Windows)
- [ ] Open Outlook Desktop
- [ ] Click "Get Add-ins" in ribbon
- [ ] Click "My add-ins"
- [ ] Click "Add a custom add-in" → "Add from file"
- [ ] Browse to manifest.xml
- [ ] Click Install
- [ ] Accept warning dialog
- [ ] Restart Outlook if needed

### Outlook Desktop (Mac)
- [ ] Open Outlook Desktop
- [ ] Click "Get Add-ins" in toolbar
- [ ] Click "My add-ins"
- [ ] Click "Add a custom add-in" → "Add from file"
- [ ] Select manifest.xml
- [ ] Click Install
- [ ] Restart Outlook if needed

## Basic Testing Checklist

### Functional Testing
- [ ] Open any received email
- [ ] Verify "Email Link Copier" section appears in ribbon
- [ ] Click "Copy Link" button
- [ ] Verify success notification appears
- [ ] Paste clipboard content (Ctrl+V or Cmd+V)
- [ ] Verify URL format: `https://outlook.office.com/mail/id/...`
- [ ] Click pasted URL in browser
- [ ] Verify correct email opens in Outlook Web App

### Task Pane Testing
- [ ] Open an email
- [ ] Click "Show Taskpane" button
- [ ] Verify task pane opens on right side
- [ ] Click "Copy Email Link" button
- [ ] Verify success message appears
- [ ] Verify link displays in text field
- [ ] Verify link copied to clipboard
- [ ] Test pasting the link

### Error Handling
- [ ] Try using add-in when NOT viewing an email (should fail gracefully)
- [ ] Try with draft email
- [ ] Try with email in different folder
- [ ] Verify error messages are user-friendly

## Platform Testing Checklist

### Outlook Web App (Chrome)
- [ ] Ribbon button appears
- [ ] Ribbon button works
- [ ] Task pane opens
- [ ] Task pane functions correctly
- [ ] Clipboard copying works
- [ ] Links open correctly

### Outlook Web App (Edge)
- [ ] Ribbon button appears
- [ ] Ribbon button works
- [ ] Task pane opens
- [ ] Clipboard copying works

### Outlook Desktop (Windows)
- [ ] Add-in loads without errors
- [ ] Ribbon button appears
- [ ] Quick copy works
- [ ] Task pane opens and functions

### Outlook Desktop (Mac)
- [ ] Add-in loads without errors
- [ ] Ribbon button appears
- [ ] Quick copy works
- [ ] Task pane functions correctly

## Email Type Testing Checklist

- [ ] Received emails (inbox)
- [ ] Sent emails
- [ ] Draft emails (if applicable)
- [ ] Emails in custom folders
- [ ] Emails from today
- [ ] Older emails (6+ months)
- [ ] Emails with attachments
- [ ] Emails without attachments
- [ ] HTML emails
- [ ] Plain text emails

## Azure AD Setup Checklist (Optional)

Only complete if you need Microsoft Graph API features:

### Azure Portal Configuration
- [ ] Sign in to portal.azure.com
- [ ] Navigate to Azure Active Directory
- [ ] Click "App registrations"
- [ ] Click "New registration"
- [ ] Enter name: "Email Link Copier"
- [ ] Select account types: "Any organizational directory and personal accounts"
- [ ] Set redirect URI: `https://localhost:3000/src/taskpane.html`
- [ ] Click Register
- [ ] Copy Application (client) ID

### API Permissions
- [ ] Click "API permissions"
- [ ] Click "Add a permission"
- [ ] Select "Microsoft Graph"
- [ ] Select "Delegated permissions"
- [ ] Add "Mail.Read"
- [ ] Click "Add permissions"
- [ ] Grant admin consent (if required)

### Code Configuration
- [ ] Open src/auth.js
- [ ] Replace "YOUR_CLIENT_ID_HERE" with actual Client ID
- [ ] Save file
- [ ] Restart dev server
- [ ] Test authentication flow

## Customization Checklist (Optional)

### Branding
- [ ] Update add-in name in manifest.xml
- [ ] Update description in manifest.xml
- [ ] Change button labels in manifest.xml
- [ ] Update colors in taskpane.css
- [ ] Add company logo/icons
- [ ] Customize footer

### Feature Enhancements
- [ ] Add keyboard shortcuts (if desired)
- [ ] Add link history (if desired)
- [ ] Add multiple URL formats (if desired)
- [ ] Add task manager integration (if desired)

### Production Preparation
- [ ] Generate unique GUID for manifest
- [ ] Update version number in manifest.xml
- [ ] Update version in package.json
- [ ] Remove console.log statements (if any added)
- [ ] Test production build: `npm run build`

## Pre-Deployment Checklist

### Code Quality
- [ ] All console errors resolved
- [ ] No JavaScript errors in browser console
- [ ] Error handling tested
- [ ] User feedback messages working
- [ ] Code reviewed for security issues

### Documentation
- [ ] README.md reviewed
- [ ] Setup instructions accurate
- [ ] Troubleshooting guide complete
- [ ] Architecture documented
- [ ] Customization notes added (if customized)

### Validation
- [ ] Run manifest validation: `npm run validate`
- [ ] Manifest passes validation
- [ ] All URLs correctly formatted
- [ ] All resources accessible
- [ ] Icons present and correct size

### Testing Summary
- [ ] Tested on Outlook Web App
- [ ] Tested on Outlook Desktop (Windows or Mac)
- [ ] Tested in Chrome
- [ ] Tested with different email types
- [ ] Clipboard functionality verified
- [ ] Links tested and working
- [ ] Error scenarios tested

## Deployment Checklist

### For Individual/Testing Deployment

- [ ] Dev server running
- [ ] Manifest sideloaded successfully
- [ ] Add-in appearing in Outlook
- [ ] Basic functionality working
- [ ] Users can access and use

### For Organizational Deployment

- [ ] Production build created: `npm run build`
- [ ] Files hosted on HTTPS server
- [ ] All localhost URLs updated to production URLs in manifest
- [ ] SSL certificate valid (not self-signed)
- [ ] Manifest uploaded to Microsoft 365 Admin Center
- [ ] Add-in assigned to users/groups
- [ ] Test with end users
- [ ] Feedback collected

### For Microsoft AppSource Deployment

- [ ] Production build tested thoroughly
- [ ] Unique GUID generated
- [ ] Privacy policy created
- [ ] Terms of use created
- [ ] Support documentation prepared
- [ ] Partner Center account created
- [ ] App submitted for review
- [ ] Validation feedback addressed
- [ ] App published

## Post-Deployment Checklist

### Monitoring
- [ ] User feedback mechanism established
- [ ] Error logging configured (if applicable)
- [ ] Usage analytics enabled (optional)
- [ ] Support channel identified

### Maintenance
- [ ] Update process documented
- [ ] Version control in place
- [ ] Backup of working version
- [ ] Rollback plan prepared

### User Support
- [ ] User guide distributed
- [ ] Training materials prepared (if needed)
- [ ] Support contact information shared
- [ ] FAQ document created

## Troubleshooting Verification Checklist

If issues occur, verify:

- [ ] Dev server is running (`npm start`)
- [ ] No certificate errors in browser
- [ ] Manifest.xml is valid
- [ ] All file paths are correct
- [ ] Icons exist in assets folder
- [ ] URLs match between manifest and server
- [ ] Outlook is fully restarted
- [ ] Browser cache cleared
- [ ] Firewall not blocking port 3000
- [ ] Antivirus not blocking add-in

## Security Checklist

- [ ] Only ReadItem permission used
- [ ] No sensitive data stored
- [ ] No data transmitted to external servers
- [ ] HTTPS enforced
- [ ] No hardcoded credentials
- [ ] OAuth tokens secured (if using Graph API)
- [ ] Input validation in place
- [ ] Error messages don't leak sensitive info

## Performance Checklist

- [ ] Add-in loads quickly
- [ ] No lag when clicking buttons
- [ ] Clipboard copy is instant
- [ ] Task pane opens smoothly
- [ ] No memory leaks observed
- [ ] Bundle size reasonable (<200KB)

## Accessibility Checklist (Optional)

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Screen reader compatible
- [ ] Button labels descriptive
- [ ] Error messages accessible

## Final Pre-Production Checklist

Before going live:

- [ ] All tests passed
- [ ] No critical bugs
- [ ] Documentation complete
- [ ] Users trained (if applicable)
- [ ] Support ready
- [ ] Rollback plan ready
- [ ] Stakeholder approval obtained
- [ ] Production deployment scheduled

## Success Criteria

The add-in is ready for production when:

- [ ] Installs without errors
- [ ] Functions reliably
- [ ] Works on all required platforms
- [ ] Users can operate without help
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Documentation is complete
- [ ] Support is in place

---

## Quick Reference

**Start Development:**
```bash
npm install
npx office-addin-dev-certs install
npm start
```

**Validate Manifest:**
```bash
npm run validate
```

**Build for Production:**
```bash
npm run build
```

**Sideload Location:**
- Outlook Web App: Settings → Manage add-ins → Add from file
- Outlook Desktop: Get Add-ins → My add-ins → Add from file

**Test URL:**
`https://localhost:3000`

**Common Files to Check:**
- `manifest.xml` - Add-in configuration
- `src/taskpane.js` - Main functionality
- `src/commands.js` - Ribbon commands
- `webpack.config.js` - Build settings

---

Use this checklist to ensure nothing is missed during setup, testing, and deployment!
