import UserService from '../services/userServices';
import userValidation from '../validations/userValidation';
import UserController from './userController';
import Helper from '../helpers/helper';


const {
  save, findUserByUsername,
  generateToken, comparePassword,
} = UserService;

const { validateSignUp } = userValidation;
const { trimSpaces } = Helper;
const user = new UserController();


class AuthController {
  constructor() {
    this.loginMutation = `login(username: String!, password: String!): ${user.schemaName}!`;
    this.signupMutation = `signup(username: String!, password: String!): ${user.schemaName}`;
  }

  static async signup(args) {
    const data = validateSignUp(args);
    if (data.error) throw new Error(data.error.details[0].message);

    let userFound = await findUserByUsername(data.username);
    if (userFound) throw new Error('the username is taken');

    data.is_admin = false;
    userFound = await save(data);
    userFound.token = await generateToken(userFound);

    return userFound;
  }

  static async login(args) {
    const data = args;
    data.username = trimSpaces(args.username);

    // check if username is valid
    const searchUser = await findUserByUsername(data.username);
    if (!searchUser) throw new Error('Invalid user credentials');

    // check if password is valid
    const comparePass = await comparePassword(data.password, searchUser.password);
    if (!comparePass) throw new Error('Invalid user credentials');

    const token = await generateToken(searchUser);
    searchUser.token = token;

    return searchUser;
  }
}

export default AuthController;
