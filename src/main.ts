import { Functions } from "./functions.js";
const functions = new Functions();

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import crypto from "crypto";
const __mainDir = path.resolve();
const __publicDir = path.join(__mainDir, "public");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__mainDir, 'public')));
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get("/", (req, res) => {
  res.render("index", { user: null });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/cabinet", async (req, res) => {
  if (!req.query) {
    res.status(404).send("Произошла ошибка. req.query нету.");
    return;
  }

  const response = await fetch("http://localhost:3000/users/get", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" }
  });

  if (response.ok && response.status == 200) {
    const data = await response.json();
    const user = data.users.find((x: any) => x.id == req.query.userID);
    if (user) {
      res.render("cabinet", { user: user });
    } else {
      res.render("cabinet", { user: null });
    }
  }
});

app.post("/login", async (req, res) => {
  if (!req.body) {
    res.status(404).send("Произошла ошибка. req.body нету.");
    return;
  }

  const response = await fetch("http://localhost:3000/users/get", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" }
  });

  if (response.ok && response.status == 200) {
    const { userLogin, password } = req.body;
      const data = await response.json();
      const user = data.users.find((x: any) => x.login == userLogin);
      if (user) {
        if (user.password == crypto.createHash("sha256").update(password).digest("hex")) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      }
  }
});

app.post("/users/get", async (req: any, res: any) => {
  try {
    const fileContent = await fs.promises.readFile(path.join(__publicDir, "data", "users.json"), { encoding: "utf-8" });
    const usersData = JSON.parse(fileContent);
    return res.status(200).json(usersData);
  } catch (err) {
    console.error("Ошибка при чтении users.json:", err);
    return res.status(500).json({ error: "Не удалось прочитать список пользователей" });
  }
});

app.post("/users/add", async (req, res) => {
  if (!req.body) {
    res.status(404).send("Возникла ошибка.");
    return;
  }

  const response = await fs.promises.readFile(path.join(__publicDir, "data", "users.json"), "utf-8");
  const data = JSON.parse(response);
  if (data) {
    const { user } = req.body;
    data.users.push({
      id: data.users.length + 1,
      login: user.login,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      password: crypto.createHash("sha256").update(user.password).digest("hex")
    });

    await fs.promises.writeFile(path.join(__publicDir, "data", "users.json"), JSON.stringify(data, null, 2), "utf-8");
    res.sendStatus(200);
  }
});

app.post("/users/update", async (req: any, res: any) => {
  try {
    const { id, avatar, name, email, login, password } = req.body;
    if (typeof id !== "number") {
      return res.status(400).json({ error: "Некорректный или отсутствующий id пользователя" });
    }

    const fileContent = await fs.promises.readFile(path.join(__publicDir, "data", "users.json"), { encoding: "utf-8" });
    const usersData = JSON.parse(fileContent);
    if (!Array.isArray(usersData.users)) {
      return res.status(500).json({ error: "Неверный формат файла users.json (нет поля users)" });
    }

    const userIndex = usersData.users.findIndex((u: any) => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: `Пользователь с id=${id} не найден` });
    }

    const updatingFields = { avatar, name, email, login, password };
    Object.entries(updatingFields).forEach(([fieldKey, fieldValue]) => {
      if (fieldValue !== undefined) {
        usersData.users[userIndex][fieldKey] = fieldValue;
      }
    });

    const newFileContent = JSON.stringify(usersData, null, 2); 
    await fs.promises.writeFile(path.join(__publicDir, "data", "users.json"), newFileContent, { encoding: "utf-8" });

    return res.status(200).json({
      success: true,
      user: usersData.users[userIndex],
      message: `Пользователь с id=${id} успешно обновлён`
    });
  } catch (err) {
    console.error("Ошибка в /users/update:", err);
    return res.status(500).json({ error: "Внутренняя ошибка сервера при обновлении пользователя" });
  }
});

app.use((req, res) => {
  res.status(404).send("Такой страницы не существует.");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});