import { Functions } from "./functions.js";
const functions = new Functions();

import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath, URL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __currentDir = dirname(__filename);
const __mainDir = path.resolve();

fs.writeFile(path.join(__mainDir, "data", "date.txt"), `${functions.unixStamp(functions.getUnix()).text} | Влад Исаев, 3 марта 2004 г. (21)`, (err) => {
  if (err) throw err;
  console.log("Имя, фамилия и дата рождения записаны.");
});

fs.readFile(path.join(__mainDir, "data", "data.json"), "utf-8", (err, data) => {
  if (err) throw err;
  const jsonDATA = JSON.parse(data, null, 2);
  if (jsonDATA) {
    console.log(`Count: ${jsonDATA.count}`);
    jsonDATA.count++;
    fs.writeFile(path.join(__mainDir, "data", "data.json"), JSON.stringify(jsonDATA, null, 2), err => {
      if (err) throw err;
      console.log(`JSON перезаписан. Текущий count: ${jsonDATA.count}`);
    });
  }
});