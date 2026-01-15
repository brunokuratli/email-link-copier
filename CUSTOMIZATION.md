# Customization Guide

This guide explains how to customize the Email Link Copier add-in for your specific needs.

## Basic Customization

### Change Add-in Name and Description

Edit `manifest.xml`:

```xml
<DisplayName DefaultValue="Your Custom Name Here"/>
<Description DefaultValue="Your custom description here"/>
```

### Change Button Labels

Edit the Resources section in `manifest.xml`:

```xml
<bt:ShortStrings>
  <bt:String id="ActionButton.Label" DefaultValue="Copy Link"/>
  <!-- Change to: -->
  <bt:String id="ActionButton.Label" DefaultValue="Get Email URL"/>
</bt:ShortStrings>

<bt:LongStrings>
  <bt:String id="ActionButton.Tooltip" DefaultValue="Copy the current email's URL to clipboard"/>
  <!-- Customize tooltip text -->
</bt:LongStrings>
```

### Change Colors and Styling

Edit `src/taskpane.css`:

```css
/* Primary button color (currently Microsoft blue) */
.action-button {
    background-color: #0078d4;  /* Change this */
}

.action-button:hover {
    background-color: #005a9e;  /* And this */
}

/* Header title color */
h1 {
    color: #0078d4;  /* Change this */
}
```

### Add Your Company Logo/Icons

1. Create PNG files with these dimensions:
   - `icon-16.png` (16x16 pixels)
   - `icon-32.png` (32x32 pixels)
   - `icon-64.png` (64x64 pixels)
   - `icon-80.png` (80x80 pixels)

2. Save them in the `assets/` folder

3. Icons are automatically referenced in `manifest.xml`

## Advanced Customization

### Change URL Format

Edit `src/taskpane.js` and `src/commands.js`:

```javascript
// Current format:
const emailLink = `https://outlook.office.com/mail/id/${restId}`;

// Example: Add query parameters
const emailLink = `https://outlook.office.com/mail/id/${restId}?view=read`;

// Example: Use different domain
const emailLink = `https://outlook.office365.com/mail/id/${restId}`;

// Example: Add custom prefix
const emailLink = `outlook://${restId}`;  // Desktop app protocol
```

### Add Additional Information to Clipboard

Modify `copyEmailLinkToClipboard()` in `src/taskpane.js`:

```javascript
async function copyEmailLinkToClipboard() {
    try {
        const emailLink = await getEmailLink();

        // Get additional email info
        const subject = Office.context.mailbox.item.subject;
        const from = Office.context.mailbox.item.from;

        // Format with additional info
        const formattedText = `
Email: ${subject}
From: ${from.displayName}
Link: ${emailLink}
        `.trim();

        displayEmailLink(emailLink);
        const copied = await copyToClipboard(formattedText);

        if (copied) {
            showStatus("Email info copied to clipboard!");
        } else {
            showStatus("Failed to copy. Please copy manually.", true);
        }
    } catch (error) {
        console.error("Error:", error);
        showStatus("Error: " + error.message, true);
    }
}
```

### Change Port Number

If port 3000 is already in use:

1. Edit `webpack.config.js`:
```javascript
devServer: {
    port: 3001,  // Change to any available port
    // ...
}
```

2. Update ALL URLs in `manifest.xml`:
```xml
<!-- Find and replace all instances of -->
https://localhost:3000
<!-- with -->
https://localhost:3001
```

### Add Keyboard Shortcut

Add to `src/taskpane.js`:

```javascript
Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
        document.getElementById("copyLinkBtn").onclick = copyEmailLinkToClipboard;

        // Add keyboard shortcut (Ctrl+Shift+C or Cmd+Shift+C)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                copyEmailLinkToClipboard();
            }
        });
    }
});
```

### Add Link History

Add to `src/taskpane.js`:

```javascript
// Store last 10 copied links
function saveToHistory(link) {
    let history = JSON.parse(localStorage.getItem('emailLinkHistory') || '[]');
    history.unshift({
        link: link,
        timestamp: new Date().toISOString(),
        subject: Office.context.mailbox.item.subject
    });
    history = history.slice(0, 10);  // Keep only last 10
    localStorage.setItem('emailLinkHistory', JSON.stringify(history));
}

// Display history in UI
function showHistory() {
    const history = JSON.parse(localStorage.getItem('emailLinkHistory') || '[]');
    // Add UI code to display history
}
```

### Add Multiple URL Formats

Add format selector to `src/taskpane.html`:

```html
<select id="formatSelector">
    <option value="web">Outlook Web</option>
    <option value="desktop">Outlook Desktop</option>
    <option value="markdown">Markdown Link</option>
