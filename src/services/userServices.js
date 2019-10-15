/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import voca from 'voca';
import dotenv from 'dotenv';
import database from '../database/models';

dotenv.config();

class UserService {
  static validateSignup(req) {
    const schema = {
      username: Joi.string().required().min(3).max(255),
      password: Joi.string().required().min(6).max(255),
      is_admin: Joi.boolean(),
    };

    req.body.username = voca.trim(req.body.username);
    req.body.password = voca.trim(req.body.password);

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
      username: user.username,
    }, process.env.JWT_PRIVATE_KEY);
  }

  static async hashPassword(user) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(user.password, salt);
  }

  static async save(user) {
    const hashedPassword = await UserService.hashPassword(user);
    user.password = hashedPassword;

    const { dataValues } = await database.User.create(user);
    const { password, is_admin, ...newUser } = dataValues;

    return newUser;
  }

  static async findUserByEmail(username) {
    const user = await database.User.findOne({ where: { username } });
    if (!user) return null;
    return user.dataValues;
  }
}

export default UserService;
