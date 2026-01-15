import './taskpane.css';

Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
        document.getElementById("copyLinkBtn").onclick = copyEmailLinkToClipboard;

        // Auto-copy when task pane opens
        setTimeout(() => {
            copyEmailLinkToClipboard();
        }, 500); // Small delay to ensure Office.js is fully ready
    }
});

async function getEmailLink() {
    try {
        // Check if we have access to the item
        if (!Office.context.mailbox || !Office.context.mailbox.item) {
            throw new Error("No email item is currently selected");
        }

        // Get the item ID directly from the item property
        const itemId = Office.context.mailbox.item.itemId;

        if (!itemId) {
            throw new Error("Unable to get email ID");
        }

        // Convert EWS ID to REST ID format
        const restId = Office.context.mailbox.convertToRestId(
            itemId,
            Office.MailboxEnums.RestVersion.v2_0
        );

        // Use the deeplink/read format which works reliably
        // Format: https://outlook.office365.com/mail/deeplink/read/[REST-ID]
        const emailLink = `https://outlook.office365.com/mail/deeplink/read/${restId}`;

        return emailLink;
    } catch (error) {
        console.error("Error in getEmailLink:", error);
        throw error;
    }
}

async function copyToClipboard(text) {
    try {
        // Try multiple methods to copy to clipboard

        // Method 1: Modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (clipboardError) {
                console.log("Clipboard API failed, trying fallback:", clipboardError);
            }
        }

        // Method 2: execCommand fallback
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (successful) {
                return true;
            }
        } catch (execError) {
            console.error("execCommand failed:", execError);
            document.body.removeChild(textArea);
        }

        // If both methods fail, return false so user can copy manually
        return false;
    } catch (error) {
        console.error("Error copying to clipboard:", error);
        return false;
    }
}

function showStatus(message, isError = false) {
    const statusElement = document.getElementById("status");
    statusElement.textContent = message;
    statusElement.className = `status-message ${isError ? 'error' : 'success'}`;
    statusElement.style.display = 'block';

    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 3000);
}

function displayEmailLink(link) {
    const linkDisplayDiv = document.getElementById("linkDisplay");
    const emailLinkInput = document.getElementById("emailLink");

    emailLinkInput.value = link;
    linkDisplayDiv.style.display = 'block';
}

async function copyEmailLinkToClipboard() {
    try {
        showStatus("Getting email link...", false);

        const emailLink = await getEmailLink();

        displayEmailLink(emailLink);

        showStatus("Copying to clipboard...", false);
        const copied = await copyToClipboard(emailLink);

        if (copied) {
            showStatus("✓ Email link copied to clipboard!", false);
        } else {
            showStatus("⚠ Could not copy automatically. Please copy the link manually below.", true);
        }
    } catch (error) {
        console.error("Error in copyEmailLinkToClipboard:", error);
        showStatus("✗ Error: " + error.message, true);
    }
}
