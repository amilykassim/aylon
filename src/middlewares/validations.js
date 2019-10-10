import userService from '../services/userServices';

const { validateLoginService, validateSignupService } = userService;

class Validations {
  static async validateSignUp(req, res, next) {
    const { error } = validateSignupService(req);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

    next();
  }

  static async validateLogin(req, res, next) {
    const { error } = validateLoginService(req);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

    next();
  }
}

export default Validations;
