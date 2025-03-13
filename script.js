/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.green-api.com/waInstance";

    const getInstanceData = () => {
        return {
            idInstance: document.getElementById("idInstance").value,
            apiToken: document.getElementById("apiToken").value
        };
    };

    const updateOutput = (data) => {
        document.getElementById("output").value = JSON.stringify(data, null, 2);
    };

    document.getElementById("getSettings").addEventListener("click", async () => {
        const { idInstance, apiToken } = getInstanceData();
        const response = await fetch(`${apiUrl}${idInstance}/getSettings/${apiToken}`);
        updateOutput(await response.json());
    });

    document.getElementById("getStateInstance").addEventListener("click", async () => {
        const { idInstance, apiToken } = getInstanceData();
        const response = await fetch(`${apiUrl}${idInstance}/getStateInstance/${apiToken}`);
        updateOutput(await response.json());
    });

    document.getElementById("sendMessage").addEventListener("click", async () => {
        const { idInstance, apiToken } = getInstanceData();
        const phoneNumber = prompt("Введите номер телефона в формате 79001234567:");
        const message = prompt("Введите сообщение:");

        const response = await fetch(`${apiUrl}${idInstance}/sendMessage/${apiToken}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId: `${phoneNumber}@c.us`, message })
        });
        updateOutput(await response.json());
    });

    document.getElementById("sendFileByUrl").addEventListener("click", async () => {
        const { idInstance, apiToken } = getInstanceData();
        const phoneNumber = prompt("Введите номер телефона в формате 79001234567:");
        const fileUrl = prompt("Введите URL файла:");
        const fileName = prompt("Введите имя файла:");

        const response = await fetch(`${apiUrl}${idInstance}/sendFileByUrl/${apiToken}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId: `${phoneNumber}@c.us`, urlFile: fileUrl, fileName })
        });
        updateOutput(await response.json());
    });
});
