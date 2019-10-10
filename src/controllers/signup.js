import UserService from '../services/userServices';

const { save } = UserService;

const signup = async (req, res) => {
  const user = await save(req.body);

  user.message = 'Signed up successfully';

  res.header('x-auth-token', 'token').json({ status: 201, message: 'success', data: user });
};

export default signup;
