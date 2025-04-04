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

function unixStamp(stamp, type) {
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

function updateAuthSection() {
    const authSection = document.getElementById('auth-section');
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    if (token && name) {
        authSection.innerHTML = `<span class="auth_span">Привет, ${name}</span> <button id="logout-btn">Выйти</button>`;
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            updateAuthSection();
        });
    } else {
        authSection.innerHTML = `<button id="login-btn">Авторизация</button>`;
        document.getElementById('login-btn').addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
}

updateAuthSection();

document.getElementById('search-btn').addEventListener('click', function() {
const title = document.getElementById('movie-title').value.trim();
if (!title) return;
const url = `https://www.omdbapi.com/?apikey=83f2b988&s=${encodeURIComponent(title)}`;

fetch(url).then(response => response.json()).then(data => {
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
    }}).catch(err => console.error(err));
})