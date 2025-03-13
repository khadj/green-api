document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.green-api.com/waInstance";

    const idInstanceInput = document.getElementById("idInstance");
    const apiTokenInput = document.getElementById("apiToken");
    const phoneNumberInput = document.getElementById("phoneNumber");
    const messageInput = document.getElementById("message");
    const fileUrlInput = document.getElementById("fileUrl");
    const outputTextarea = document.getElementById("output");

    document.getElementById("getSettings").addEventListener("click", async () => {
        await sendRequest("getSettings");
    });

    document.getElementById("getStateInstance").addEventListener("click", async () => {
        await sendRequest("getStateInstance");
    });

    document.getElementById("sendMessage").addEventListener("click", async () => {
        const body = {
            chatId: `${phoneNumberInput.value}@c.us`,
            message: messageInput.value
        };
        await sendRequest("sendMessage", body);
    });

    document.getElementById("sendFileByUrl").addEventListener("click", async () => {
        const body = {
            chatId: `${phoneNumberInput.value}@c.us`,
            urlFile: fileUrlInput.value,
            fileName: "file"
        };
        await sendRequest("sendFileByUrl", body);
    });

    async function sendRequest(method, body = null) {
        const idInstance = idInstanceInput.value;
        const apiToken = apiTokenInput.value;

        if (!idInstance || !apiToken) {
            alert("Введите ID Instance и API Token!");
            return;
        }

        const url = `${apiUrl}${idInstance}/${method}/${apiToken}`;
        const options = body ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        } : { method: "GET" };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            outputTextarea.value = JSON.stringify(data, null, 2);
        } catch (error) {
            outputTextarea.value = "Ошибка запроса";
        }
    }
});
