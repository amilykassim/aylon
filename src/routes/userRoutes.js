import express from 'express';
import authentication from '../middlewares/authentication';
import UserController from '../controllers/userController';
import validations from '../middlewares/validations';

const { validateSignUp } = validations;
const { getAllUsers, getMyProfile, editProfile } = UserController;

const router = express.Router();

router.get('/', [authentication], getAllUsers); // get all of the users
router.get('/me', [authentication], getMyProfile); // get my profile
router.get('/:user_id', [authentication], getAllUsers); // get only one user
router.patch('/me', [authentication, validateSignUp], editProfile); // edit profile

export default router;