</select>
```

Update `src/taskpane.js`:

```javascript
function formatEmailLink(restId, format) {
    const subject = Office.context.mailbox.item.subject;

    switch(format) {
        case 'web':
            return `https://outlook.office.com/mail/id/${restId}`;
        case 'desktop':
            return `outlook:${restId}`;
        case 'markdown':
            return `[${subject}](https://outlook.office.com/mail/id/${restId})`;
        default:
            return `https://outlook.office.com/mail/id/${restId}`;
    }
}
```

### Add Auto-Copy Option

Add checkbox to `src/taskpane.html`:

```html
<label>
    <input type="checkbox" id="autoCopy" />
    Auto-copy when email opens
</label>
```

Add to `src/taskpane.js`:

```javascript
Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
        document.getElementById("copyLinkBtn").onclick = copyEmailLinkToClipboard;

        // Check if auto-copy is enabled
        Office.context.mailbox.addHandlerAsync(
            Office.EventType.ItemChanged,
            () => {
                if (document.getElementById('autoCopy').checked) {
                    copyEmailLinkToClipboard();
                }
            }
        );
    }
});
```

## Branding Customization

### Custom Header

Edit `src/taskpane.html`:

```html
<header>
    <img src="../assets/logo.png" alt="Logo" style="height: 30px;" />
    <h1>Your Company Name</h1>
</header>
```

### Custom Footer

Add to `src/taskpane.html` before `</main>`:

```html
<footer class="footer">
    <p>© 2026 Your Company</p>
    <a href="https://yourcompany.com/support">Support</a>
</footer>
```

Add styles in `src/taskpane.css`:

```css
.footer {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: center;
    font-size: 12px;
    color: #666;
}
```

## Deployment Customization

### Generate Unique Add-in ID

Before deploying:

1. Visit [guidgenerator.com](https://www.guidgenerator.com/)
2. Generate a new GUID (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
3. Replace in `manifest.xml`:

```xml
<Id>a1b2c3d4-e5f6-7890-abcd-ef1234567890</Id>
```

### Production URLs

For production deployment, update ALL URLs in `manifest.xml`:

```xml
<!-- Change from -->
https://localhost:3000/src/taskpane.html

<!-- To your production URL -->
https://yourdomain.com/email-link-copier/src/taskpane.html
```

## Testing Your Customizations

After making changes:

1. **Restart dev server**:
   ```bash
   # Press Ctrl+C to stop
   npm start
   ```

2. **Reload the add-in**:
   - Close and reopen Outlook
   - Or refresh the task pane (if using Outlook Web App)

3. **Check browser console** (F12) for errors

4. **Validate manifest**:
   ```bash
   npm run validate
   ```

## Common Customization Scenarios

### Scenario 1: Add Company Branding

1. Change colors in `taskpane.css` to match brand
2. Add company logo to `assets/`
3. Update header in `taskpane.html`
4. Change add-in name in `manifest.xml`

### Scenario 2: Multiple Email Formats

1. Add format selector dropdown to `taskpane.html`
2. Create format functions in `taskpane.js`
3. Update copy function to use selected format
4. Save user's preferred format in localStorage

### Scenario 3: Integration with Task Manager

1. Add API endpoint configuration
2. Create function to post to task manager API
3. Add button: "Copy & Create Task"
4. Handle API authentication and errors

Example:

```javascript
async function createTask(emailLink, subject) {
    const response = await fetch('https://api.taskmanager.com/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_TOKEN'
        },
        body: JSON.stringify({
            title: subject,
            description: emailLink,
            source: 'outlook'
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return await response.json();
}
```

## Troubleshooting Customizations

### Changes Not Appearing

1. Hard refresh the browser (Ctrl+Shift+R)
2. Clear browser cache
3. Restart Outlook completely
4. Check for JavaScript errors in console

### Manifest Validation Errors

```bash
npm run validate
```

Common issues:
- Invalid XML syntax
- URLs don't match (localhost vs production)
- Missing required fields
- Icon files not found

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear webpack cache
rm -rf dist
npm start
```

## Best Practices

1. **Test thoroughly** after each customization
2. **Keep backups** of working versions
3. **Version control** - use Git to track changes
4. **Document** your customizations
5. **Validate manifest** before deploying
6. **Test on multiple platforms** (Desktop, Web, different browsers)

## Getting Help

If you encounter issues with customizations:

1. Check browser console for errors (F12)
2. Review SETUP_GUIDE.md troubleshooting section
3. Validate your manifest: `npm run validate`
4. Test with the original code to isolate the issue
5. Check Office Add-ins documentation

## Additional Resources

- [Office Add-ins Documentation](https://docs.microsoft.com/office/dev/add-ins/)
- [Manifest Reference](https://docs.microsoft.com/office/dev/add-ins/reference/manifest/overview)
- [Office.js API](https://docs.microsoft.com/javascript/api/office)
- [Fluent UI (Microsoft Design)](https://developer.microsoft.com/fluentui)
