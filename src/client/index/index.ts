import './index.scss';

const regButton = document.getElementById("regButton");
const logButton = document.getElementById("logButton");


logButton?.addEventListener("click", () => {
    window.location.assign("/auth");
});

regButton?.addEventListener("click", () => {
    window.location.assign("/registration");
});