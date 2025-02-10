let timer = false;

function func_1(hours, minutes, seconds) {
    if (isNaN(hours) || hours <= 0) hours = 0;
    if (isNaN(minutes) || minutes < 0) minutes = 0;
    if (isNaN(seconds) || seconds < 0 ) seconds = 0;
    hours > 60 ? hours = 60 : null;
    minutes > 60 ? minutes = 60 : null;
    seconds > 60 ? seconds = 60 : null;

    const timeContainer = document.querySelector(".timeSpan");
    timeContainer.style.display = "block";

    function updateTime() {
        let text = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        timeContainer.textContent = text;

        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        } else {
            clearInterval(timer);
            console.log("Время истекло. Таймер будет скрыт через 2 секунды");
            setTimeout(() => {
                timeContainer.style.display = null;
                timer = false;
            }, 2000);
        }
    }

    if(!timer) {
        timer = setInterval(updateTime, 1000)
        updateTime();
        return "Таймер запущен.";
    } else {
        return `Таймер уже запущен. Для остановки таймера введите функцию stopTimer.`;
    }
}

function stopTimer() {
    if (timer) {
        const timeContainer = document.querySelector(".timeSpan");
        clearInterval(timer);

        setTimeout(() => {
            timeContainer.style.display = null;
            timer = false;
        }, 2000);

        return "Таймер остановлен. Он будет скрыт через 2 секунды";
    } else {
        return `В данный момент таймер не запущен.`;
    }
}

function func_2(num) {
    let result = 1;
    for (let i = 0; i < num; i++) {
        result += (result * i);
    }
    return result;
}

function func_3(a, b, c) {
    if (!a || !b || !c) return "Необходимо 3 цифры или числа.";
    return Number(a.toString() + b.toString() + c.toString());
}

function func_4(a, b) {
    if (a && b) {
        return "Площадь прямоугольника: " + (a * b);
    } else {
        return "Плошадь квадрата: " + (a * a);
    }
}

function func_5(num) {
    if (isNaN(num) || num <= 1) return false;
    
    let sum = 0;

    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== 1 && i !== num / i) {
                sum += num / i;
            }
        }
    }

    return sum === num;
}

function pickFunction() {
    const text = prompt("Выберите функцию (1-1):");
    if (text == null) return;
    try {
        eval("func_" + text + "()");
    } catch (error) {
        console.error(error);
        return alert("Такой функции нет.");
    }
}