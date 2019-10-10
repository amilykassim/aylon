import UserService from '../services/userServices';

const { generateToken } = UserService;

const signup = async (req, res) => {
  const token = await generateToken(req.user);

  res.status(200).json({ status: res.statusCode, message: 'Logged in successfully', data: token });
};

export default signup;
