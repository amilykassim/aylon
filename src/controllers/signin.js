
const signup = async (req, res) => {
  //   const user = await save(req);
  const user = {};

  user.message = 'Logged in successful';

  res.header('x-auth-token', 'token').json({ status: 201, message: 'success', data: user });
};

export default signup;
