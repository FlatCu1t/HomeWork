"use strict";
const openRegFormText = document.getElementById("openRegForm");
const openLogFormText = document.getElementById("openLogForm");
const logForm = document.querySelector(".loginForm");
const regForm = document.querySelector(".regForm");
const formLog = document.getElementById("formLog");
const formReg = document.getElementById("formReg");
function openForm(type) {
    if (!type)
        throw new Error("toggleForm function don't have type parameter.");
    if (type == "log") {
        if (regForm?.classList.contains("visible")) {
            regForm?.classList.remove("visible");
            regForm?.classList.add("hidden");
            logForm?.classList.remove("hidden");
            logForm?.classList.add("visible");
        }
    }
    if (type == "reg") {
        if (logForm?.classList.contains("visible")) {
            logForm?.classList.remove("visible");
            logForm?.classList.add("hidden");
            regForm?.classList.remove("hidden");
            regForm?.classList.add("visible");
        }
    }
}
openRegFormText?.addEventListener("click", () => {
    openForm("reg");
});
openLogFormText?.addEventListener("click", () => {
    openForm("log");
});
formLog?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/get", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" }
    });
    if (response.ok && response.status == 200) {
        const data = await response.json();
        const inputs = document.querySelectorAll(".logInput");
        const user = data.users.find((x) => x.login == inputs[0].value);
        if (!user) {
            console.log(`Пользователя ${inputs[0].value} не существует.`);
        }
        else {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "content-type": "application/json; charset=utf-8" },
                body: JSON.stringify({ userLogin: inputs[0].value, password: inputs[1].value })
            });
            if (response.ok && response.status == 200) {
                localStorage.setItem("logined", "true");
                localStorage.setItem("ID", user.id);
                window.location.assign(`/cabinet?userID=${user.id}`);
            }
            else if (response.status == 401) {
                return console.log("Пароль введён не верно.");
            }
        }
    }
});
formReg?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users/get", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" }
    });
    if (response.ok && response.status == 200) {
        const data = await response.json();
        const inputs = document.querySelectorAll(".regInput");
        const user = data.users.find((x) => x.login == inputs[0].value);
        if (user) {
            return console.log("Пользователь уже существует.");
        }
        else {
            const response = await fetch("http://localhost:3000/users/add", {
                method: "POST",
                headers: { "content-type": "application/json; charset=utf-8" },
                body: JSON.stringify({ user: { login: inputs[0].value, name: inputs[1].value, email: inputs[2].value, avatar: "/images/no-avatar.jpg", password: inputs[3].value } })
            });
            if (response.ok && response.status == 200) {
                console.log("Пользователь зарегистрирован.");
                openForm("log");
            }
        }
    }
});
