export class Functions {
    static user = { name: "Vlad", age: 21, address: { street: "Street", district: "District" }, city: "Astana" };

    utils = {
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
    };

    getUnix() {
        return Math.floor(new Date().getTime());
    };

    unixStamp(stamp) {
        let date = new Date(stamp),
        year = date.getFullYear(),
        month = (date.getMonth() + 1).toString().padStart(2, "0"),
        day = date.getDate().toString().padStart(2, "0"),
        hour = date.getHours().toString().padStart(2, "0"),
        minutes = date.getMinutes().toString().padStart(2, "0"),
        secs = date.getSeconds().toString().padStart(2, "0");
    
        return { text: `${day}.${month}.${year}, ${hour}:${minutes}:${secs}`, y: year, m: month, d: day, h: hour, m: minutes, s: secs };
    };

    unixStampDays(stamp, stamp2) {
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
    };

    getObject(...values) {
        let obj = { name: "", email: "", telephone: "" }
        values.map((el, indx) => {
            switch (indx) {
                case 0:
                    obj.name = el;
                    break;
                case 1:
                    obj.email = el;
                    break;
                case 2:
                    obj.telephone = el;
                    break;
                default:
                    break;
            }
        });
        return obj;
    }

    concat_massives(...massives) {
        return console.log(massives.flat());
    }

    async getUsers() {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (response.ok && response.status == 200) {
            const data = await response.json();
            return data;
        }
    }

    teest(...values) {
        if (values[0].length > 0) {
            values[0].map((el) => {
                const { id: id, title: title } = el;
                return console.log(`Пользователь ${id}. Заметка: ${title}`);
            });
        } else {
            values.map((el) => {
                const { id: id, title: title } = el;
                return console.log(`Пользователь ${id}. Заметка: ${title}`);
            });
        }
    }
};