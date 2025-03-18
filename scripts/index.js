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

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const buttons = Array.from(document.querySelector(".buttons_container").children);
const settings = { drawingCursor: true, eraserCursor: false, fillingCursor: false, radius: 5, color: "black" };

const settings_container = Array.from(document.querySelector(".settings_container").children);

canvas.width = 900;
canvas.height = 700;

let isDrawing = false;
let isEraser = false;

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

buttons[0].addEventListener("click", () => {
    buttons.forEach((el) => {
        el.classList.contains("active") ? el.classList.remove("active") : null;
        !el.classList.contains("notActive") ? el.classList.add("notActive") : null;
    });

    buttons[0].classList.remove("notActive");
    buttons[0].classList.add("active");

    settings.drawingCursor = false;
    settings.fillingCursor = false;
    return settings.eraserCursor = true;
});

buttons[1].addEventListener("click", () => {
    buttons.forEach((el) => {
        el.classList.contains("active") ? el.classList.remove("active") : null;
        !el.classList.contains("notActive") ? el.classList.add("notActive") : null;
    });

    buttons[1].classList.remove("notActive");
    buttons[1].classList.add("active");

    settings.drawingCursor = true;
    settings.fillingCursor = false;
    return settings.eraserCursor = false;
});

buttons[2].addEventListener("click", () => {
    buttons.forEach((el) => {
        el.classList.contains("active") ? el.classList.remove("active") : null;
        !el.classList.contains("notActive") ? el.classList.add("notActive") : null;
    });

    buttons[2].classList.remove("notActive");
    buttons[2].classList.add("active");

    settings.drawingCursor = false;
    settings.fillingCursor = true;
    return settings.eraserCursor = false;
});

settings_container[0].addEventListener("input", () => {
    if (settings_container[0].value.length > 0 && !isNaN(parseInt(settings_container[0].value)) && typeof parseInt(settings_container[0].value) == "number") {
        return parseInt(settings_container[0].value) > 50 ? settings.radius = 50 : settings.radius = parseInt(settings_container[0].value);
    }
});

settings_container[1].addEventListener("input", () => {
    if (isNaN(parseInt(settings_container[1].value))) {
        return settings.color = settings_container[1].value;
    }
});

settings_container[2].addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.addEventListener('mousedown', (e) => {
    if (e.button == 0 && settings.drawingCursor) {
        isDrawing = true;
        isEraser = false;
    }

    if (e.button == 0 && settings.eraserCursor) {
        isDrawing = false;
        isEraser = true;
    }
});

canvas.addEventListener('mousedown', (e) => {
    if (e.button == 0 && settings.fillingCursor) {
        isDrawing = false;
        isEraser = false;
        ctx.fillStyle = settings.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
});

document.addEventListener('mouseup', () => {
    isDrawing = false;
    isEraser = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing && !isEraser) return;
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.fillStyle = settings.color;
    ctx.arc(pos.x, pos.y, settings.radius, 0, Math.PI * 2);
    
    if (isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
    } else {
        ctx.globalCompositeOperation = 'source-over';
    }

    ctx.fill();
});