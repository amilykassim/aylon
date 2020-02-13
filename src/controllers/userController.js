import UserService from '../services/userServices';
import Helper from '../helpers/helper';

const helper = new Helper();
const { isAuth } = Helper;
const {
  getUsersService, getMyProfileData, updateProfile, changePassword,
} = UserService;


class UserController {
  constructor() {
    this.schemaName = 'User';
    this.schema = `
        type ${this.schemaName} {
        id: ID!
        username: String!,
        phone_number: String!,
        role_id: Int!,
        country_id: Int!
        email: String,
        display_name: String,
        profile_image: String,
        gender: String,
        active: Boolean!,
        token: String!
        createdAt: String!
        updatedAt: String!
      }`;

    this.getUsers = `getUsers(userId: Int): [${this.schemaName}]`;
    this.getMyProfile = `getMyProfile: ${this.schemaName}`;
    this.editProfile = `editProfile(username: String, is_admin: Boolean): ${this.schemaName}`;
    this.changePassword = `changePassword(currentPassword: String!, newPassword: String!): ${helper.successMessageSchemaName}`;
  }

  // if there is user id, get only one user otherwise get all users
  static async getUsers(args, req) {
    isAuth(req.user);
    const users = await getUsersService(args.userId);
    if (users.length < 1) return [];
    return (users instanceof Array) ? users : [users];
  }

  static async getMyProfile(args, req) {
    isAuth(req.user);
    return getMyProfileData(req.user.id);
  }

  static async editProfile(args, req) {
    isAuth(req.user);
    const user = await updateProfile(args, req.user.id);
    if (user.length > 0) throw new Error('Username already exits');

    return user;
  }

  static async changePassword(args, req) {
    isAuth(req.user);
    await changePassword(args, req.user);

    return { message: 'Password was changed successfully!' };
  }
}

export default UserController;
