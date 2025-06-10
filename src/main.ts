import { Functions } from "./functions.js";
const functions = new Functions();

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import WorkSchema from "./schemas.js";
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

app.get("/works", (req, res) => {
  res.render("works", { work: null });
});

app.get("/works/addWork", (req, res) => {
  res.render("addWork");
});

app.post("/works/addWork", async (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
    return;
  }

  try {
    const { workID, workName, workDate, workImage } = req.body;
    await WorkSchema.insertOne({ workID: parseInt(workID), workName: workName, workDate: workDate, workImage: workImage })
    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(`404 Error. ${error}`);
  }
});

app.get("/works/:workID", async (req, res) => {
  try {
    const workID = req.params.workID;
    const data: any = await WorkSchema.findOne({ workID: workID });
    if (data?.workID) {
      res.render("works", { work: data });
    } else {
      res.render("404");
    }
  } catch (error) {
    res.status(404).send(`404 Error. ${error}`);
  }
});

app.get("/contacts", (req, res) => {
  res.render("contacts", { user: null });
});

app.get("/getWorks", async (req, res) => {
  try {
    const data = await WorkSchema.find();
    res.json(data);
  } catch (error) {
    res.status(404).send(`404 Error. ${error}`);
  }
});

app.use((req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});