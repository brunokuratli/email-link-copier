# Email Link Copier - Architecture Documentation

## Overview

The Email Link Copier is a client-side Outlook Add-in built using Office.js that generates and copies email URLs to the clipboard. The add-in follows Microsoft's Office Add-ins framework and runs entirely in the browser context.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Outlook Client                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Ribbon UI                                              │ │
│  │  ┌──────────────┐  ┌──────────────┐                   │ │
│  │  │ Copy Link    │  │ Show         │                   │ │
│  │  │ Button       │  │ Taskpane     │                   │ │
│  │  └──────┬───────┘  └──────┬───────┘                   │ │
│  └─────────┼──────────────────┼───────────────────────────┘ │
│            │                  │                              │
│            ▼                  ▼                              │
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │ commands.js     │  │ Task Pane UI                     │  │
│  │ (ExecuteFunction)│  │ (taskpane.html/js/css)          │  │
│  └─────────┬───────┘  └─────────┬───────────────────────┘  │
│            │                     │                           │
│            └──────────┬──────────┘                           │
│                       ▼                                      │
│              ┌────────────────────┐                          │
│              │   Office.js API    │                          │
│              │ ┌────────────────┐ │                          │
│              │ │ Get Item ID    │ │                          │
│              │ │ Convert to REST│ │                          │
│              │ │ Format Link    │ │                          │
│              │ └────────────────┘ │                          │
│              └─────────┬──────────┘                          │
│                        │                                     │
│                        ▼                                     │
│              ┌────────────────────┐                          │
│              │  Clipboard API     │                          │
│              │  (navigator.       │                          │
│              │   clipboard)       │                          │
│              └────────────────────┘                          │
└─────────────────────────────────────────────────────────────┘

Optional (Graph API Extension):
                        │
                        ▼
              ┌────────────────────┐
              │   MSAL.js          │
              │   (OAuth 2.0)      │
              └─────────┬──────────┘
                        │
                        ▼
              ┌────────────────────┐
              │ Microsoft Graph    │
              │ API                │
              │ (me/messages)      │
              └────────────────────┘
```

## Component Breakdown

### 1. Manifest (manifest.xml)

**Purpose**: Defines the add-in's metadata, permissions, and integration points.

**Key Sections**:
- **Metadata**: ID, version, name, description
- **Hosts**: Specifies Mailbox (Outlook) as host
- **Requirements**: Minimum Mailbox API version (1.1)
- **Permissions**: ReadItem (minimal required)
- **Extension Points**: Ribbon buttons and task pane
- **Resources**: Button labels, icons, URLs

**Integration Points**:
- Message Read Command Surface (ribbon buttons)
- Task Pane activation

### 2. Task Pane Interface

#### taskpane.html
**Purpose**: User interface for the task pane view.

**Components**:
- Header with title
- Status message container
- Copy button (primary action)
- Link display field (shows generated URL)
- Info section (usage instructions)

**Dependencies**:
- Office.js (Microsoft Office API)
- MSAL.js (Authentication library)
- taskpane.css (styling)
- taskpane.js (functionality)

#### taskpane.css
**Purpose**: Styling for the task pane interface.

**Design Principles**:
- Microsoft Fluent Design influence
- Accessible color contrast
- Responsive layout
- Clear visual feedback for actions

**Key Elements**:
- Microsoft blue (#0078d4) for primary actions
- Success/error message styling
- Monospace font for URL display
- Information callout styling

#### taskpane.js
**Purpose**: Core functionality for task pane interactions.

**Key Functions**:

```javascript
Office.onReady()
// Initializes Office.js and sets up event handlers

getEmailLink()
// 1. Gets item ID from Office.context.mailbox.item
// 2. Converts to REST format using convertToRestId()
// 3. Formats URL: https://outlook.office.com/mail/id/{restId}
// Returns: Promise<string>

copyToClipboard(text)
// 1. Tries navigator.clipboard.writeText() (modern API)
// 2. Falls back to document.execCommand('copy')
// Returns: Promise<boolean>

copyEmailLinkToClipboard()
// Orchestrates: getEmailLink() → displayEmailLink() → copyToClipboard()
// Shows status messages for user feedback

showStatus(message, isError)
// Displays temporary success/error messages

