# Frequently Asked Questions (FAQ)

## General Questions

### What does this add-in do?

The Email Link Copier allows you to quickly copy a direct URL to any email in your Outlook mailbox. This URL can be pasted into task managers, documentation, chat messages, or anywhere else you need to reference a specific email.

### Is this free to use?

Yes, the code is provided under the MIT license. You can use, modify, and distribute it freely.

### Do I need to be a developer to use this?

No, but basic command-line knowledge helps. Follow the QUICKSTART.md guide for step-by-step instructions.

### Will this work with my email account?

The add-in works with Microsoft 365 (Office 365) accounts that use Exchange Online. It does NOT work with:
- Gmail
- Yahoo Mail
- Other non-Microsoft email services
- On-premises Exchange (without modifications)

## Installation Questions

### How do I install the add-in?

See QUICKSTART.md for a 5-minute installation guide, or SETUP_GUIDE.md for detailed instructions.

### Do I need admin permissions to install?

No, for individual sideloading. Yes, for organization-wide deployment.

### Can I install this on my work computer?

Check with your IT department. Some organizations restrict custom add-ins.

### Why do I need Node.js?

Node.js runs the development server and build tools. It's only needed during development/setup, not for using the add-in.

### The installation failed. What should I do?

1. Check error messages in the terminal
2. Ensure Node.js is installed: `node --version`
3. Try deleting `node_modules` and running `npm install` again
4. Check the troubleshooting section in SETUP_GUIDE.md

## Technical Questions

### Where is my email data stored?

Nowhere. The add-in generates links locally in your browser. No data is stored or transmitted.

### Is my email data secure?

Yes. The add-in only accesses the email ID (not content) and works entirely client-side.

### What permissions does the add-in require?

Only "ReadItem" - the minimum permission to read email metadata. It cannot:
- Read email content
- Send emails
- Delete emails
- Modify emails
- Access other emails

### Does this work offline?

The add-in itself requires internet, but the main limitation is that generated links need internet to open.

### Will the links expire?

No, as long as the email exists in your mailbox, the link will work.

### Can I share these links with others?

Yes, but recipients need:
1. A Microsoft 365 account
2. Access to the email (same mailbox or shared mailbox)
3. To be signed in when clicking the link

### What happens if I delete the email?

The link will no longer work - it will return a "not found" error.

## Usage Questions

### How do I copy an email link?

1. Open the email
2. Click "Copy Link" in the ribbon, OR
3. Click "Show Taskpane" → "Copy Email Link"

### The button doesn't appear. What's wrong?

- Ensure dev server is running: `npm start`
- Restart Outlook completely
- Clear cache (Web App) or reinstall add-in
- Check console (F12) for errors

### Can I copy links to multiple emails at once?

Not in the current version. Each link must be copied individually.

### Does this work with draft emails?

It may work with saved drafts, but links are primarily intended for sent/received emails.

### Can I customize the link format?

Yes! See CUSTOMIZATION.md for instructions on changing URL formats.

### The copied link doesn't work. Why?

- Verify you're signed into the same Microsoft 365 account
- Check the email still exists in your mailbox
- Try opening in an incognito/private window
- Ensure the link wasn't truncated when pasting

## Platform Questions

### Which versions of Outlook are supported?

- Outlook 2016 or later (Windows/Mac)
- Outlook on the web (all browsers)
- Outlook mobile is NOT supported (Office Add-ins limitation)

### Which browsers work with Outlook Web App?

- Chrome (recommended)
- Edge
- Safari
- Firefox

### Can I use this on my phone?

No, Office Add-ins don't support mobile Outlook apps.

### Does it work on Mac?

Yes, both Outlook Desktop for Mac and Outlook Web App work.

### What about Outlook on iPad/iPhone?

No, mobile Outlook apps don't support Office Add-ins.

## Development Questions

### Can I modify the source code?

Yes! The code is open source (MIT license). See CUSTOMIZATION.md for common modifications.

### How do I change the colors/styling?

Edit `src/taskpane.css`. See CUSTOMIZATION.md for examples.

### How do I add my company logo?

1. Create icon PNG files (16x16, 32x32, 64x64, 80x80 pixels)
2. Save in `assets/` folder
3. Reference in manifest.xml

### Can I add more features?

Absolutely! The architecture is designed to be extensible. See ARCHITECTURE.md for technical details.

### How do I deploy this to my organization?

See the "Deployment" section in README.md for three deployment options.

### Do I need to host this on a server?

For development: No (localhost works)
For production: Yes (HTTPS server required)

## Troubleshooting Questions

### Certificate errors appear. How do I fix this?

```bash
npx office-addin-dev-certs install --force
```

Then restart Outlook.

### The add-in loads but the button does nothing. Why?

1. Check browser console (F12) for errors
2. Verify you're viewing an email (not composing)
3. Try a different email
4. Restart the dev server

### Changes I made don't appear. What should I do?

1. Hard refresh browser (Ctrl+Shift+R)
2. Restart dev server
3. Clear browser cache
4. Close and reopen Outlook

### I get "Failed to get email ID" error. Why?

