import userService from '../services/userServices';

const { validateLogin } = userService;

export default (req, res, next) => {
  const { error } = validateLogin(req);
  if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

  next();
};
