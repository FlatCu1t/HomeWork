import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(path.resolve(), "dist", "public", "auth.html"))
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;