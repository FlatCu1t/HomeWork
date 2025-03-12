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

const display = document.getElementById('display');

function press(key) {
    display.value += key;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        const displayValue = document.getElementById('display').value;
        const result = new Function('return ' + displayValue)();
        display.value = result;
    } catch (error) {
        display.value = 'Ошибка';
        console.error(error);
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    (key >= "0" && key <= "9") || ["+", "-", "*", "/", "."].includes(key) ? display.value += key : key === "Enter" ? calculate() : key === "Escape" ? clearDisplay() : key === "Backspace" ? display.value = display.value.slice(0, -1) : null;
});

const field = document.querySelector(".field");
const ball = document.querySelector(".ball");
const BALL_SIZE = 100;

field.addEventListener("click", (e) => {
    const rect = field.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x < 0 ? x = 0 : null;
    y < 0 ? y = 0 : null;

    x > field.clientWidth - BALL_SIZE ? x = field.clientWidth - BALL_SIZE : null;
    y > field.clientHeight - BALL_SIZE ? y = field.clientHeight - BALL_SIZE : null;

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
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