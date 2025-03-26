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

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 600;

let game;
const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };
let direction = "RIGHT";
let changingDirection = false;
let score = 0;
let gameTime = 0;
let gameTimer;

const img = new Image();
img.src = "./images/food.svg";
const settings = { headColor: "lime", tailColor: "white" };

function calculateGameTime(gameTime) {
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
}

function generateFood() {
    let newFood;
    let collision;
    do {
        collision = false;
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };

        for (let i = 0; i < snake.length; i++) {
        if (newFood.x === snake[i].x && newFood.y === snake[i].y) {
                collision = true;
                break;
            }
        }
    } while (collision);
    return newFood;
}
  
let food = generateFood();

function control(event) {
    if (changingDirection) return;
    const key = event.keyCode;
    if (key == 37 && direction !== "RIGHT") {
        direction = "LEFT";
        changingDirection = true;
    } else if (key == 38 && direction !== "DOWN") {
        direction = "UP";
        changingDirection = true;
    } else if (key == 39 && direction !== "LEFT") {
        direction = "RIGHT";
        changingDirection = true;
    } else if (key == 40 && direction !== "UP") {
        direction = "DOWN";
        changingDirection = true;
    }
}

document.addEventListener("keydown", control);

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }

    return false;
}

function draw() {
    changingDirection = false;
    
    ctx.fillStyle = "rgb(44, 44, 44)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? settings.headColor : settings.tailColor;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(img, food.x, food.y, 25, 25);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "UP") snakeY -= box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = generateFood();
        score++;
        document.getElementById("game_score").textContent = `Счёт: ${score}`;
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake))
    {
        clearInterval(game);
        clearInterval(gameTimer);
        document.getElementById("game_Title").textContent = "ЗМЕЙКА (GAME OVER)"
        return;
    }

    snake.unshift(newHead);
}

game = setInterval(draw, 110);
gameTimer = setInterval(() => {
    gameTime++;
    document.getElementById("game_time").textContent = `Время игры: ${calculateGameTime(gameTime)}`;
}, 1000);

function restartGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    direction = "RIGHT";
    changingDirection = false;
    score = 0;
    gameTime = 0;
    document.getElementById("game_Title").textContent = "ЗМЕЙКА";
    document.getElementById("game_score").textContent = "Счёт: 0";
    document.getElementById("game_time").textContent = "Время игры: 0:00";
    clearInterval(game);
    clearInterval(gameTimer);
    food = generateFood();
    game = setInterval(draw, 110);
    gameTimer = setInterval(() => {
        gameTime++;
        document.getElementById("game_time").textContent = `Время игры: ${calculateGameTime(gameTime)}`;
    }, 1000);
};

document.getElementById("restartButton").addEventListener("click", () => {
    return restartGame();
});

function applySettings() {
    const inputs = document.querySelectorAll(".settings_input");
    inputs.forEach((el, index) => {
        switch (index) {
            case 0:
                settings.headColor = el.value;
                break;
            case 1:
                settings.tailColor = el.value;
                break;
        }
    });
}

document.getElementById("settings_submit").addEventListener("click", () => {
    return applySettings();
});