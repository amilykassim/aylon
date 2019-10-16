import Joi from '@hapi/joi';
import voca from 'voca';

class UserValidation {
  static validateSignupService(req) {
    const schema = {
      username: Joi.string().required().min(3).max(255),
      password: Joi.string().required().min(6).max(255),
      is_admin: Joi.boolean(),
    };

    req.body.username = voca.camelCase(req.body.username).trim().toLowerCase();
    req.body.password = voca.trim(req.body.password);

    return Joi.validate(req.body, schema);
  }

  static validateLoginService(req) {
    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
    };

    req.body.username = voca.camelCase(req.body.username).trim().toLowerCase();

    return Joi.validate(req.body, schema);
  }
}

export default UserValidation;
