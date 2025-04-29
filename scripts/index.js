import { Functions } from "./functions.js";
const functions = new Functions();

(async () => {
    const users = await functions.createMap();
    const container = document.querySelector(".users_container");
    if (container) {
        container.innerHTML = "";
        for (const [key, value] of users.entries()) {
            const div = document.createElement("div");
            const text = document.createElement("p");
            div.classList.add("user");
            text.innerHTML += `(ID: ${key}) -> ${value}<br>`;
            div.appendChild(text);
            container.appendChild(div);
        }
    }
})();