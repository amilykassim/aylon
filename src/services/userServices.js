import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import database from '../database/models';

class UserService {
  static validateSignup(req) {
    const schema = {
      username: Joi.string().required().min(3).max(255),
      password: Joi.string().required().min(6).max(255),
      is_admin: Joi.boolean(),
    };
    return Joi.validate(req.body, schema);
  }

  static validateLogin(req) {
    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
    };
    return Joi.validate(req.body, schema);
  }

  static async generateToken(user) {
    return jwt.sign({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_admin: user.is_admin,
    }, process.env.JWT_PRIVATE_KEY);
  }

  static async hashPassword(user) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(user.password, salt);
  }

  static async save(user) {
    return database.User.create(user);
  }
}

export default UserService;
