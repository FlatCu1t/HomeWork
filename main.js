import { Functions } from "./scripts/functions.js";
const functions = new Functions();

import fs from "fs";
import http from "http";
import path, { dirname } from 'path';
import { fileURLToPath, URL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __currentDir = dirname(__filename);
const __mainDir = path.resolve();

const server = http.createServer((req, res) => {
    if (req.url == "/html") {
        res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });

        const stream = fs.createReadStream(path.join(__mainDir, "index.html"), { encoding: "utf-8" });

        stream.on("error", (err) => {
            console.error("Stream error!", err);
            if (!res.headersSent) {
                res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
            }
            res.end("Ошибка чтения файла.");
        });

        stream.pipe(res);
    }

    else if (req.url == "/css") {
        res.writeHead(200, { "content-type": "text/css; charset=utf-8" });

        const stream = fs.createReadStream(path.join(__mainDir, "css", "index.css"), { encoding: "utf-8" });

        stream.on("error", (err) => {
            console.error("Stream error!", err);
            if (!res.headersSent) {
                res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
            }
            res.end("Ошибка чтения файла.");
        });

        stream.pipe(res);
    }

    else {
        res.writeHead(404, { "content-type": "text/html; charset=utf-8" });

        res.end(`
            <h2>Извините, ваш запрос недоступен.</h2>
            <p>Доступные маршруты: <a href="/html">/html</a> и <a href="/css">/css</a></p>
            `)
    }
});

server.listen(3000);