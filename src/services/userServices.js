/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import database from '../database/models';
import Helper from '../helpers/helper';

dotenv.config();

const { trimSpaces } = Helper;

class UserService {
  static async generateToken(user) {
    return jwt.sign({
      id: user.id,
      username: user.username,
      role_value: user.role_value,
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

  static async findUserById(id) {
    const user = await database.User.findOne({ where: { id } });
    if (!user) return null;
    return user.dataValues;
  }

  static async getUsersService(userId) {
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
    if (user.username) {
      user.username = trimSpaces(user.username);
      const userFound = await database.User.findAll({ where: { username: user.username } });
      if (userFound.length > 0) return userFound;
    }

    // update the logged in user's profile
    await database.User.update(user, { where: { id: loggedInUserId } });
    return database.User.findOne({ where: { id: loggedInUserId } });
  }

  static async updateRole(data, userId) {
    await database.User.update(data, { where: { id: userId } });
    return database.User.findOne({ where: { id: userId } });
  }

  static async changePassword(data, user) {
    const searchUser = await UserService.findUserByUsername(user.username);

    // check if password is valid
    const comparePass = await UserService.comparePassword(data.currentPassword, searchUser.password);
    if (!comparePass) throw new Error('Your current password is invalid, please retype it again carefully');

    // hash the new password before saving it.
    if (data.newPassword) {
      const hashedPassword = await UserService.hashPassword(data.newPassword);
      searchUser.password = hashedPassword;
    }

    // update the logged in user's password
    await database.User.update(searchUser, { where: { id: user.id } });
    return database.User.findOne({ where: { id: user.id } });
  }
}

export default UserService;
