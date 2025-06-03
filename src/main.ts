import { Functions } from "./functions.js";
const functions = new Functions();

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
const __mainDir = path.resolve();
const __publicDir = path.join(__mainDir, "public");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__mainDir, 'public')));
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:fileID", async (req, res) => {
  try {
    const fileID = req.params.fileID;
    const data = await fs.promises.readFile(path.join(__publicDir, "data", `${fileID}.txt`), "utf-8");
    if (data) {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(404).send(`Файла не существует, ваш запрос не доступен.\n${error}`);
  }
});

app.use((req, res) => {
  res.status(404).send("Файла не существует, ваш запрос не доступен.");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});