import { Functions } from "./functions.js";
const functions = new Functions();

// Задание 1
const container = document.querySelector(".cards_container");

if (container) {
    Array.from(container.children).forEach((el, index) => {
        let massive = [];
        el.children[3]?.addEventListener("click", () => {
            Array.from(container.children).forEach((el, index) => {
                const name = el.children[0].textContent?.split(": ")[1];
                const email = el.children[1].textContent?.split(": ")[1];
                const telephone = el.children[2].textContent?.split(": ")[1];
                massive.push(functions.getObject(name, email, telephone));
            });
            return console.log(massive);
        });
    });
}

// Задание 2
functions.concat_massives([1, 2, 4], [5, 6], [7]);

// Задание 3
(async () => {
    const response = await functions.getUsers();
    functions.teest(response);
})();