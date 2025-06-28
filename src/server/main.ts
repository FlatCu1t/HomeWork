import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRoutes from '../routes/userRoutes.js';
import 'dotenv/config'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(express.static('public'));

app.use('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), "public", "views", "main.html"))
});

mongoose.connect(process.env.dbURL as any)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));