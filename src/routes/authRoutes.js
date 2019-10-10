import express from 'express';
import AuthController from '../controllers/authController';
import authentication from '../middlewares/authentication';
import validations from '../middlewares/validations';
// import property from '../routes/property';
// import error from '../middleware/user/error';

const { signUp, signIn } = AuthController;
const { validateSignUp, validateLogin } = validations;

const router = express.Router();

router.post('/signup', [validateSignUp], signUp);
router.post('/login', [validateLogin, authentication], signIn);

export default router;
