"use strict";
const form = document.getElementById("addWorkForm");
form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".addWorkInput");
    if (inputs[0].value.length > 0 && inputs[1].value.length > 0) {
        const response = await fetch("http://localhost:3000/works/addWork", {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({ workName: inputs[0].value, workDate: inputs[1].value, workImage: inputs[2].value || "/images/no-workImage.jpg" })
        });
        if (response.ok && response.status == 200) {
            window.location.assign("/works");
        }
    }
});
