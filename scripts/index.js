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

function func_1() {
    const date = "2025-12-31";
    let dateReversed = date.split('-').reverse().join("/");
    return `${dateReversed}`;
}

function func_2(str) {
    if (!str || typeof str !== "string") return "Функция требует String.";
    return str.split('').reverse().join('');
}

function func_3(str, symbol) {
    if ((!str || !symbol) || (typeof str !== "string" || typeof symbol !== "string")) return "Функция требует две String.";
    return str.includes(symbol) ? `Символ "${symbol}" есть в строке "${str}"` : `Символа "${symbol}" нет в строке "${str}"`;
}

function func_4() {
    const input = document.querySelector(".testInput").value.toString();
    const inputText = document.querySelector(".inputText");
    if (input.length < 1) {
        inputText ? inputText.textContent = "" : null;
        return console.log("Значение в Input пустое. Если в inputText был контент он автоматически очищен.");
    }
    if (input && inputText) {
        console.log(input.trim());
        inputText.textContent = input.trim();
    } else {
        return console.error("Input или inputText не инициализированы.");
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