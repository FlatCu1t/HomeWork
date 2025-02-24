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
    random: (x, y) => {
        return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
    }
}

function getUnix() {
    return Math.floor(new Date().getTime());
}

function unixStamp(stamp) {
    let date = new Date(stamp),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        month2 = month < 10 ? "0"+month : month,
        day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate(),
        hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
        secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    return `${day}.${month2}.${year}, ${hour}:${minutes}:${secs}`;
}

function inputChecker(inputs) {
    const telephoneRegex = /^(\+7|8|7)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!inputs || inputs.length <= 0) throw new Error("Функции требуется массив с инпутами.");
    for (let i = 0; i < inputs.length; i++) {
        switch(i) {
            case 0:
                if (typeof inputs[i].value !== "string") throw new Error("В поле \"Имя\" должен быть текст.");
                break;
            case 1:
                if (typeof inputs[i].value !== "string") throw new Error("В поле \"Фамилия\" должен быть текст.");
                break;
            case 2:
                if (!telephoneRegex.test(inputs[i].value)) throw new Error("Поле \"Номер телефона\" некорректно.");
                break;
            case 3:
                if (!emailRegex.test(inputs[i].value)) throw new Error("Поле \"Электронная почта\" некорректно.");
                break;
            case 4:
                if (isNaN(parseInt(inputs[i].value))) throw new Error("В поле \"Возраст\" должно быть число.");
                break;
        }
    }
}

function test() {
    try {
        const inputs = document.querySelectorAll("input");
        inputChecker(inputs);
        const user = { name: inputs[0].value, surname: inputs[1].value, number: `${inputs[2].value}`, email: inputs[3].value, age: parseInt(inputs[4].value) };
        return console.log(`🙍‍♂️ ЗАПРОС НА НОВУЮ ОТПРАВКУ ДАННЫХ\n\n`, user, `\n\n⌛ Дата отправки: ${unixStamp(getUnix())}`);
    } catch (error) {
        return console.error(error.stack);
    }
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