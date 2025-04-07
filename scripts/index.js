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

<<<<<<< HEAD
// Задание 1

async function asyncAdd(a, b) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + b);
        }, 0);
    });
}

function printCurrentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(`${day.toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${year}`);
}

printCurrentDate();

(async () => {
    const result = await asyncAdd(5, 7);
    console.log(result);
})();

// Задание 2

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

function isAuthorized() {
    return localStorage.getItem('isAuthorized') === 'true';
}

function login() {
    const username = prompt("Введите имя пользователя:");
    if (username) {
        localStorage.setItem('isAuthorized', 'true');
        alert("Вы авторизованы как " + username);
        loadPhoto();
    } else {
        alert("Логин отменён или не введён.");
    }
}

async function fetchPhoto() {
    try {
        const response = await fetch('https://sun9-62.userapi.com/impg/pQCEKM6RaiDMP6thveFgf-vSxuzU52QD3bpW6A/n9xx58nziA0.jpg?size=647x722&quality=95&sign=876347249c793ab6345e02e109a71d63&type=album');
        return response;
    } catch (error) {
        console.error("Ошибка при получении данных фото:", error);
    }
}

document.getElementById('loginBtn').addEventListener('click', login);

const img = new Image();
img.crossOrigin = 'anonymous';

fetchPhoto().then((res) => {
    img.src = res.url;
});

img.onload = async function() {
    await ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const quality = 0.1;
    const dataURL = await canvas.toDataURL('image/jpeg', quality);
    !isAuthorized() ? img.src = dataURL : null;
};

async function loadPhoto() {
    const photo = await fetchPhoto();
    if (photo) {
        img.src = isAuthorized() ? photo.url : img.src;
    }
}

// Задание 3

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error("Ошибка сети: " + response.status);
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Ошибка при получении данных пользователей:", error);
    }
};

function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${user.name}</h3>
        <p class="subtitle">CEO, ProCrew</p>
        <p class="phoneText">
        Tel: ${user.phone}
        <img src="/images/phone.svg" alt="icon" loading="lazy">
        </p>
        <p class="emailText">
        Email: ${user.email}
        <img src="/images/email.svg" alt="icon" loading="lazy">
        </p>
        <p class="companyDetails">Company Details</p>
        <p class="siteText">
        ${user.website}
        <img src="/images/home.svg" alt="icon" loading="lazy">
        </p>
        <p class="employeesText">
        <span>Employees:</span> 50 - 100
        <img src="/images/employees.svg" alt="icon" loading="lazy">
        </p>
        <p class="employeesText">
        <span>Location:</span> ${user.address.street}
        <img src="/images/location.svg" alt="icon" loading="lazy">
        </p>
    `;
    return card;
}

async function loadUserCards() {
    const users = await fetchUsers();
    const container = document.getElementById('cardContainer');

    if (users && Array.isArray(users)) {
        users.forEach(user => {
        const card = createUserCard(user);
            container.appendChild(card);
        });
    } else {
        container.innerHTML = "<p>Не удалось загрузить данные пользователей.</p>";
    }
}

loadUserCards();
=======
const WEATHER_API_KEY = "5247757012a3493eb1a142844250704";

// Input с городом
const cityInput = document.querySelector(".cityInput");

// Картинка погоды
const weatherImage = document.querySelector(".weather_img");

// Сегодняшний день
const currentDayWeek = document.querySelector(".currentDayWeek");
const currentDay = document.querySelector(".currentDay");

// Текущие градусы
const degrees = document.querySelector(".degrees");
const weatherType = document.querySelector(".weather_type");

// Ветер
const windSpeed = document.querySelector(".speed");
const windType = document.querySelector(".speed_second");
const SpeedContainer = document.querySelector(".speed_container");

// Шанс дождя
const rainChance = document.querySelector(".chanceRain");

// Давление
const mbar = document.querySelector(".mbar");

// Влажность
const humidityChance = document.querySelector(".percent");
const secondHumidityChance = document.querySelector(".humidityPercent");

function currentDayFunc() {
    const today = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov"]
    const dayName = daysOfWeek[today.getDay()];
    const monthName = months[(today.getMonth() + 1)];
    currentDayWeek.textContent = dayName;
    currentDay.textContent = `${monthName} ${today.getDate().toString().padStart(2, "0")}`;
}

currentDayFunc();

function getWindDescription(windSpeed) {
    switch (true) {
        case (windSpeed < 1):
            return "Calm";
        case (windSpeed >= 1 && windSpeed < 15):
            return "Light breeze";
        case (windSpeed >= 15 && windSpeed < 30):
            return "Moderate breeze";
        case (windSpeed >= 30 && windSpeed < 50):
            return "Strong wind";
        case (windSpeed >= 50 && windSpeed < 75):
            return "Storm";
        default:
            return "Hurricane";
    }
}

async function getWeatherData(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`);
    if (response.ok && response.status == 200) {
        const data = await response.json();
        return data;
    }
}

cityInput.addEventListener("input", async function() {
    const city = cityInput.value.trim();

    if (city) {
        const weatherData = await getWeatherData(city);
        degrees.textContent = Math.floor(weatherData.current.temp_c);
        weatherType.textContent = weatherData.current.condition.text;
        windSpeed.textContent = weatherData.current.wind_mph + " km/h";
        windType.textContent = getWindDescription(weatherData.current.wind_mph);
        SpeedContainer.style.right = (windType.textContent.length > 4 && windType.textContent.length <= 12) ? "-15px" : windType.textContent.length > 12 ? "-45px" : "0";
        rainChance.textContent = `${weatherData.current.precip_mm}%`
        mbar.textContent = `${weatherData.current.pressure_mb} mbar`;
        humidityChance.textContent = `${weatherData.current.humidity}%`;
        secondHumidityChance.textContent = `Humidity ${weatherData.current.humidity}%`;
        weatherImage.src = weatherData.current.condition.icon;
    }
});

async function defaultData() {
    const weatherData = await getWeatherData("Astana");
    degrees.textContent = Math.floor(weatherData.current.temp_c);
    weatherType.textContent = weatherData.current.condition.text;
    windSpeed.textContent = weatherData.current.wind_mph + " km/h";
    windType.textContent = getWindDescription(weatherData.current.wind_mph);
    SpeedContainer.style.right = (windType.textContent.length > 4 && windType.textContent.length <= 12) ? "-15px" : windType.textContent.length > 12 ? "-45px" : "0";
    rainChance.textContent = `${weatherData.current.precip_mm}%`
    mbar.textContent = `${weatherData.current.pressure_mb} mbar`;
    humidityChance.textContent = `${weatherData.current.humidity}%`;
    secondHumidityChance.textContent = `Humidity ${weatherData.current.humidity}%`;
    weatherImage.src = weatherData.current.condition.icon;
}

(async () => {
    await defaultData();
})();
>>>>>>> 825c18195df7a24e21932d6d2f19c5fd3ae09c87
