import { Functions } from "./functions.js";
const functions = new Functions();
(async () => {
    const response = await fetch("http://localhost:3000/users/get", {
        method: "POST"
    });
    if (response.ok && response.status == 200) {
        const data = await response.json();
        if (!data)
            return window.location.assign("/login");
        const finded = data.users.find((x) => x.id == parseInt(localStorage?.getItem("loginedID") || "0"));
        if (!finded || !localStorage?.getItem("loginedID") || parseInt(localStorage?.getItem("loginedID") || "0") !== finded.id) {
            localStorage.clear();
            return window.location.assign("/login");
        }
    }
})();
