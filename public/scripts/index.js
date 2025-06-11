if (!localStorage || !localStorage?.getItem("loginedID")) {
    window.location.assign("/login");
}
//@ts-ignore
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import { Functions } from "./functions.js";
const functions = new Functions();
const socket = io("http://localhost:3000");
let currentRoom = '';
const joinButton = document.getElementById('joinButton');
const sendButton = document.getElementById("sendBtn");
const rooms = document.querySelectorAll(".room");
const logOutButton = document.getElementById("logOutButton");
(async () => {
    const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ userID: localStorage.getItem("loginedID") })
    });
    if (response.ok && response.status == 200) {
        const data = await response.json();
        const userAvatar = document.getElementById("userAvatar");
        const userName = document.getElementById("userName");
        userAvatar.src = data.avatar;
        userName.textContent = data.userName;
        sendButton?.addEventListener("click", () => {
            const input = document.getElementById('messageInput');
            const msg = { user: data, text: input.value };
            if (msg && currentRoom) {
                socket.emit('chat message', { room: currentRoom, message: msg });
                input.value = '';
            }
        });
    }
    else {
        localStorage.clear();
        window.location.assign("/login");
    }
})();
rooms?.forEach((el) => {
    el?.addEventListener("click", () => {
        currentRoom = el?.dataset.roomid;
        socket.emit('join room', el.dataset.roomid);
    });
});
logOutButton?.addEventListener("click", () => {
    localStorage.clear();
    window.location.assign("/login");
});
socket.on('chat message', (msg) => {
    const messagesContainer = document.querySelector(".right_section_messages");
    if (messagesContainer) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const p_2 = document.createElement("p");
        div.classList.add("message");
        img.src = msg.user.avatar;
        img.alt = "avatar";
        img.loading = "lazy";
        p.textContent = msg.text;
        p_2.classList.add("messageTime");
        p_2.textContent = functions.unixStamp(functions.getUnix()).text;
        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(p_2);
        messagesContainer.appendChild(div);
    }
});
socket.on('room messages', (msg) => {
    const messagesContainer = document.querySelector(".right_section_messages");
    if (messagesContainer) {
        messagesContainer.innerHTML = "";
        if (msg.length < 1)
            return;
        msg.forEach((el) => {
            const div = document.createElement("div");
            const img = document.createElement("img");
            const p = document.createElement("p");
            const p_2 = document.createElement("p");
            div.classList.add("message");
            img.src = el.fromAvatar;
            img.alt = "avatar";
            img.loading = "lazy";
            p.textContent = el.messageText;
            p_2.classList.add("messageTime");
            p_2.textContent = el.messageTime;
            div.appendChild(img);
            div.appendChild(p);
            div.appendChild(p_2);
            messagesContainer.appendChild(div);
        });
    }
});
