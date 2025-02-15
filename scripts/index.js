// UTILS FUNCTION

const utils = {
    sp: (int) => {
        int = int.toString();
        if(int >= 10000) {
            return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join(''); 
        } else {
            return int
        }
    },
    ssp: (int) => { 
        int = int.toString();
        if(int >= 10000) {
            return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join(' ').split('').reverse().join(''); 
        } else {
            return int
        }
    }
}

class Car_base {
    constructor(weight, color, speed, mark, model, carClass, year, price, hp) {
        this.weight = weight;
        this.color = color;
        this.speed = speed;
        this.mark = mark;
        this.model = model;
        this.carClass = carClass;
        this.year = year;
        this.price = price;
        this.hp = hp;
    }

    kilometers(value) {
        if (value <= 0 || typeof value !== "number") return console.error(`Для правильной работы функции необходимо передать число > 0.`);
        return `За ${value} часов машина проедет ${Math.floor(this.speed * value)} километров`;
    }
}

const cars = [new Car_base(1575, "жёлтый", 350, "Lamborghini", "Aventador", "S", "2016 - 2022", "41 994 000 - 74 505 668₽", 770), new Car_base(1970, "чёрный", 400, "Bugatti", "Chiron", "S", "2016 - 2023", "390 000 000 - 420 000 000₽", 1500), new Car_base(2580, "чёрный", 230, "Mercedes-Benz", "G65 AMG", "G", "2015 - 2018", "7 640 000₽", 630)];

for (let i = 0; i < cars.length; i++) {
    console.log(`ИНФОРМАЦИЯ ОБ АВТОМОБИЛЕ ${cars[i].mark.toUpperCase()} ${cars[i].model.toUpperCase()}:\n\nМарка: ${cars[i].mark}\nМодель: ${cars[i].model}\nМаксимальная скорость: ${cars[i].speed}км/ч\nМощность: ${cars[i].hp} л.с.\nКласс машины: ${cars[i].carClass}-класс\nМасса автомобиля: ${cars[i].weight} кг.\nЦвет автомобиля: ${cars[i].color}\nГода выпуска: ${cars[i].year}\nЦена автомобиля: ${cars[i].price}\n${cars[i].kilometers(12)}\n\n-----------------------------------------------------\n\n`);
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