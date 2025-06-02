import { Functions } from "./functions.js";
const functions = new Functions();
const button = document.getElementById("cabinetButton");
button?.addEventListener("click", () => {
    window.location.assign("/login");
});
