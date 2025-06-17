import { Functions } from "./functions.js";
const functions = new Functions();

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import 'dotenv/config'

const client = new MongoClient(process.env.dbURL || "");
mongoose.connect(process.env.dbURL || "").catch((err) => console.error(err));
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

app.use((req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});