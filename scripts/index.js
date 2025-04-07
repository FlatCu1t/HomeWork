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