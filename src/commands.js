Office.onReady(() => {
    // Register function commands
});

function copyEmailLink(event) {
    // Safety timeout to ensure event.completed() is always called
    const timeout = setTimeout(() => {
        console.error("Function timeout - forcing completion");
        event.completed();
    }, 10000); // 10 second timeout

    try {
        Office.context.mailbox.item.getItemIdAsync((result) => {
            try {
                if (result.status === Office.AsyncResultStatus.Failed) {
                    clearTimeout(timeout);
                    console.error("Error getting item ID:", result.error);
                    showNotification("Error", "Failed to get email ID");
                    event.completed();
                    return;
                }

                const itemId = result.value;

                const restId = Office.context.mailbox.convertToRestId(
                    itemId,
                    Office.MailboxEnums.RestVersion.v2_0
                );

                const emailLink = `https://outlook.office.com/mail/id/${restId}`;

                // Log the generated link for debugging
                console.log("Generated email link:", emailLink);

                copyToClipboardCommand(emailLink).then((success) => {
                    clearTimeout(timeout);
                    console.log("Clipboard operation result:", success);
                    if (success) {
                        showNotification("Success", "Link copied! Paste it anywhere.");
                    } else {
                        // If clipboard fails, show the link in the notification
                        showNotification("Link Generated", emailLink.substring(0, 100));
                    }
                    event.completed();
                }).catch((error) => {
                    clearTimeout(timeout);
                    console.error("Clipboard error:", error);
                    showNotification("Link", emailLink.substring(0, 100));
                    event.completed();
                });
            } catch (error) {
                clearTimeout(timeout);
                console.error("Error in getItemIdAsync callback:", error);
                showNotification("Error", "An error occurred: " + error.message);
                event.completed();
            }
        });
    } catch (error) {
        clearTimeout(timeout);
        console.error("Error in copyEmailLink:", error);
        showNotification("Error", "Failed to copy link");
        event.completed();
    }
}

async function copyToClipboardCommand(text) {
    // Try multiple methods in order of preference

    // Method 1: Try navigator.clipboard (modern API)
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            console.log("Copied using navigator.clipboard");
            return true;
        }
    } catch (error) {
        console.log("navigator.clipboard failed:", error);
    }

    // Method 2: Try execCommand with textarea (fallback)
    try {
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

        if (successful) {
            console.log("Copied using execCommand");
            return true;
        }
    } catch (error) {
        console.error("execCommand failed:", error);
    }

    // If both methods fail, return false
    console.error("All clipboard methods failed");
    return false;
}

function showNotification(title, message) {
    if (Office.context.mailbox.item.notificationMessages) {
        Office.context.mailbox.item.notificationMessages.addAsync("copyLinkNotification", {
            type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
            message: message,
            icon: "Icon.16x16",
            persistent: false
        });
    }
}

Office.actions.associate("copyEmailLink", copyEmailLink);
