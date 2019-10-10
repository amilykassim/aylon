import express from 'express';
import validateSignup from '../middlewares/validate_signup';
import signup from '../controllers/signup';

const router = express.Router();

router.post('/', [validateSignup], signup);

router.use('*', (req, res) => {
  if (req.method !== 'POST') return res.status(400).json({ status: 400, error: `Invalid route, use POST instead of ${req.method}` });
});

export default router;
