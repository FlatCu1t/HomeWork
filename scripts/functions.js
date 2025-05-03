export class Functions {
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

    async getData(url) {
        const response = await fetch(url);
        if (response.ok && response.status == 200) {
            const data = await response.json();
            return data ? data : response;
        } else {
            return response.statusText;
        };
    };

    clearErrors() {
        $('.error-message').remove();
    }
    
    getErrors(colors) {
        const errors = [];
        const $inputs = $('.inputs_container input');
        const mode = $('#typeSelect').val();
    
        const name = $inputs.eq(0).val().trim();
        if (!name) {
            errors.push({ index: 0, msg: 'Введите название цвета' });
        }

        if (colors.find((e) => e == name)) {
            console.log(`FINDED`);
            errors.push({ index: 0, msg: 'Это название цвета уже используется.' });
        }
    
        const val = $inputs.eq(1).val().trim();
        if (!val) {
            errors.push({ index: 2, msg: 'Введите код цвета' });
        } else if (mode === 'RGB' || mode === 'RGBA') {
            const parts = val.split(/\s*,\s*/);
            const expected = mode === 'RGB' ? 3 : 4;
            if (parts.length !== expected) {
                errors.push({
                    index: 2,
                    msg: `Ожидалось ${expected} значений через запятую`
                });
            } else {
                parts.forEach((el, i) => {
                    const num = Number(el);
                    const ok = i < 3 ? Number.isInteger(num) && num >= 0 && num <= 255 : !isNaN(num) && num >= 0 && num <= 1;
                    if (!ok) {
                        const range = i < 3 ? '0–255' : '0–1';
                        errors.push({
                            index: 2,
                            msg: `Неверное значение #${i + 1} (должно быть в диапазоне ${range})`
                        });
                    }
                });
            }
        } else if (mode === 'HEX') {
            if (!/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(val)) {
                errors.push({ index: 2, msg: 'HEX: формат #RGB или #RRGGBB' });
            }
        }

        colors.push(name);
    
        return errors;
    }
    
    showError(index, msg) {
        const $para = $('.inputs_container p').eq(index);
        $para.find('.error-message').remove();
        $para.append($('<span class="error-message"></span>').text(msg));
    }
    
    validateAndShow(colors) {
        this.clearErrors();
        const errors = this.getErrors(colors);
        if (errors.length) {
            errors.forEach(e => this.showError(e.index, e.msg));
            return false;
        }

        return true;
    }

    getContrastYIQ(rgbStr) {
        const [r, g, b] = rgbStr.split(/\s*,\s*/).map(n => parseInt(n, 10));
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#000000' : '#ffffff';
    }
    
    addColor() {
        const $inputs = $('.inputs_container input');
        const mode = $("#typeSelect").val();
        const code = $inputs.eq(1).val().trim();
        if (!code) return;
      
        let bgColor;
        if (mode === "RGB") {
            bgColor = `rgb(${code})`;
        } else if (mode === "RGBA") {
            bgColor = `rgba(${code})`;
        } else {
            bgColor = code;
        }
      
        const rgbOnly = code.replace(/rgba?\(|\)|\s/g, '').split(',').slice(0, 3).join(',');
        const contrast = this.getContrastYIQ(rgbOnly);
      
        const $container = $(".colors_container");
        const $item = $(`
          <div class="color_item" style="background-color: ${bgColor}">
            <div class="color_info" style="background-color: ${contrast}">
                <p style="color: ${bgColor}">${$inputs.eq(0).val().trim()}</p>
                <p style="color: ${bgColor}">${bgColor}</p>
            </div>
          </div>
        `);
      
        $container.append($item);
    }

    getFormInputs() {
        const container = $(".form_container");
        if (container) {
            return container.find("input");
        }
    }

    getPercents() {
        const inputs = this.getFormInputs();
        if (inputs && inputs.length > 0) {
            const inputPercent = 100 / inputs.length;
            const textureWidthPerInput = 500 / inputs.length;
            const progressBar = $(".progress_bar_texture");
            let totalPercent = 0;
            let totalWidth = 0;
            progressBar.text("");
            Array.from(inputs).forEach((el) => {
                if (el.value.length > 1 || el.textContent.length > 1) {
                    totalPercent += inputPercent;
                    totalWidth += textureWidthPerInput;
                }
            });

            progressBar.animate({
                width: totalWidth
            }, 250);

            return totalPercent;
        }
    }
}