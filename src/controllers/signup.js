import UserService from '../services/userServices';

const { save, findUserByEmail, generateToken } = UserService;

const signup = async (req, res) => {
  let user = await findUserByEmail(req.body.username);
  if (user) return res.status(400).json({ status: res.statusCode, error: 'That username is taken' });

  user = await save(req.body);

  user.token = await generateToken(user);

  res.status(201).json({ status: res.statusCode, message: 'Signed up successfully', data: user });
};

export default signup;
