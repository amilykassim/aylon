/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import database from '../database/models';

dotenv.config();

class UserService {
  static async generateToken(user) {
    return jwt.sign({
      id: user.id,
      username: user.username,
    }, process.env.JWT_PRIVATE_KEY);
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static async save(user) {
    const hashedPassword = await UserService.hashPassword(user.password);
    user.password = hashedPassword;

    const { dataValues } = await database.User.create(user);
    const { password, is_admin, ...newUser } = dataValues;

    return newUser;
  }

  static async findUserByUsername(username) {
    const user = await database.User.findOne({ where: { username } });
    if (!user) return null;
    return user.dataValues;
  }

  static async getUsers(userId) {
    // get only one user if an user id is passed
    if (userId) {
      const user = await database.User.findOne({ where: { id: userId } });
      if (!user) return [];
      return user.dataValues;
    }

    // get all of the users if the user id is not passed
    const users = await database.User.findAll();
    return users.map(({ dataValues: user }) => user);
  }

  static async getMyProfileData(loggedInUserId) {
    // get the logged in user's profile data
    const user = await database.User.findOne({ where: { id: loggedInUserId } });
    return user.dataValues;
  }

  static async updateProfile(user, loggedInUserId) {
    // hash the new password before saving it.
    const hashedPassword = await UserService.hashPassword(user.password);
    user.password = hashedPassword;

    // update the logged in user's profile
    await database.User.update(user, { where: { id: loggedInUserId } });
    return database.User.findOne({ where: { id: loggedInUserId } });
  }
}

export default UserService;
