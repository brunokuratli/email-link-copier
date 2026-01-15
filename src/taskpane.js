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

        // Convert to REST ID format
        const restId = Office.context.mailbox.convertToRestId(
            itemId,
            Office.MailboxEnums.RestVersion.v2_0
        );

        // Get the user's email address to build the correct link
        const userEmail = Office.context.mailbox.userProfile.emailAddress;

        // Build the Outlook web link using the deeplink format
        // This format works for both Outlook Web and Desktop
        const emailLink = `https://outlook.office365.com/mail/deeplink/read/${restId}`;

        return emailLink;
    } catch (error) {
        console.error("Error in getEmailLink:", error);
        throw error;
    }
}

async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            return successful;
        }
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
        const emailLink = await getEmailLink();

        displayEmailLink(emailLink);

        const copied = await copyToClipboard(emailLink);

        if (copied) {
            showStatus("Email link copied to clipboard!");
        } else {
            showStatus("Failed to copy link. Please copy manually from below.", true);
        }
    } catch (error) {
        console.error("Error in copyEmailLinkToClipboard:", error);
        showStatus("Error: Unable to get email link. " + error.message, true);
    }
}
