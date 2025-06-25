import "./auth.scss";

const openRegForm = document.getElementById("openRegForm");
const form = document.getElementById("authForm");

openRegForm?.addEventListener("click", () => {
    window.location.assign("/registration");
});

form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs: any = document.querySelectorAll("input");

    const response = await fetch("http://localhost:3000/api/users/auth", {
       method: "POST",
       headers: { "content-type": "application/json; charset=utf-8" },
       body: JSON.stringify({ login: inputs[0].value, password: inputs[1].value }) 
    });

    if (response.ok && response.status == 200) {
        localStorage.setItem("loginedLogin", inputs[0].value);
        window.location.assign("/todos");
    } else {
        console.log(await response.text());
    }
});