import UserService from '../services/userServices';

const {
  save, findUserByUsername,
  generateToken, comparePassword,
} = UserService;

class AuthController {
  static async signUp(req, res) {
    let user = await findUserByUsername(req.body.username);
    if (user) return res.status(400).json({ status: res.statusCode, error: 'That username is taken' });

    user = await save(req.body);

    user.token = await generateToken(user);

    res.status(201).json({ status: res.statusCode, message: 'Signed up successfully', data: user });
  }

  static async signIn(req, res) {
    // check if username is valid
    const searchUser = await findUserByUsername(req.body.username);
    if (!searchUser) return res.status(401).json({ status: 401, error: 'Invalid user credentials' });

    // check if password is valid
    const comparePass = await comparePassword(req.body.password, searchUser.password);
    if (!comparePass) return res.status(404).json({ status: 404, error: 'Invalid user credentials' });

    const token = await generateToken(req.user);

    res.status(200).json({ status: res.statusCode, message: 'Logged in successfully', data: token });
  }
}

export default AuthController;
