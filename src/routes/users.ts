import { Router } from 'express';
import User from '../models/User.js';
import Todo from "../models/Todo.js";
import crypto from "crypto";

const router = Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(500).json({ error: "No body data detected." });
      return;
    }

    const { login } = req.body;

    const already = await User.find({ login: login });

    if (already.length > 0) {
      res.status(500).json({ error: "User already registered." });
      return;
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/auth', async (req, res) => {
  try {
    if (!req.body) {
      res.status(500).json({ error: "No body data detected." });
      return;
    }

    const { login, password } = req.body;

    const user: any = await User.findOne({ login: login });

    if (user.length < 1) {
      res.status(500).json({ error: "User not found." });
      return;
    }

    if (user.password == password) {
      res.sendStatus(200);
    } else {
      res.status(500).json({ error: "Password not valid." });
      return;
    }
    
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q ? { login: { $regex: q, $options: 'i' } } : {};
    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/getTodos/:login', async (req, res) => {
  try {
    if (!req.params.login) {
      res.status(500).json({ error: "Login param not detected." });
      return;
    }

    const todos = await Todo.find({ todoOwner: req.params.login });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/Todos/setDone/:todoID', async (req, res) => {
  try {
    if (!req.params.todoID) {
      res.status(500).json({ error: "todoID param not detected." });
      return;
    }

    const todo = await Todo.findOne({ todoID: req.params.todoID });
    if (!todo) {
      res.status(500).json({ error: "Todo not found!" });
      return;
    }

    await Todo.updateOne({ todoID: req.params.todoID }, { $set: { todoIsDone: true } }, { upsert: false });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post('/Todos/create', async (req: any, res: any) => {
  const { title, isDone, owner } = req.body;
  if (!title || !owner) {
    return res.status(400).json({ error: "Title and owner required" });
  }

  const newTodo = new Todo({
    todoID: crypto.randomUUID(),
    todoTitle: title,
    todoIsDone: !!isDone,
    todoOwner: owner
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/Todos/update/:todoID', async (req, res) => {
  const { title, isDone } = req.body;
  await Todo.updateOne(
    { todoID: req.params.todoID },
    { $set: { todoTitle: title, todoIsDone: isDone === true } }
  );
  res.sendStatus(200);
});

router.delete('/Todos/delete/:todoID', async (req, res) => {
  await Todo.deleteOne({ todoID: req.params.todoID });
  res.sendStatus(200);
});

router.get('/:login', async (req: any, res: any) => {
    try {
      const user = await User.findOne({ login: req.params.login });
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;