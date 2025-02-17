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

function func_1(massive) {
    if (!massive) return "Функция требует массив.";
    const highestNum = massive.sort((a, b) => {
        return b - a;
    });

    const lowestNum = massive.sort((a, b) => {
        return a - b;
    });

    console.log(`Наибольшее значение массива: ${highestNum.pop()}\nНаименьшее значение массива: ${lowestNum.shift()}`);
    return "Конец функции.";
}

function func_2() {
    let massive = [];
    for (let i = 0; i < 5; i++) {
        const num = parseInt(prompt(`Введите число для индекса ${i}`));
        massive.push(num);
    }
    let summ = 0;
    massive.forEach((a, b) => {
        summ += a;
    })
    console.log(`Массив: ${massive}\nСумма всех значений массива: ${summ}\nСреднее значение массива: ${summ / massive.length}`);
    return "Конец функции.";
}

function func_3(massive_1, massive_2) {
    if (!massive_1 || !massive_2) return "Функция требует 2 массива.";
    if ((massive_1.length !== massive_2.length) || (massive_2.length !== massive_1.length)) return "Требуются массивы одинаковой длины";

    massive_1.forEach((a, b) => {
        let text = a > massive_2[b] ? `Число ${a} больше числа ${massive_2[b]}` : `Число ${massive_2[b]} больше числа ${a}\n`;
        a % massive_2[b] === 0 ? text += `Число ${a} делится на число ${massive_2[b]}` : massive_2[b] % a === 0 ? text += `Число ${massive_2[b]} делится на число ${a}`: null;
        console.log(`Число из первого массива: ${a}\nЧисло из второго массива: ${massive_2[b]}\n\n--------------[ДОП.ИНФОРМАЦИЯ]--------------\n\n${text}`);
    })

    return "Конец функции.";
}

function func_4(massive) {
    if (!massive) return "Функция требует массив.";
    let massive_2 = [];
    massive.forEach((a, b) => {
        if (a % 2 === 0) massive_2.push(a)
    })
    console.log(`Второй массив:\n${massive_2}`);
    return "Конец функции.";
}

class Product {
    constructor(id, name, price, categoryId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
    }
}

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Store {
    constructor() {
        this.categories = [];
        this.products = [];
    }

    addCategory(category) {
        this.categories.push(category);
    }

    addProduct(product) {
        this.products.push(product);
    }

    showCategories() {
        console.log("Категории:");
        for (let cat of this.categories) {
            console.log(`${cat.id}: ${cat.name}`);
        }
    }

    showProducts() {
        console.log("Товары:");
        for (let product of this.products) {
            let category = this.categories.find(cat => cat.id === product.categoryId);
            let categoryName = category ? category.name : "Без категории";
            console.log(`${product.id}: ${product.name} - ${product.price} руб. (${categoryName})`);
        }
    }

    filterProductsByCategory(categoryId) {
        console.log(`Товары выбранной категории (${categoryId}):`);
        for (let product of this.products) {
            if (product.categoryId === categoryId) {
                console.log(`${product.id}: ${product.name} - ${product.price} руб.`);
            }
        }
    }
}

let store = new Store();

// Категории
store.addCategory(new Category(1, "Электроника"));
store.addCategory(new Category(2, "Одежда"));
store.addCategory(new Category(3, "Книги"));

// Продукты
store.addProduct(new Product(1, "Смартфон", utils.ssp(15000), 1));
store.addProduct(new Product(2, "Ноутбук", utils.ssp(55000), 1));
store.addProduct(new Product(3, "Футболка", 500, 2));
store.addProduct(new Product(4, "Джинсы", 2000, 2));
store.addProduct(new Product(5, "JavaScript: Подробное руководство", 1000, 3));

// Вывести категории - store.showCategories();
// Вывести продукты - store.showProducts();
// Фильтрация товаров по категории - store.filterProductsByCategory(id);

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