import express from 'express';
import validateLogin from '../middlewares/validate_login';
import signin from '../controllers/signin';
import authentication from '../middlewares/authentication';

const router = express.Router();

router.post('/', [validateLogin, authentication], signin);

router.use('*', (req, res) => {
  if (req.method !== 'POST') return res.status(400).json({ status: 400, error: `Invalid route, use POST instead of ${req.method}` });
});

export default router;
