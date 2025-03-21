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

document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value.trim();

    let valid = true;
    let errors = [];

    const nameRegex = /^влад$/i;
    if (!nameRegex.test(name)) {
        valid = false;
        errors.push("Имя должно быть 'Влад'.");
    }

    const cleanedPhone = phone.replace(/[()\-\+]/g, "");
    if (!/^\d+$/.test(cleanedPhone)) {
        valid = false;
        errors.push("Телефон может содержать только цифры, скобки, тире и плюс.");
    }

    const emailRegex = /^(?=.{8,156}$)(?=.*\d)(?=.*@)(?=.*\.)/;
    if (!emailRegex.test(email)) {
        valid = false;
        errors.push("Почта должна быть от 8 до 156 символов и содержать @, точку и цифру.");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;
    if (!passwordRegex.test(password)) {
        valid = false;
        errors.push("Пароль должен быть от 6 до 12 символов и содержать одну маленькую, одну большую букву и цифру.");
    }

    if (!/^\d+$/.test(age)) {
        valid = false;
        errors.push("Возраст должен содержать только цифры.");
    } else {
        const ageNum = parseInt(age, 10);
        if (ageNum < 10 || ageNum > 120) {
        valid = false;
        errors.push("Возраст должен быть в диапазоне от 10 до 120.");
        }
    }

    if (!valid) {
        alert("Ошибки: \n" + errors.join("\n"));
        return;
    }

    const formData = {
        name: name,
        phone: cleanedPhone,
        email: email,
        password: password,
        age: age
    };

    return console.log("НОВАЯ АВТОРИЗАЦИЯ:", formData);
});