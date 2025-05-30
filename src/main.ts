import { Functions } from "./functions.js";
const functions = new Functions();

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import crypto from "crypto";
const __mainDir = path.resolve();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__mainDir, "public", "index.html"));
});

app.use(express.static(path.join(__mainDir, 'public')));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__mainDir, "public", "login.html"));
});

app.post("/users/get", (req, res) => {
  res.status(200).sendFile(path.join(__mainDir, "public", "data", "users.json"));
});

app.post("/updatedPassword", async (req, res) => {
  if (!req.body) res.status(400);
  let { password } = req.body;
  password = crypto.createHash("sha256").update(password).digest('hex');
  res.json({ password });
})

app.post("/users/set", async (req, res) => {
  if (!req.body) res.status(400);
  const response = await fs.promises.readFile(path.join(__mainDir, "public", "data", "users.json"), "utf-8");
  if (response) {
    const data = JSON.parse(response);
    let { name, id, email, password, telephone } = req.body;
    password = crypto.createHash("sha256").update(password).digest('hex');
    const user = data.users.find((x: any) => x.id == id);
    if(!user) {
      data.users.push({
        id: id,
        name: name,
        email: email,
        password: password,
        phone: telephone
      });

      await fs.promises.writeFile(path.join(__mainDir, "public", "data", "users.json"), JSON.stringify(data, null, 2), "utf-8");
      res.sendStatus(200)
    }
  }
});

app.use((req, res) => {
  res.status(404).send("Такой страницы не существует.");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});