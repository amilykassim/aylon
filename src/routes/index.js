import express from 'express';
import authRoutes from './authRoutes';
// import property from '../routes/property';
// import error from '../middleware/user/error';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/api/v1/auth', authRoutes);
router.use('*', (req, res) => { res.status(400).json({ error: 'the route is invalid' }); });
//   app.use(error);

export default router;
