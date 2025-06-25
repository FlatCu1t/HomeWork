import './registration.scss';

const openLogForm = document.getElementById("openLogForm");
const form = document.getElementById("regForm");

openLogForm?.addEventListener("click", () => {
    window.location.assign("/auth");
});

form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs: any = document.querySelectorAll("input");
    const response = await fetch("http://localhost:3000/api/users/", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ login: inputs[0].value, password: inputs[1].value })
    });

    if (response.ok && response.status == 201) {
        window.location.assign("/auth");
    } else {
        console.log(await response.text());
    }
});