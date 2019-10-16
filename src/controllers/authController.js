import UserService from '../services/userServices';
import Response from '../helpers/response';

const {
  save, findUserByUsername,
  generateToken, comparePassword,
} = UserService;

const { authenticationError, customResponse } = Response;

class AuthController {
  static async signUp(req, res) {
    let user = await findUserByUsername(req.body.username);
    if (user) return authenticationError(res, 'That username is taken');

    user = await save(req.body);

    user.token = await generateToken(user);

    customResponse(res, 200, 'Signed up successfully', user);
  }

  static async signIn(req, res) {
    // check if username is valid
    const searchUser = await findUserByUsername(req.body.username);
    if (!searchUser) return res.status(401).json({ status: 401, error: 'Invalid user credentials' });

    // check if password is valid
    const comparePass = await comparePassword(req.body.password, searchUser.password);
    if (!comparePass) return res.status(404).json({ status: 404, error: 'Invalid user credentials' });

    const token = await generateToken(searchUser);

    customResponse(res, 200, 'Logged in successfully', { token });
  }
}

export default AuthController;
