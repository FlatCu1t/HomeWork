import { Functions } from "./functions.js";
const functions = new Functions();

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import crypto from "crypto";
import Schemas from "./schemas.js";
const { User, Message, Counter } = Schemas;
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
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on('connection', async (socket) => {
    console.log('connect');
    socket.on("join room", async (roomName) => {
        socket.join(roomName)
        console.log(`${socket.id} in room ${roomName}`);
        const messages = await Message.find({ roomID: roomName });
        io.to(roomName).emit('room messages', messages);
    })

    socket.on('chat message', async ({ room, message }) => {
      const counter: any = await Counter.find({});
      await Message.insertOne({ id: counter[0].id, roomID: room, messageTime: functions.unixStamp(functions.getUnix()).text, messageText: message.text, fromAvatar: message.user.avatar, fromName: message.user.userName })
      await Counter.updateOne({ id: counter[0].id }, { $set: { id: counter[0].id + 1 } });
      io.to(room).emit('chat message', message)
    })

    socket.on('disconnect',()=>{
        console.log('dissconect');
    })
})

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/allUsers", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.post("/user", async (req, res) => {
  if (!req.body) {
    res.status(500).send("Req Body is undefined.");
    return;
  }

  try {
    const { userID } = req.body;
    const user = await User.findOne({ userLogin: userID });
    if (user) {
      res.json(user);
    } else {
      res.status(500).send("User not found!");
    }
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
    return;
  }
});

app.post("/register", async (req, res) => {
  if (!req.body) {
    res.status(500).send("Req Body is undefined.");
    return;
  }

  try {
    const { userID, userLogin, userName, avatar, password } = req.body;
    if (!await User.findOne({ userLogin: userLogin })) {
      await User.insertOne({ id: parseInt(userID), userLogin: userLogin, userName: userName, avatar: avatar, password: crypto.createHash("sha256").update(password).digest("hex") });
      res.sendStatus(200);
    } else {
      res.status(500).send("User already exists!");
    }
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
    return;
  }
});

app.post("/login", async (req, res) => {
  if (!req.body) {
    res.status(500).send("Req Body is undefined.");
    return;
  }

  try {
    const { userLogin, password } = req.body;
    const user = await User.findOne({ userLogin: userLogin });
    if (!user) {
      res.status(500).send("User not found!");
      return;
    }

    if (crypto.createHash("sha256").update(password).digest("hex") !== user.password) {
      res.status(500).send("Incorrect password.");
      return;
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
    return;
  }
});

app.use((req, res) => {
  res.render("404");
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});