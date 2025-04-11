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
};

function unixStamp(stamp) {
    let date = new Date(stamp),
    year = date.getFullYear(),
    month = (date.getMonth() + 1).toString().padStart(2, "0"),
    day = date.getDate().toString().padStart(2, "0"),
    hour = date.getHours().toString().padStart(2, "0"),
    minutes = date.getMinutes().toString().padStart(2, "0"),
    secs = date.getSeconds().toString().padStart(2, "0");

    return { text: `${day}.${month}.${year}, ${hour}:${minutes}:${secs}`, y: year, m: month, d: day, h: hour, m: minutes, s: secs };
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

const regButton = document.querySelector(".regButton");
const regInput = document.getElementById("regInput");
const notification = document.querySelector(".notification");
const regContainer = document.querySelector(".reg_container");
const timer = document.querySelector(".timer");
const mainContainer = document.querySelector(".quiz_container");
const questionContainer = document.querySelector(".question_container");
const answerContainer = document.querySelector(".answers_container");
const finalContainer = document.querySelector(".final_container");
const nextButton = document.querySelector(".nextButton");
let notifTimeout = false, timerInterval = false, currentQuestion = 0, correctAnswers = 0;

function addToLocal(param, value) {
    if ((typeof param !== "string" || typeof value !== "string") || (!param || !value)) throw new Error("Запись в localStorage отменена. param или value не являются String.");
    return localStorage.setItem(param, value);
};

if (localStorage.getItem("userName").length > 0 && regInput) {
    regInput.value = localStorage.getItem("userName");
}

function sendNotification(text, type, width) {
    if (notifTimeout) return;
    let teext = "";

    !text ? teext += "text " : null;
    !type ? teext += "type " : null;

    if (!text || !type) throw new Error(`Ошибка отправления оповещения. Не хватает следующих параметров:\n${teext}`);
    if (!width) {
        width = Math.floor(150 + Math.floor(text.length * 5.1875));
    };

    if (notification) {
        notification.style.width = width;
        notification.children[0].textContent = text;

        if (type.toLowerCase() == "error") {
            notification.style.backgroundColor = "#a30000";
            notification.children[1].src = "/images/error.svg";
        } else if (type.toLowerCase() == "success") {
            notification.style.backgroundColor = "#0d9e00";
            notification.children[1].src = "/images/success.svg";
        }

        if (notification.classList.contains("hidden")) {
            notification.classList.remove("hidden");
            notification.classList.add("visible");
            notifTimeout = setTimeout(() => {
                notification.classList.remove("visible");
                notification.classList.add("hidden");
                notifTimeout = false;
            }, 3000);
        }
    };
};

async function getQuestion(id) {
    const response = await fetch("./questions.json");

    if (response.ok && response.status == 200) {
        const data = await response.json();
        return data[id];
    }
};

async function startGame() {
    timer.style.display = null;
    mainContainer.children[0].style.display = "none";
    regContainer.style.display = "none";
    questionContainer.style.display = "block";
    answerContainer.style.display = "flex";

    const question = await getQuestion(currentQuestion);
    questionContainer.children[1].textContent = question.text;

    for (let i = 0; i < question.options.length; i++) {
        answerContainer.children[i].textContent = question.options[i];
    }
};

function resetGame() {
    answerContainer.style.display = "none";
    questionContainer.style.display = "none";
    finalContainer.style.display = "none";
    mainContainer.children[0].style.display = "block";
    regContainer.style.display = "block";
    regContainer.classList.contains("regHide") ? regContainer.classList.remove("regHide") : null;
    currentQuestion = 0;
    correctAnswers = 0;
    timer.textContent = "5";
    Array.from(answerContainer.children).forEach((el) => {
        el.style.backgroundColor = "rgba(93, 155, 164, 0.7)";
    });
}

async function askQuestion(id, button) {
    const question = await getQuestion(currentQuestion);
    if (button.textContent == question.correctAnswer) {
        button.style.backgroundColor = "rgba(5, 158, 0, 0.7)";
        correctAnswers++;
        currentQuestion++
    } else {
        currentQuestion++
        button.style.backgroundColor = "rgba(156, 0, 0, 0.9)";
    }
    nextButton.style.display = "block";
};

async function nextQuestion() {
    nextButton.style.display = "none";
    if (currentQuestion <= 9) {
        Array.from(answerContainer.children).forEach((el) => {
            el.style.backgroundColor = "rgba(93, 155, 164, 0.7)";
        });

        const question = await getQuestion(currentQuestion);
        questionContainer.children[1].textContent = question.text;

        for (let i = 0; i < question.options.length; i++) {
            answerContainer.children[i].textContent = question.options[i];
        }
    } else {
        answerContainer.style.display = "none";
        questionContainer.style.display = "none";
        finalContainer.style.display = "block";
        finalContainer.children[0].textContent = `Правильных ответов: ${correctAnswers}`;
    }
};

nextButton.addEventListener("click", async () => {
    return await nextQuestion(currentQuestion);
});

regButton.addEventListener("click", () => {
    if (!regInput || regInput.value.length < 1) throw new Error("Регистрация отменена. Значение в Input пустое.");
    if (regInput.value.length < 3) throw new Error("Регистрация отменена. Значение в Input меньше 3х символов.");
    addToLocal("userName", regInput.value);

    if (!regContainer.classList.contains("regHide")) {
        regContainer.classList.add("regHide");
    }

    sendNotification(`Привет, ${regInput.value}!`, "success");
    timer.style.display = "block";

    timerInterval = setInterval(async () => {
        let newNumber = parseInt(timer.textContent) - 1;
        if (newNumber > 0) {
            timer.textContent = newNumber;
        } else {
            clearInterval(timerInterval);
            await startGame();
        }
    }, 1000);
});

Array.from(answerContainer.children).forEach((el) => {
    el.addEventListener("click", async () => {
        await askQuestion(currentQuestion, el);
    });
})

document.querySelector(".resetButton").addEventListener("click", () => {
    return resetGame();
});