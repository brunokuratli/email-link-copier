// Authentication configuration and helpers
const msalConfig = {
    auth: {
        clientId: "YOUR_CLIENT_ID_HERE", // Replace with your Azure AD app client ID
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "https://localhost:3000/src/taskpane.html"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
};

const loginRequest = {
    scopes: ["Mail.Read", "openid", "profile"]
};

let msalInstance = null;

function initializeMsal() {
    if (!msalInstance) {
        msalInstance = new msal.PublicClientApplication(msalConfig);
    }
    return msalInstance;
}

async function getAccessToken() {
    const msalApp = initializeMsal();

    try {
        const accounts = msalApp.getAllAccounts();

        if (accounts.length === 0) {
            const loginResponse = await msalApp.loginPopup(loginRequest);
            return loginResponse.accessToken;
        }

        const silentRequest = {
            scopes: loginRequest.scopes,
            account: accounts[0]
        };

        try {
            const response = await msalApp.acquireTokenSilent(silentRequest);
            return response.accessToken;
        } catch (error) {
            if (error instanceof msal.InteractionRequiredAuthError) {
                const response = await msalApp.acquireTokenPopup(loginRequest);
                return response.accessToken;
            }
            throw error;
        }
    } catch (error) {
        console.error("Authentication error:", error);
        throw error;
    }
}

async function getEmailIdFromGraph(itemId) {
    try {
        const token = await getAccessToken();

        const response = await fetch(`https://graph.microsoft.com/v1.0/me/messages/${itemId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Graph API error: ${response.status}`);
        }

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error("Error fetching email from Graph API:", error);
        throw error;
    }
}
