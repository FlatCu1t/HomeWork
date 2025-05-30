import { Functions } from "./functions.js";
const functions = new Functions();

const openRegFormText = document.getElementById("openRegForm");
const openLogFormText = document.getElementById("openLogForm");
const logForm = document.querySelector(".login_form");
const regForm = document.querySelector(".register_form");
const alarm = document.querySelector(".alarm");

openRegFormText?.addEventListener("click", () => {
    if (logForm?.classList.contains("visible")) {
        logForm?.classList.remove("visible")
        logForm?.classList.add("hidden")
    }

    if (regForm?.classList.contains("hidden")) {
        regForm?.classList.remove("hidden")
        regForm?.classList.add("visible")
    }
});

openLogFormText?.addEventListener("click", () => {
    if (logForm?.classList.contains("hidden")) {
        logForm?.classList.remove("hidden")
        logForm?.classList.add("visible")
    }

    if (regForm?.classList.contains("visible")) {
        regForm?.classList.remove("visible")
        regForm?.classList.add("hidden")
    }
});

logForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs: any = document.querySelectorAll(".logInput");
    const response = await fetch("http://localhost:3000/users/get", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" }
    });

    if (response.ok && response.status == 200) {
        const data = await response.json();
        const finded = data.users.find((x: any) => x.name == inputs[0].value || x.email == inputs[0].value)
        const updatedPasswordResponse = await fetch("http://localhost:3000/updatedPassword", {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({ password: inputs[1].value })
        });
        const updatedPassword = await updatedPasswordResponse.json();
        if (!finded) return functions.showAlarm(alarm, "error", "Пользователь не найден.");
        if (finded.password !== updatedPassword.password) return functions.showAlarm(alarm, "error", "Не правильный пароль.");
        localStorage.setItem("loginedID", finded.id);
        window.location.assign("/");
    }
});

regForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs: any = document.querySelectorAll(".regInput");

    const response = await fetch("http://localhost:3000/users/get", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" }
    });

    if (response.ok && response.status == 200) {
        const data = await response.json();
        const finded = data.users.find((x: any) => x.name.toLowerCase() == inputs[0].value.toLowerCase() || x.email.toLowerCase() == inputs[2].value.toLowerCase());

        if (finded) return functions.showAlarm(alarm, "error", "Такой пользователь уже существует.");
        
        const response_2 = await fetch("http://localhost:3000/users/set", {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({ name: inputs[0].value, id: data.users.length + 1, email: inputs[2].value, password: inputs[3].value, telephone: inputs[1].value })
        });

        if (response_2.ok && response_2.status == 200) {
            functions.showAlarm(alarm, "success", "Вы успешно зарегистрировались!");

            if (logForm?.classList.contains("hidden")) {
                logForm?.classList.remove("hidden")
                logForm?.classList.add("visible")
            }

            if (regForm?.classList.contains("visible")) {
                regForm?.classList.remove("visible")
                regForm?.classList.add("hidden")
            }
        }
    }
});