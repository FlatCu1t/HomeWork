"use strict";
const regForm = document.getElementById("registerForm");
const logForm = document.getElementById("loginForm");
const regFormContainer = document.querySelector(".registerForm_container");
const loginFormContainer = document.querySelector(".loginForm_container");
const openRegText = document.getElementById("openRegText");
const openLogText = document.getElementById("openLogText");
function openForm(type) {
    if (type == "log") {
        regFormContainer?.classList.remove("visible");
        regFormContainer?.classList.add("hidden");
        loginFormContainer?.classList.remove("hidden");
        loginFormContainer?.classList.add("visible");
    }
    if (type == "reg") {
        loginFormContainer?.classList.remove("visible");
        loginFormContainer?.classList.add("hidden");
        regFormContainer?.classList.remove("hidden");
        regFormContainer?.classList.add("visible");
    }
}
regForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".regInput");
    const response = await fetch("http://localhost:3000/allUsers", {
        method: "GET",
        headers: { "content-type": "application/json; charset=utf-8" }
    });
    if (response.ok && response.status == 200) {
        const data = await response.json();
        const response_2 = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({ userID: data.length + 1, userLogin: inputs[0].value, userName: inputs[1].value, avatar: "/images/no-avatar.webp", password: inputs[2].value })
        });
        if (response_2.ok && response_2.status == 200) {
            openForm("log");
        }
    }
});
logForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".logInput");
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ userLogin: inputs[0].value, password: inputs[1].value })
    });
    if (response.ok && response.status == 200) {
        localStorage.setItem("loginedID", inputs[0].value);
        window.location.assign("/");
    }
});
openRegText?.addEventListener("click", () => {
    openForm("reg");
});
openLogText?.addEventListener("click", () => {
    openForm("log");
});