- Ensure you're viewing a received or sent email
- Not all items in Outlook are emails (calendar items, contacts won't work)
- Try with a different email

### The clipboard copy fails. What's wrong?

- Modern clipboard API requires HTTPS (dev server uses HTTPS)
- Some browsers require granting clipboard permissions
- Check browser's site settings for clipboard access
- Try the fallback: manually copy from the displayed link

### Port 3000 is already in use. How do I change it?

1. Edit `webpack.config.js` - change port to 3001 (or any free port)
2. Update ALL URLs in `manifest.xml` to use new port
3. Restart dev server

## Azure AD / Graph API Questions

### Do I need Azure AD?

No, the add-in works without Azure AD using Office.js. Azure AD is only needed for extended Graph API features.

### How do I get a Client ID?

1. Register an app in Azure Portal
2. Go to Azure Active Directory → App registrations
3. The Application (client) ID is displayed on the overview page

### What if I don't have access to Azure Portal?

Contact your IT administrator or use the add-in without Graph API features.

### The authentication popup is blocked. What should I do?

- Allow popups for localhost:3000 in browser settings
- Or disable popup blocker temporarily
- Use a different browser

## Deployment Questions

### How do I publish this to my organization?

1. Build production version: `npm run build`
2. Host files on HTTPS server
3. Update manifest.xml URLs to production URLs
4. Upload manifest to Microsoft 365 Admin Center
5. Assign to users

### Can I publish to Microsoft AppSource?

Yes, but requires:
- Additional validation and compliance work (~16 hours)
- Partner Center account
- Privacy policy, terms of use
- Microsoft approval process

### How do users update to a new version?

- Sideloaded: Users must manually reload manifest
- Org deployment: Admin pushes update
- AppSource: Automatic updates

### Can I charge for this add-in?

The source code is MIT licensed (free), but you can offer it as a paid service if you add value (hosting, support, customization, etc.).

## Performance Questions

### Is the add-in slow?

No, it should be nearly instant. If slow:
- Check internet connection
- Look for errors in console
- Restart dev server
- Clear browser cache

### Does it affect Outlook performance?

No, the add-in is lightweight and only loads when activated.

### How big is the download?

Total bundle size is ~90KB (gzipped), which loads very quickly.

## Privacy & Security Questions

### Does this add-in send my data anywhere?

No. Everything happens locally in your browser. No external servers are contacted.

### Can you see my emails?

No. The add-in developer (or anyone else) cannot see your emails or data.

### Is the clipboard access safe?

Yes. The clipboard API is a standard browser feature. The add-in only writes to clipboard when you click the button.

### What about GDPR compliance?

The add-in doesn't collect, store, or process personal data, so GDPR isn't a concern. However, if you modify it to add analytics or logging, you'll need to ensure GDPR compliance.

### Should I trust self-signed certificates?

For development (localhost), yes. For production, use a proper SSL certificate from a trusted authority.

## Customization Questions

### Can I change the add-in name?

Yes, edit `DisplayName` in manifest.xml.

### Can I change what gets copied?

Yes, modify the `copyEmailLinkToClipboard()` function in `src/taskpane.js`. See CUSTOMIZATION.md for examples.

### Can I add a keyboard shortcut?

Yes! See CUSTOMIZATION.md for implementation details.

### Can I change the URL format?

Yes, edit the URL generation code in `src/taskpane.js` and `src/commands.js`.

## Support Questions

### Where can I get help?

1. Check this FAQ
2. Read SETUP_GUIDE.md troubleshooting section
3. Review browser console errors (F12)
4. Check Office Add-ins documentation
5. Search online for specific error messages

### How do I report a bug?

Document the issue with:
- Steps to reproduce
- Expected vs actual behavior
- Browser/Outlook version
- Console errors (F12)

### Can I request new features?

Yes! Review ARCHITECTURE.md to understand the codebase, then implement or propose features.

### Is there commercial support available?

This is an open-source project without official support, but you can hire developers to customize or support it.

## Miscellaneous Questions

### Why "REST ID" vs "EWS ID"?

Outlook uses different ID formats internally. The add-in converts from EWS (Exchange Web Services) format to REST format for web URLs.

### Can I integrate with other apps?

Yes! The add-in can be customized to POST links to task managers, CRMs, or other systems. See CUSTOMIZATION.md.

### What's the difference between the ribbon button and task pane?

- **Ribbon button**: Quick one-click copy
- **Task pane**: Shows UI with the link, allows manual copy

Both do the same thing, just different interfaces.

### Why localhost:3000?

That's the default webpack dev server port. You can change it if needed.

### Do I need webpack?

For development, yes (it's configured for you). For simple hosting, you could skip it and use plain HTML/JS.

### Can I use this with shared mailboxes?

Yes, if you have access to the shared mailbox in Outlook, the add-in will work.

### What happens if my internet cuts out?

The add-in won't work without internet since it needs to connect to Office.js libraries and Outlook services.

### Can I translate this to other languages?

Yes, but you'd need to:
1. Translate all UI text in HTML files
2. Add localization to manifest.xml
3. Potentially implement language detection

### Why do I see "localhost" in the manifest?

That's for development. For production, replace with your production server URL.

---

## Still Have Questions?

1. Read the relevant documentation:
   - QUICKSTART.md - Quick installation
   - SETUP_GUIDE.md - Detailed setup and troubleshooting
   - ARCHITECTURE.md - Technical details
   - CUSTOMIZATION.md - Modification guide

2. Check browser console (F12) for error messages

3. Search Office Add-ins documentation

4. Try the solution with default settings first before customizing

---

**Quick Links:**
- [Office Add-ins Docs](https://docs.microsoft.com/office/dev/add-ins/)
- [Office.js API](https://docs.microsoft.com/javascript/api/office)
- [Outlook Add-ins](https://docs.microsoft.com/office/dev/add-ins/outlook/)
