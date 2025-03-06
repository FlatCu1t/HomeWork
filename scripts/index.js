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

const form = document.forms["myForm"];
const usernameInput = form.elements[0];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const subForm_container = document.querySelector(".subform_container");
    if (subForm_container) {
        subForm_container.childNodes.forEach((e, index) => {
            if (index < 6) {
                switch (index) {
                    case 1:
                        e.textContent = "Имя: " + form.elements[0].value;
                        break;
                    case 3:
                        e.textContent = "Фамилия: " + form.elements[1].value;
                        break;
                    case 5:
                        e.textContent = "Почта: " + form.elements[2].value;
                        break;
                }
            }
        });

        return console.log(`Новая регистрация:\n\n`, JSON.parse(`{"name": "${form.elements[0].value}", "surname": "${form.elements[1].value}", "email": "${form.elements[2].value}"}`));
    } else {
        throw new Error("SubForm container is not initializied.");
    }
});

usernameInput.addEventListener("input", () => {
    const inputContainer = document.querySelector(".input_container");
    if (inputContainer) {
        inputContainer.children[0].textContent = usernameInput.value;
    }
});

usernameInput.addEventListener("focus", (e) => {
    const inputContainer = document.querySelector(".input_container");
    if (inputContainer) {
        inputContainer.children[0].style.color = "blue"
    }
});

usernameInput.addEventListener("blur", (e) => {
    const inputContainer = document.querySelector(".input_container");
    if (inputContainer) {
        inputContainer.children[0].style.color = "gray"
    }
});

function showForm(type) {
    if (!type) return;
    const authForm = document.querySelector(".form.form_login");
    const regForm = document.querySelector(".form.form_register");
    switch (type) {
        case "register":
            authForm.style.display = "block" ? authForm.style.display = "none" : authForm.style.display = "block";
            regForm.style.display = "none" ? regForm.style.display = "block" : regForm.style.display = "none";
            break;
        case "login":
            regForm.style.display = "block" ? regForm.style.display = "none" : regForm.style.display = "block";
            authForm.style.display = "none" ? authForm.style.display = "block" : authForm.style.display = "none";
            break;
    }
}

function login() {
    const authForm = document.forms["loginForm"];
    if (!authForm) throw new Error("Login form is not initializied.");
    const username = authForm["username"].value;
    const password = authForm["pass"].value;
    if (!username || !password) throw new Error("Not all data received.");
    return console.log(`LOGIN REQUEST:\nUsername: ${username}\nPassword: ${password}`);
}

function register() {
    const regForm = document.forms["registerForm"];
    if (!regForm) throw new Error("Register form is not initializied.");
    const username = regForm["username"].value;
    const email = regForm["email"].value;
    const password = regForm["pass"].value;
    if (!username || !email || !password) throw new Error("Not all data received.");
    return console.log(`REGISTER REQUEST:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);
}

function addOption() {
    const selector = document.getElementById("sel");
    const option = selector.querySelector(`option[value="yellow"]`);
    if (selector && !option) {
        const newOption = new Option("Жёлтый", "yellow");
        selector.appendChild(newOption);
    } else {
        throw new Error("Опция уже существует.");
    }
}

const item_container = document.querySelector(".items_container");

function addItem(itemID) {
    if (!item_container) throw new Error("Items container not initializied.");
    item_container.children[itemID].children[4].value++;
    return total();
}

function removeItem(itemID) {
    if (!item_container) throw new Error("Items container not initializied.");
    item_container.children[itemID].children[4].value > 0 ? item_container.children[itemID].children[4].value-- : null;
    return total();
}

function calculateTotalSum() {
    if (!item_container) throw new Error("Items container or texts not initializied.");
    let totalSum = 0;

    const parquet = item_container.children[0].children[4].value;
    const linoleum = item_container.children[1].children[4].value;
    const carpet = item_container.children[2].children[4].value;

    totalSum += parquet * 200;
    totalSum += linoleum * 500;
    totalSum += carpet * 1000;

    return {totalSum: totalSum, parquet: parquet * 200, linoleum: linoleum * 500, carpet: carpet * 1000};
}

function total() {
    const texts = document.querySelectorAll(".calculator_container p");
    if (!item_container || !texts) throw new Error("Items container or texts not initializied.");
    const parquet = texts[4];
    const linoleum = texts[5];
    const carpet = texts[6];
    const summ = texts[7];
    const totalSum = calculateTotalSum();
    parquet.textContent = "Паркет: " + item_container.children[0].children[4].value + "x " + `(${utils.ssp(totalSum.parquet)},00₸)`;
    linoleum.textContent = "Линолеум: " + item_container.children[1].children[4].value + "x " + `(${utils.ssp(totalSum.linoleum)},00₸)`;
    carpet.textContent = "Ковролин: " + item_container.children[2].children[4].value + "x " + `(${utils.ssp(totalSum.carpet)},00₸)`;
    summ.textContent = "Сумма: " + utils.ssp(totalSum.totalSum) + ",00₸";
}

const usnameInput = document.getElementById("usnameInput");
usnameInput.addEventListener("keydown", (e) => {
    const regex = /[0-9]+/g;
    return regex.test(e.key) ? e.preventDefault() : null;
});

let currentIndex = 0;
function switchTraffic() {
    const trafficItems = document.querySelectorAll(".traffic_item");
    if (!trafficItems || trafficItems.length < 1) throw new Error("Traffic items is not initializied.");
    
    trafficItems.forEach(item => {
        item.style.backgroundImage = "url(/images/traffic_nolight.png)";
    });
    
    trafficItems[currentIndex].style.backgroundImage = "url(/images/traffic_light.png)";
    currentIndex = (currentIndex + 1) % trafficItems.length;
}

function switchBackground(clickedLi) {
    const li = document.querySelectorAll(".homework_section li");
    if (!li || li.length < 1) throw new Error("li texts is not initializied.");
    li.forEach((e) => {
        e.style.backgroundColor = null;
    });
    clickedLi ? clickedLi.style.backgroundColor = "orange" : null;
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