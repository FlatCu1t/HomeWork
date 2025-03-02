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
    decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] }
}

function getRandomInRange(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
};

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

    // Формирование итоговой строки
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

function fullYears() {
    const inputs = document.querySelectorAll(".task1_input");
    if (!inputs) throw new Error("Инпуты не инициализированы.");
    let day, month, year = 0;
    inputs.forEach((el, index) => {
        if (el.value) {
            if (!el.value || typeof parseInt(el.value) !== "number") throw new Error("Некорректный value у элемента.");
            switch (index) {
                case 0:
                    day = el.value;
                    break;
                case 1:
                    month = el.value;
                    break;
                case 2:
                    year = el.value;
                    break;
                default:
                    break;
            }
        }
    });

    const totalyears = unixStampDays(getUnix(), new Date(`${year}/${month}/${day}`).getTime());
    const WindowText = document.querySelector(".task1_text");
    if (WindowText && totalyears.years > 0) {
        return WindowText.textContent = `Вам сейчас ${totalyears.years} ${utils.decl(totalyears.years, ["полный", "полных", "полных"])} ${utils.decl(totalyears.years, ["год", "лет", "лет"])}`;
    }
}

const colours = ["Black", "White", "Red", "Green", "Blue", "Pink", "violet"];
let timer = false;

function randomColour() {
    if (!colours || colours.length <= 0) throw new Error("Массив с цветами не инициализирован.");
    const maxLength = colours.length-1;
    console.log("Запускаю таймер...");
    timer = setInterval(() => {
        const card = document.querySelector(".card");
        if (!card && timer) {
            clearInterval(timer);
            throw new Error("Карточка не инициализирована.");
        }

        card.style.backgroundColor = colours[getRandomInRange(0, maxLength)];
        console.log(`Цвет поменялся. Текущий цвет: ${card.style.backgroundColor}`);
    }, 3000);
}

function stopRandomColour() {
    if (timer && typeof timer == "number") {
        clearInterval(timer);
        timer = false;
        return console.log(`Таймер остановлен.`);
    }
    return console.log(`Таймер не обнаружен.`);
}

function placeOrder() {
    const book = document.getElementById('bookSelect').value;
    const quantity = document.getElementById('quantity').value;
    const name = document.getElementById('name').value.trim();
    const deliveryDate = document.getElementById('deliveryDate').value;
    const address = document.getElementById('address').value.trim();
    const comment = document.getElementById('comment').value.trim();

    if (!name || !deliveryDate || !address || !quantity) {
        throw new Error('Пожалуйста, заполните все обязательные поля.');
    }

    const message = 
        `${name}, спасибо за заказ!\n` +
        `${quantity} экземпляр(ов) книги "${book}" будет доставлен(ы) ` +
        `${deliveryDate} по адресу: ${address}.\n` +
        (comment ? `Комментарий: ${comment}` : '');

    document.getElementById('result').textContent = message;
}

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