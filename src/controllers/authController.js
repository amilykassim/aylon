import UserService from '../services/userServices';
import userValidation from '../validations/userValidation';
import UserController from './userController';
import Helper from '../helpers/helper';

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const {
  save, findUserByUsername, resetPassword,
  generateToken, comparePassword, findUserByPhoneNumber,
} = UserService;

const { validateSignUp } = userValidation;
const { trimSpaces } = Helper;
const user = new UserController();
const helper = new Helper();

class AuthController {
  constructor() {
    this.loginMutation = `login(username: String!, password: String!): ${user.schemaName}!`;
    this.signupMutation = `signup(
      username: String!,
      password: String!,
      phone_number: String!,
      role_value: Int!,
      country_id: Int!) : ${user.schemaName}`;

    this.resetPassword = `resetPassword(
      phone_number: String!,
      code: String!,
      new_password: String!,
      confirm_password: String!,
    ) : ${user.schemaName}`;

    this.sendResetPasswordCode = `sendResetPasswordCode(
      phone_number: String!
    ) : ${helper.successMessageSchemaName}`;
  }

  static async signup(args) {
    const data = validateSignUp(args);
    if (data.error) throw new Error(data.error.details[0].message);

    // check if phone number is unique
    const phoneNumber = await findUserByPhoneNumber(args.phone_number);
    if (phoneNumber) throw new Error('That phone number is already taken');

    // check if username is unique
    let userFound = await findUserByUsername(data.username);
    if (userFound) throw new Error('That username is already taken');

    userFound = await save(data);
    userFound.token = await generateToken(userFound);

    return userFound;
  }

  static async login(args) {
    const data = args;
    data.username = trimSpaces(args.username);

    // check if username is valid
    const searchUser = await findUserByUsername(data.username);
    if (!searchUser) throw new Error('Invalid user credentials');

    // check if password is valid
    const comparePass = await comparePassword(data.password, searchUser.password);
    if (!comparePass) throw new Error('Invalid user credentials');

    const token = await generateToken(searchUser);
    searchUser.token = token;

    return searchUser;
  }

  static async sendResetPasswordCode(args) {
    const phoneNumber = await findUserByPhoneNumber(args.phone_number);
    if (!phoneNumber) throw new Error('The phone number does not exists in our systems');

    try {
      const data = await client
        .verify
        .services(process.env.SERVICE_ID)
        .verifications
        .create({
          to: `+${args.phone_number}`,
          channel: 'sms',
        });

      if (data.status === 'pending') {
        return { message: 'You\'ll receive the verification code shortly...' };
      }
    } catch (ex) {
      throw new Error('Failed to send the reset password code');
    }
  }

  static async resetPassword(args) {
    const phoneNumber = await findUserByPhoneNumber(args.phone_number);
    if (!phoneNumber) throw new Error('The phone number does not exists in our systems');

    if (args.new_password !== args.confirm_password) throw new Error('Password do not match');

    // verify the code and reset password
    try {
      const data = await client
        .verify
        .services(process.env.SERVICE_ID)
        .verificationChecks
        .create({
          to: `+${args.phone_number}`,
          code: args.code,
        });

      if (data.status === 'approved') {
        // reset password
        return resetPassword(args);
      }
    } catch (ex) {
      throw new Error('Failed to validate phone number');
    }
  }
}

export default AuthController;
