import userService from '../services/userServices';

const { validateSignup } = userService;

export default async (req, res, next) => {
  const { error } = validateSignup(req);
  if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

  next();
};
