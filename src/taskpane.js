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
    return new Promise((resolve, reject) => {
        Office.context.mailbox.item.getItemIdAsync((result) => {
            if (result.status === Office.AsyncResultStatus.Failed) {
                console.error("Error getting item ID:", result.error);
                reject(result.error);
                return;
            }

            const itemId = result.value;

            const restId = Office.context.mailbox.convertToRestId(
                itemId,
                Office.MailboxEnums.RestVersion.v2_0
            );

            const emailLink = `https://outlook.office.com/mail/id/${restId}`;
            resolve(emailLink);
        });
    });
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
