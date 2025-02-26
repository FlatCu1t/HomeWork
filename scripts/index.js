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
    const date = new Date(stamp -= stamp2);
    let text = ``;

    stamp = stamp / 1000;

    let s = stamp % 60;
    stamp = ( stamp - s ) / 60;

    let m = stamp % 60;
    stamp = ( stamp - m ) / 60;

    let	h = ( stamp ) % 24;
    let	d = ( stamp - h ) / 24;

    d > 0 ? text += `${Math.floor(d)} ${utils.decl(d, ["день", "дня", "дней"])}, ` : null;
    h > 0 ? text += `${Math.floor(h)} ${utils.decl(h, ["час", "часа", "часов"])} ` : null;
    m > 0 ? text += `${Math.floor(m)} ${utils.decl(m, ["минуту", "минуты", "минут"])} ` : null;
    text += `${Math.floor(s)} ${utils.decl(s, ["секунду", "секунды", "секунд"])}`;

    return text;
}

console.log(`Для удобства: fractions(new Fraction(1,2), new Fraction(3,4));`);

const car = {
    manufacturer: "Toyota",
    model: "Corolla",
    year: 2020,
    averageSpeed: 80
};

function displayCarInfo() {
    const infoDiv = document.querySelector(".car-info");
    if (!infoDiv.style.display) {
        infoDiv.style.display = "block"
        infoDiv.innerHTML = `
            <p class='carInfo'><strong>Производитель:</strong> ${car.manufacturer}</p>
            <p class='carInfo'><strong>Модель:</strong> ${car.model}</p>
            <p class='carInfo'><strong>Год выпуска:</strong> ${car.year}</p>
            <p class='carInfo'><strong>Средняя скорость:</strong> ${car.averageSpeed} км/ч</p>
        `;
    } else {
        infoDiv.style.display = null
        infoDiv.innerHTML = ``;
    }
}

function calculateTravelTime() {
    const distance = parseFloat(document.querySelector(".distance").value);
    if (isNaN(distance) || distance <= 0) {
        throw new Error("Пожалуйста, введите корректное расстояние");
        return;
    }

    const time = distance / car.averageSpeed;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    document.querySelector(".time-result").innerHTML =
        `<p>Необходимое время в пути: ${hours} ч ${minutes} мин</p>`;
}

class Fraction {
    constructor(numerator, denominator) {
        if (denominator === 0) {
            throw new Error("Знаменатель не может быть равен 0");
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }

    static gcd(a, b) {
        return b === 0 ? a : Fraction.gcd(b, a % b);
    }

    reduce() {
        const divisor = Fraction.gcd(Math.abs(this.numerator), Math.abs(this.denominator));
        return new Fraction(this.numerator / divisor, this.denominator / divisor);
    }

    add(other) {
        const newNumerator = this.numerator * other.denominator + other.numerator * this.denominator;
        const newDenominator = this.denominator * other.denominator;
        return new Fraction(newNumerator, newDenominator).reduce();
    }

    subtract(other) {
        const newNumerator = this.numerator * other.denominator - other.numerator * this.denominator;
        const newDenominator = this.denominator * other.denominator;
        return new Fraction(newNumerator, newDenominator).reduce();
    }

    multiply(other) {
        const newNumerator = this.numerator * other.numerator;
        const newDenominator = this.denominator * other.denominator;
        return new Fraction(newNumerator, newDenominator).reduce();
    }

    divide(other) {
        if (other.numerator === 0) {
            throw new Error("Деление на ноль невозможно");
        }
        const newNumerator = this.numerator * other.denominator;
        const newDenominator = this.denominator * other.numerator;
        return new Fraction(newNumerator, newDenominator).reduce();
    }

    toString() {
        return `${this.numerator}/${this.denominator}`;
    }
}

function fractions(a, b) {
    if ((!a || !b) || (!(a instanceof Fraction) || !(b instanceof Fraction))) throw new Error("Функция требует 2 объекта, содержащие числитель и знаменатель.");

    try {
        console.log(`Сложение: ${a.toString()} + ${b.toString()} = ${a.add(b).toString()}
Вычитание: ${a.toString()} - ${b.toString()} = ${a.subtract(b).toString()}
Умножение: ${a.toString()} * ${b.toString()} = ${a.multiply(b).toString()}
Деление: ${a.toString()} / ${b.toString()} = ${a.divide(b).toString()}`);
        return "Конец функции.";
    } catch (error) {
        console.error(error.message);
        return "Функция завершилась с ошибкой.";
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