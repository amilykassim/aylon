import express from 'express';
import AuthController from '../controllers/authController';
import validations from '../middlewares/validations';
// import error from '../middleware/user/error';

const { signUp, signIn } = AuthController;
const { validateSignUp, validateLogin } = validations;

const router = express.Router();

router.post('/signup', [validateSignUp], signUp);
router.post('/login', [validateLogin], signIn);

export default router;
