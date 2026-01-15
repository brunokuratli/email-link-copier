# Email Link Copier - Documentation Index

Welcome to the Email Link Copier Outlook Add-in documentation. This index helps you find the right document for your needs.

## Quick Navigation

### 🚀 Getting Started
- **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
- **[README.md](README.md)** - Project overview and main documentation

### 📖 Detailed Guides
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete installation and configuration guide
- **[CHECKLIST.md](CHECKLIST.md)** - Step-by-step checklists for setup and deployment

### 🛠️ Development
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and design
- **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - How to modify and extend the add-in

### 📋 Reference
- **[FAQ.md](FAQ.md)** - Frequently asked questions
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview

## Choose Your Path

### I just want to install and use it
1. Start with **QUICKSTART.md**
2. If issues arise, check **FAQ.md**
3. For detailed help, see **SETUP_GUIDE.md**

### I want to customize it
1. Read **README.md** for overview
2. Follow **QUICKSTART.md** to get it running
3. Use **CUSTOMIZATION.md** for modifications
4. Check **ARCHITECTURE.md** for technical details

### I want to deploy it organization-wide
1. Read **README.md** deployment section
2. Follow **SETUP_GUIDE.md** for setup
3. Use **CHECKLIST.md** for deployment steps
4. Refer to **FAQ.md** for common issues

### I want to understand how it works
1. Start with **ARCHITECTURE.md**
2. Review **README.md** for context
3. Check **PROJECT_SUMMARY.md** for overview
4. Examine source code in `src/` folder

## Document Descriptions

### QUICKSTART.md
**Purpose**: Get the add-in running as fast as possible
**Audience**: Everyone
**When to use**: First time setup

### README.md
**Purpose**: Main project documentation
**Audience**: Everyone
**When to use**: Overview and reference

### SETUP_GUIDE.md
**Purpose**: Detailed installation and troubleshooting
**Audience**: Users and administrators
**When to use**: Detailed setup or when troubleshooting

### ARCHITECTURE.md
**Purpose**: Technical design and implementation details
**Audience**: Developers
**When to use**: Understanding code structure or extending features

### CUSTOMIZATION.md
**Purpose**: How to modify and extend the add-in
**Audience**: Developers
**When to use**: Making changes to the add-in

### CHECKLIST.md
**Purpose**: Step-by-step verification checklists
**Audience**: Users and administrators
**When to use**: Systematic setup and deployment

### FAQ.md
**Purpose**: Common questions and answers
**Audience**: Everyone
**When to use**: Quick answers to specific questions

### PROJECT_SUMMARY.md
**Purpose**: Complete project status and overview
**Audience**: Project managers and stakeholders
**When to use**: Understanding project scope and status

## File Structure Reference

### Documentation Files
```
email-link-copier/
├── INDEX.md              ← You are here
├── QUICKSTART.md         ← 5-minute setup
├── README.md             ← Main documentation
├── SETUP_GUIDE.md        ← Detailed guide
├── ARCHITECTURE.md       ← Technical docs
├── CUSTOMIZATION.md      ← How to customize
├── CHECKLIST.md          ← Setup checklists
├── FAQ.md                ← Common questions
└── PROJECT_SUMMARY.md    ← Project overview
```

### Source Code Files
```
src/
├── taskpane.html         ← Task pane UI
├── taskpane.js           ← Main functionality
├── taskpane.css          ← Styling
├── commands.html         ← Commands page
├── commands.js           ← Ribbon button logic
└── auth.js               ← Authentication (optional)
```

### Configuration Files
```
email-link-copier/
├── manifest.xml          ← Add-in manifest
├── package.json          ← Dependencies
├── webpack.config.js     ← Build configuration
└── .gitignore           ← Git ignore rules
```

## Common Tasks

### Install the Add-in
**Documents**: QUICKSTART.md → SETUP_GUIDE.md
**Time**: 5-15 minutes

### Troubleshoot Installation
**Documents**: FAQ.md → SETUP_GUIDE.md (Troubleshooting section)
**Time**: 5-30 minutes

### Change Add-in Name
**Documents**: CUSTOMIZATION.md (Change Add-in Name section)
**Time**: 2 minutes

### Change Colors/Styling
**Documents**: CUSTOMIZATION.md (Change Colors and Styling section)
**Time**: 5 minutes

### Add Company Logo
**Documents**: CUSTOMIZATION.md (Add Your Company Logo/Icons section)
**Time**: 10 minutes

### Deploy to Organization
**Documents**: README.md (Deployment section) → CHECKLIST.md
**Time**: 1-2 hours

### Understand Code Structure
**Documents**: ARCHITECTURE.md → Source code files
**Time**: 30-60 minutes

### Add New Feature
**Documents**: ARCHITECTURE.md → CUSTOMIZATION.md → Source code
**Time**: Varies by feature

## Support Flow

```
Have a question?
    ↓
Check FAQ.md
    ↓
Answer found? → Done!
    ↓ (No)
Check relevant guide:
  - Setup issue? → SETUP_GUIDE.md
  - Customization? → CUSTOMIZATION.md
  - Technical? → ARCHITECTURE.md
    ↓
Answer found? → Done!
    ↓ (No)
Check browser console (F12)
Review error messages
Search Office Add-ins docs
```

## Learning Path

### Beginner Path
1. **QUICKSTART.md** - Install the add-in
2. **README.md** - Understand what it does
3. **FAQ.md** - Learn common issues

### Intermediate Path
1. **SETUP_GUIDE.md** - Detailed installation
2. **CUSTOMIZATION.md** - Make basic changes
3. **CHECKLIST.md** - Systematic verification

### Advanced Path
1. **ARCHITECTURE.md** - Understand design
2. **Source code** - Review implementation
3. **CUSTOMIZATION.md** - Add features

## Quick Reference

### Installation Commands
```bash
npm install
npx office-addin-dev-certs install
npm start
```

### Build Commands
```bash
npm run build         # Production build
npm run validate      # Validate manifest
```

### URLs
- Dev server: `https://localhost:3000`
- Manifest: `manifest.xml`
- Main code: `src/taskpane.js`

### Key Files to Edit
- Add-in name: `manifest.xml`
- Button labels: `manifest.xml`
- Colors: `src/taskpane.css`
- Functionality: `src/taskpane.js`, `src/commands.js`

---

**Need help choosing?**
- **Just want to use it?** → Start with QUICKSTART.md
- **Want to understand it?** → Start with README.md
- **Having problems?** → Check FAQ.md
- **Want to modify it?** → Read CUSTOMIZATION.md
- **Need technical details?** → See ARCHITECTURE.md

**Still not sure?** Start with README.md - it provides a good overview and will point you to other documents as needed.
