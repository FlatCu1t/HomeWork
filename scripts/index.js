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

const Quotes = ["«Жизнь — это мозаика, собранная из маленьких, но значимых моментов.»", "«Свет надежды всегда пробивается сквозь тьму сомнений.»", "«Каждый новый день — шанс начать всё заново и открыть себя с новой стороны.»", "«Любовь — не просто чувство, а искусство видеть красоту в каждом человеке.»", "«Мудрость приходит, когда мы учимся принимать свои ошибки и двигаться дальше.»", "«Внутренний покой — ключ к гармонии с окружающим миром.»", "«Смелость — это не отсутствие страха, а умение идти вперёд, несмотря на него.»", "«Жизнь становится ярче, когда мы умеем ценить каждый мгновенье.»", "«Преодолев преграды, мы открываем в себе новые горизонты.»", "«Истинная сила человека кроется в его способности верить в лучшее.»", "«Судьба благоволит тем, кто смело следует за своей мечтой.»", "«В каждом прощании скрывается начало чего-то удивительного.»", "«Наша жизнь — как книга, и каждый день — новая страница.»", "«Иногда тишина говорит больше, чем тысячи слов.»", "«Улыбка — это маленькое чудо, способное изменить мир вокруг нас.»"];
const Colors = ["red", "yellow", "green", "lime", "violet", "black"];
const button = document.querySelector(".quoteButton");
const image = document.querySelector(".figure");

button.addEventListener("click", () => {
    const container = document.querySelector(".quote_container");
    if (!container) throw new Error("Контейнер для цитаты не инициализирован.");
    container.children[0].textContent = Quotes[utils.rand(0, (Quotes.length-1))];
});

if (image) {
    image.addEventListener("mouseenter", () => {
        image.style.fill = Colors[utils.rand(0, (Colors.length-1))];
    });
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