displayEmailLink(link)
// Shows the generated URL in the UI
```

### 3. Command Functions

#### commands.html
**Purpose**: Host page for function commands (ribbon buttons).

**Note**: Must be minimal, loads only Office.js and commands.js.

#### commands.js
**Purpose**: Handles ribbon button click actions.

**Key Functions**:

```javascript
copyEmailLink(event)
// Triggered by ribbon "Copy Link" button
// 1. Gets email ID
// 2. Converts to REST format
// 3. Generates URL
// 4. Copies to clipboard
// 5. Shows notification
// 6. Calls event.completed() (required for function commands)

showNotification(title, message)
// Uses Office notification API to show in-app messages
```

**Important**: Function commands must call `event.completed()` to signal completion.

### 4. Authentication (Optional)

#### auth.js
**Purpose**: Microsoft Graph API authentication using OAuth 2.0.

**Note**: The add-in works without this using Office.js alone. Include for Graph API features.

**Key Functions**:

```javascript
initializeMsal()
// Initializes MSAL PublicClientApplication

getAccessToken()
// 1. Checks for cached accounts
// 2. Attempts silent token acquisition
// 3. Falls back to popup login
// Returns: Promise<string> (access token)

getEmailIdFromGraph(itemId)
// Fetches email metadata from Microsoft Graph
// Endpoint: GET /me/messages/{itemId}
```

**Configuration**:
```javascript
msalConfig = {
  auth: {
    clientId: "...",  // Azure AD App ID
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://localhost:3000/src/taskpane.html"
  },
  cache: {
    cacheLocation: "localStorage"
  }
}
```

## Data Flow

### Primary Flow: Copy Email Link

```
User opens email
    ↓
User clicks "Copy Link" button
    ↓
commands.js: copyEmailLink() triggered
    ↓
Office.js: item.getItemIdAsync()
    ↓
Get email's unique identifier (EWS format)
    ↓
Office.js: convertToRestId()
    ↓
Convert to REST API format
    ↓
Format URL: https://outlook.office.com/mail/id/{restId}
    ↓
navigator.clipboard.writeText(url)
    ↓
Copy to clipboard
    ↓
Show success notification
    ↓
event.completed()
```

### Alternative Flow: Task Pane

```
User opens email
    ↓
User clicks "Show Taskpane"
    ↓
taskpane.html loads in side panel
    ↓
Office.onReady() initializes
    ↓
User clicks "Copy Email Link" button
    ↓
taskpane.js: copyEmailLinkToClipboard()
    ↓
[Same flow as above for getting/converting ID]
    ↓
displayEmailLink(url) - shows in UI
    ↓
copyToClipboard(url)
    ↓
showStatus() - display feedback
```

## API Integration

### Office.js APIs Used

| API | Purpose | Documentation |
|-----|---------|---------------|
| `Office.context.mailbox.item` | Access current email | [Link](https://docs.microsoft.com/javascript/api/outlook/office.messageread) |
| `getItemIdAsync()` | Get email unique ID | [Link](https://docs.microsoft.com/javascript/api/outlook/office.messageread#getitemidasync) |
| `convertToRestId()` | Convert to REST format | [Link](https://docs.microsoft.com/javascript/api/outlook/office.mailbox#converttorestid) |
| `notificationMessages.addAsync()` | Show notifications | [Link](https://docs.microsoft.com/javascript/api/outlook/office.notificationmessages) |

### Email ID Formats

Office.js uses different ID formats:

1. **EWS Format** (Exchange Web Services)
   - Returned by `getItemIdAsync()`
   - Long, encoded string
   - Example: `AAMkAGVmMDEzM...` (very long)

2. **REST Format** (REST API/Graph API)
   - Converted using `convertToRestId()`
   - Shorter, URL-friendly
   - Used in Outlook Web App URLs
   - Example: `AAMkAGI3...` (shorter)

### URL Structure

Generated URL format:
```
https://outlook.office.com/mail/id/<REST_ID>
```

This URL:
- Opens in Outlook Web App
- Directly navigates to the specific email
- Requires user to be signed in
- Works across different mailboxes if user has access

## Build System

### Webpack Configuration

**Purpose**: Bundle and serve the add-in files.

**Key Features**:
- Multiple entry points (taskpane, commands)
- HTTPS dev server (required for Office Add-ins)
- Hot module replacement for development
- HTML generation with HtmlWebpackPlugin
- Asset copying with CopyWebpackPlugin

**Dev Server**:
```javascript
devServer: {
  port: 3000,
  server: 'https',  // Required for Office Add-ins
  hot: true         // Live reload during development
}
```

**Output**:
```
dist/
├── taskpane.html
├── taskpane.bundle.js
├── commands.html
├── commands.bundle.js
├── manifest.xml
└── assets/
    └── [icons]
