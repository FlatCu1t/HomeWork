import { Functions } from "./functions.js";
const functions = new Functions();
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import 'dotenv/config';
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
    const { workName, workDate, workImage } = req.body;
    try {
        const response = await fetch("http://localhost:3000/getWorks");
        if (response.ok && response.status == 200) {
            let data = await response.json();
            if (data) {
                data = JSON.parse(data);
                data.works.push({
                    workID: data.works.length + 1,
                    workName: workName,
                    workDate: workDate,
                    workImage: workImage
                });
                await fs.promises.writeFile(path.join(__publicDir, "data", "works.json"), JSON.stringify(data, null, 2), "utf-8");
                res.sendStatus(200);
            }
        }
    }
    catch (error) {
        res.sendStatus(500);
    }
});
app.get("/works/:workID", async (req, res) => {
    const workID = req.params.workID;
    const response = await fetch("http://localhost:3000/getWorks");
    if (response.ok && response.status == 200) {
        let data = await response.json();
        data = JSON.parse(data);
        const finded = data.works.find((x) => x.workID == workID);
        if (!finded) {
            return res.render("404");
        }
        res.render("works", { work: finded });
    }
});
app.get("/contacts", (req, res) => {
    res.render("contacts", { user: null });
});
app.get("/getWorks", async (req, res) => {
    const data = await fs.promises.readFile(path.join(__publicDir, "data", "works.json"), "utf-8");
    if (data) {
        res.json(data);
    }
});
app.use((req, res) => {
    res.render("404");
});
app.listen(3000, () => {
    console.log("http://localhost:3000");
});
