function factorial(x) {
    return x < 0 ? console.error("Факториал отрицательного числа не определён") : (x == 0 || x == 1) ? 1 : x * factorial(x - 1);
}

const user = { name: "John", age: 30 };

function userInfo(user) {
    if (!user) return "Обьект не передан";
    if (Object.keys(user).length < 1) return "Передан пустой объект";
    if (!user.age) return "В объекте не передан ключ 'age'";
    return user;
}

let city1 = {};
city1.name = "ГородN", city1.population = 10000000;

city1.getName = function() {
    return this.name;
};

city1.exportStr = function() {
    return "name=" + this.name + ", population=" + this.population;
};

const city2 = {
    name: "ГородM",
    population: 10000000000,
    getName: function() {
        return this.name;
    },
    exportStr: function() {
        return "name=" + this.name + ", population=" + this.population;
    }
};

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