```

## Security Considerations

### Permissions

**ReadItem**: Minimal permission required
- Allows reading current email metadata
- Cannot access email content/body
- Cannot access other emails
- Cannot modify anything

### Data Privacy

- No email data stored or transmitted
- Email URLs generated client-side only
- No external API calls (except optional Graph API)
- All processing happens in browser

### HTTPS Requirement

- Office Add-ins must use HTTPS
- Development: Self-signed certificate
- Production: Valid SSL certificate required

### Authentication (Graph API)

- OAuth 2.0 flow
- Tokens stored in browser localStorage
- Silent token refresh when possible
- Popup fallback for expired tokens

## Extension Points

### Adding Features

The architecture supports extensions:

1. **Batch Operations**: Copy multiple email links
   - Add multi-select UI
   - Iterate through selected items
   - Concatenate URLs

2. **Custom Formats**: Different URL formats
   - Add format options in UI
   - Support teams:// or other protocols
   - Template-based URL generation

3. **Link History**: Track copied links
   - Add localStorage persistence
   - Display history in task pane
   - Allow re-copying from history

4. **Keyboard Shortcuts**: Hotkey support
   - Register keyboard event handlers
   - Define custom shortcuts
   - Handle in commands.js

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Load MSAL only when needed
2. **Caching**: Cache converted IDs temporarily
3. **Debouncing**: Prevent rapid repeated clicks
4. **Bundle Size**: Minimize dependencies

### Current Bundle Sizes

- Taskpane bundle: ~50KB (gzipped)
- Commands bundle: ~40KB (gzipped)
- Total: ~90KB initial load

## Testing Strategy

### Unit Testing (Future)

Potential test coverage:
- `getEmailLink()` - mock Office.js
- `copyToClipboard()` - mock clipboard API
- URL format validation
- Error handling paths

### Integration Testing

Manual testing checklist:
- [ ] Outlook Desktop (Windows)
- [ ] Outlook Desktop (Mac)
- [ ] Outlook Web App (Chrome)
- [ ] Outlook Web App (Edge)
- [ ] Different email types
- [ ] Error scenarios

### Browser Compatibility

Tested browsers:
- Chrome 90+ (primary)
- Edge 90+
- Safari 14+
- Firefox 88+

## Deployment Models

### Model 1: Individual Sideloading
- Users load manifest.xml manually
- No centralized deployment
- Immediate availability

### Model 2: Organizational Deployment
- IT admin deploys organization-wide
- Centralized in Microsoft 365 Admin Center
- Automatic updates possible

### Model 3: AppSource Distribution
- Public listing in Microsoft Store
- Requires validation and approval
- Wider audience reach

## Maintenance

### Update Process

1. Make code changes
2. Update version in manifest.xml
3. Test thoroughly
4. Build production bundle
5. Deploy updated files
6. Users get updates on next load

### Monitoring

Recommended monitoring:
- Browser console errors (developer tools)
- User feedback collection
- Usage analytics (optional)
- Error logging (optional)

## Future Architecture Improvements

Potential enhancements:

1. **TypeScript**: Add type safety
2. **React**: Modern UI framework
3. **State Management**: Redux or similar
4. **Unit Tests**: Jest + Testing Library
5. **CI/CD**: Automated builds and deployment
6. **Error Tracking**: Sentry or Application Insights
7. **Analytics**: Usage tracking and metrics

## Conclusion

The Email Link Copier uses a straightforward architecture:
- Client-side only (no server required)
- Office.js for Outlook integration
- Standard web technologies (HTML/CSS/JS)
- Optional Graph API for extended features
- Webpack for building and bundling

This design prioritizes:
- Simplicity and maintainability
- Security and privacy
- Cross-platform compatibility
- Minimal dependencies
