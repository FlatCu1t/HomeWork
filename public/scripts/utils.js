export const utils = {
    sp(n) {
        const s = n.toString();
        return +s >= 10000
            ? s
                .split('')
                .reverse()
                .join('')
                .match(/\d{1,3}/g)
                .join('.')
                .split('')
                .reverse()
                .join('')
            : s;
    },
    ssp(n) {
        const s = n.toString();
        return +s >= 10000
            ? s
                .split('')
                .reverse()
                .join('')
                .match(/\d{1,3}/g)
                .join(' ')
                .split('')
                .reverse()
                .join('')
            : s;
    },
    decl(n, titles) {
        return titles[n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
                ? 1
                : 2];
    },
    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
