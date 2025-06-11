import { utils } from './utils.js';

export interface TimeStampInfo {
  text:     string;
  y:        number;
  m:        string;
  d:        string;
  h:        string;
  min:      string;
  s:        string;
}

export interface DiffInfo {
  years:   number;
  days:    number;
  hours:   number;
  minutes: number;
  seconds: number;
  text:    string;
}

export class Functions {
    
    public getUnix(): number {
        const nowUtcSec = Math.floor(Date.now());
        return nowUtcSec + Math.floor(5 * 3600);
    }
    
    public unixStamp(stamp: number): any {
        const date = new Date(stamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const secs = String(date.getSeconds()).padStart(2, '0');

        return {
            text: `${day}.${month}.${year}, ${hour}:${minutes}:${secs}`,
            y: year,
            m: month,
            d: day,
            h: hour,
            min: minutes,
            s: secs,
        };
    };

    public unixStampDays(stamp: number | string, stamp2: number | string): DiffInfo {
        const date1 = new Date(stamp);
        const date2 = new Date(stamp2);

        let years = date1.getFullYear() - date2.getFullYear();
        const lastAnniversary = new Date(date2);
        lastAnniversary.setFullYear(date2.getFullYear() + years);

        if (lastAnniversary > date1) {
            years--;
            lastAnniversary.setFullYear(date2.getFullYear() + years);
        }

        const remainderMs = date1.getTime() - lastAnniversary.getTime();
        const seconds = Math.floor(remainderMs / 1000) % 60;
        const minutes = Math.floor(remainderMs / (1000 * 60)) % 60;
        const hours = Math.floor(remainderMs / (1000 * 60 * 60)) % 24;
        const days = Math.floor(remainderMs / (1000 * 60 * 60 * 24));

        let textParts: string[] = [];

        if (years > 0) {
            textParts.push(`${years} ${utils.decl(years, ['год', 'года', 'лет'])}`);
        }

        if (days > 0) {
            textParts.push(`${days} ${utils.decl(days, ['день', 'дня', 'дней'])}`);
        }

        if (hours > 0) {
            textParts.push(`${hours} ${utils.decl(hours, ['час', 'часа', 'часов'])}`);
        }

        if (minutes > 0) {
            textParts.push(`${minutes} ${utils.decl(minutes, ['минуту', 'минуты', 'минут'])}`);
        }

        textParts.push(`${seconds} ${utils.decl(seconds, ['секунду', 'секунды', 'секунд'])}`);

        return {
            years,
            days,
            hours,
            minutes,
            seconds,
            text: textParts.join(', '),
        };
    };

    async getData(url: string) {
        const response = await fetch(url);
        if (response.ok && response.status == 200) {
            const data = await response.json();
            return data || response;
        }
        else {
            throw new Error(`getData get error.\n` + response.statusText);
        };
    };
}