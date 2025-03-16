// UTILS FUNCTION
const utils = {
    sp: (int) => {
        int = int.toString();
        if (int >= 10000) {
            return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
        } else {
            return int;
        }
    },
    ssp: (int) => { 
        int = int.toString();
        if (int >= 10000) {
            return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join(' ').split('').reverse().join('');
        } else {
            return int;
        }
    },
    decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
    rand: (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min }
}

function getUnix() {
    return Math.floor(new Date().getTime());
}

function unixStamp(stamp) {
    let date = new Date(stamp),
    year = date.getFullYear(),
    month = (date.getMonth() + 1).toString().padStart(2, "0"),
    day = date.getDate().toString().padStart(2, "0"),
    hour = date.getHours().toString().padStart(2, "0"),
    minutes = date.getMinutes().toString().padStart(2, "0"),
    secs = date.getSeconds().toString().padStart(2, "0");

    return `${day}.${month}.${year}, ${hour}:${minutes}:${secs}`;
}

function unixStampDays(stamp, stamp2) {
    let date1 = new Date(stamp);
    let date2 = new Date(stamp2);

    let years = date1.getFullYear() - date2.getFullYear();
    let lastAnniversary = new Date(date2);
    lastAnniversary.setFullYear(date2.getFullYear() + years);
    if (lastAnniversary > date1) {
        years--;
        lastAnniversary.setFullYear(date2.getFullYear() + years);
    }
    
    let remainderMs = date1 - lastAnniversary;
    
    let s = Math.floor(remainderMs / 1000) % 60;
    let m = Math.floor(remainderMs / (1000 * 60)) % 60;
    let h = Math.floor(remainderMs / (1000 * 60 * 60)) % 24;
    let d = Math.floor(remainderMs / (1000 * 60 * 60 * 24));

    let text = "";
    if (years > 0) {
        text += `${years} ${utils.decl(years, ["год", "года", "лет"])}, `;
    }
    if (d > 0) {
        text += `${d} ${utils.decl(d, ["день", "дня", "дней"])}, `;
    }
    if (h > 0) {
        text += `${h} ${utils.decl(h, ["час", "часа", "часов"])}, `;
    }
    if (m > 0) {
        text += `${m} ${utils.decl(m, ["минуту", "минуты", "минут"])}, `;
    }
    text += `${s} ${utils.decl(s, ["секунду", "секунды", "секунд"])}`;

    return { seconds: s, minutes: m, hours: h, days: d, years: years, text: text };
}

const body = document.querySelector("body");
const themeButton = document.querySelector(".themeButton");

if (themeButton) {
    themeButton.addEventListener("click", () => {

        if (body.classList.contains("dark")) {
            body.classList.remove("dark");
            localStorage.setItem("themeMode", "light");
            return body.classList.add("light");
        }

        if (body.classList.contains("light")) {
            body.classList.remove("light");
            localStorage.setItem("themeMode", "dark");
            return body.classList.add("dark");
        }
    });
};

const reg = document.querySelector(".reg_container");
const auth = document.querySelector(".auth_container");
const showReg = document.getElementById("showReg");
const showAuth = document.getElementById("showAuth");

const reg_inputs = document.querySelectorAll(".reg_input");
const auth_inputs = document.querySelectorAll(".auth_input");

const regSubmit = reg.querySelector(".submitButton");
const authSubmit = auth.querySelector(".submitButton");

function applyAuthText() {
    auth_inputs.forEach((e, index) => {
        e.value = localStorage.getItem(`authInput_${index}`);
    });
}

function applyRegText() {
    reg_inputs.forEach((e, index) => {
        e.value = localStorage.getItem(`regInput_${index}`);
    });
}

function clearStorage() {
    return localStorage.clear();
}

reg_inputs.forEach((e, index) => {
    e.addEventListener("input", () => {
        localStorage.setItem(`regInput_${index}`, e.value);
    });
});

auth_inputs.forEach((e, index) => {
    e.addEventListener("input", () => {
        localStorage.setItem(`authInput_${index}`, e.value);
    });
});

showReg.addEventListener("click", () => {
    if (auth) {
        !auth.classList.contains("hidden") ? auth.classList.add("hidden") : null;
        reg.classList.contains("hidden") ? reg.classList.remove("hidden") : null;
        return applyRegText();
    }
});

showAuth.addEventListener("click", () => {
    if (reg) {
        !reg.classList.contains("hidden") ? reg.classList.add("hidden") : null;
        auth.classList.contains("hidden") ? auth.classList.remove("hidden") : null;
        return applyAuthText();
    }
});

regSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    let blocked = false;

    reg_inputs.forEach((el) => {
        if (!el.value || el.value.length < 1) {
            blocked = true;
        }
    });

    if (!blocked) {
        console.log(`👤 НОВАЯ РЕГИСТРАЦИЯ:

    Имя: ${reg_inputs[0].value}
    Фамилия: ${reg_inputs[1].value}
    Телефон: ${reg_inputs[2].value}
    Почта: ${reg_inputs[3].value}
    Возраст: ${reg_inputs[4].value}
    `);
        return clearStorage();
    }
});

authSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let blocked = false;

    auth_inputs.forEach((el) => {
        if (!el.value || el.value.length < 1) {
            blocked = true;
        }
    });

    if (!blocked) {
        console.log(`👤 НОВАЯ АВТОРИЗАЦИЯ:

    Имя: ${auth_inputs[0].value}
    `);
        return clearStorage();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (!reg.classList.contains("hidden")) {
        applyRegText();
    }

    if (!auth.classList.contains("hidden")) {
        applyAuthText();
    }

    if (localStorage.getItem("themeMode") == "dark") {
        body.classList.contains("light") ? body.classList.remove("light") : null;
        body.classList.add("dark");
    } else {
        body.classList.contains("dark") ? body.classList.remove("dark") : null;
        body.classList.add("light");
    }
});

function pickFunction() {
    return alert("Пока отключено");
}

// function pickFunction() {
//     const text = prompt("Выберите функцию (1-1):");
//     if (text == null) return;
//     try {
//         eval("func_" + text + "()");
//     } catch (error) {
//         console.error(error);
//         return alert("Такой функции нет.");
//     }
// }