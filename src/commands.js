Office.onReady(() => {
    // Register function commands
});

function copyEmailLink(event) {
    Office.context.mailbox.item.getItemIdAsync((result) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
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

        copyToClipboardCommand(emailLink).then((success) => {
            if (success) {
                showNotification("Success", "Email link copied to clipboard!");
            } else {
                showNotification("Error", "Failed to copy email link");
            }
            event.completed();
        });
    });
}

async function copyToClipboardCommand(text) {
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
