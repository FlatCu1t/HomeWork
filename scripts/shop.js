import { Functions } from "./functions.js";
const functions = new Functions();

const cartBtn = document.querySelector(".header_cart_Btn");
const cartMenu = document.querySelector(".cart_menu");
const cart = new Set();
const counts = {};

cartBtn.addEventListener("mouseenter", () => {
    const menu = document.querySelector(".cart_menu");
    if (menu) {
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
            menu.classList.add("visible");
            menu.style.display = "block";
        }
    }
});

cartBtn.addEventListener("mouseleave", () => {
    const menu = document.querySelector(".cart_menu");
    if (menu) {
        if (menu.classList.contains("visible")) {
            if (!menu.matches(":hover")) return;
            menu.classList.remove("visible");
            menu.classList.add("hidden");

            setTimeout(() => {
                menu.style.display = "none";
            }, 500);
        }
    }
});

cartMenu.addEventListener("mouseleave", () => {
    if (cartMenu) {
        if (cartMenu.classList.contains("visible")) {
            cartMenu.classList.remove("visible");
            cartMenu.classList.add("hidden");

            setTimeout(() => {
                cartMenu.style.display = "none";
            }, 500);
        }
    }
});

(async () => {
    await functions.addNFTs(cart, counts);
})();