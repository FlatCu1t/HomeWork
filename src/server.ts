import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/users.js';
import regRoutes from './routes/registration.js';
import authRoutes from "./routes/auth.js";
import todosRoutes from "./routes/todos.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);
app.use('/registration', regRoutes);
app.use('/auth', authRoutes);
app.use('/todos', todosRoutes);

app.get('/', async (req, res) => {
  try {
    res.sendFile(join(__dirname, 'public', 'index.html'));
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

mongoose.connect(process.env.dbURL!).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));

app.use((req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});