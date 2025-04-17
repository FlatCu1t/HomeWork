import { Functions } from "./functions.js";
const functions = new Functions();

document.getElementById('search-btn').addEventListener('click', async function() {
    const title = document.getElementById('movie-title').value.trim();
    if (!title) return;

    const data = await functions.getFilmsData(title);
    const container = document.getElementById('movie-container');
    container.innerHTML = '';

    if (data.Response === "True") {
        data.Search.sort(function(a, b) { 
            if (b.Year > a.Year) return 1 
            if (b.Year < a.Year) return -1 
            return 0
        });

        data.Search.forEach(movie => {
            const poster = (movie.Poster && movie.Poster !== "N/A") ? movie.Poster : "./images/no-logo.png";
            const movieHTML = `
                <div class="movie">
                <img src="${poster}" alt="Постер фильма">
                <div class="movie-details">
                    <h2>${movie.Title}</h2>
                    <p><strong>Год:</strong> ${movie.Year}</p>
                </div>
                </div>
            `;
            container.innerHTML += movieHTML;
        });
    } else {
        container.innerHTML = '<p>Фильм не найден</p>';
    }
});

const now = new Date();

const dateStore = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear()
};

const Person = {};
Object.defineProperties(Person, {
    firstName: {
        value: "Иван",
        writable: true,
        enumerable: true,
        configurable: false
    },
    lastName: {
        value: "Иван",
        writable: true,
        enumerable: true,
        configurable: false
    },

    day: {
        enumerable: true,
        configurable: false,
        get() {
            return dateStore.day;
        },
        set(val) {
            const num = Number(val);
            if (!Number.isInteger(num) || num < 1 || num > 31) {
                throw new Error('Неверный день: должно быть целое от 1 до 31');
            }
            dateStore.day = num;
        }
    },

    month: {
        enumerable: true,
        configurable: false,
        get() {
            return dateStore.month;
        },
        set(val) {
            const num = Number(val);
            if (!Number.isInteger(num) || num < 1 || num > 12) {
                throw new Error('Неверный месяц: должно быть целое от 1 до 12');
            }
            dateStore.month = num;
        }
    },

    year: {
        enumerable: true,
        configurable: false,
        get() {
            return dateStore.year;
        },
        set(val) {
            const num = Number(val);
            if (!Number.isInteger(num) || num < 1900) {
                throw new Error('Неверный год: должно быть целое ≥ 1900');
            }
            dateStore.year = num;
        }
    }
});

console.log('Имя до:', Person.firstName);
Person.firstName = 'Сергей';
console.log('Имя после:', Person.firstName);

Person.day = 15;
Person.month = 12;
Person.year = 2022;
let text = "";

for (const key in Person) {
  if (Object.prototype.hasOwnProperty.call(Person, key)) {
    text += `${key}: ${Person[key]}\n`
  }
}

console.log(text);

const factGen = functions.factorialGenerator();
factGen.next().value;

console.log(factGen.next().value);
console.log(factGen.next().value);
console.log(factGen.next().value);
console.log(factGen.next().value);
console.log(factGen.next().value);

delete Person.lastName;