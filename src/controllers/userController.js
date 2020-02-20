import UserService from '../services/userServices';
import Helper from '../helpers/helper';

const helper = new Helper();
const { isAuth } = Helper;
const {
  getUsersService, getMyProfileData, updateProfile, changePassword, updateRole,
  updatePersonalSettings,
} = UserService;


class UserController {
  constructor() {
    this.schemaName = 'User';
    this.schema = `
        type ${this.schemaName} {
        id: ID!
        username: String!,
        phone_number: String!,
        role_value: Int!,
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

    this.settingSchemaName = 'PersonalSetting';
    this.settingSchema = `
        type ${this.settingSchemaName} {
        id: ID!
        email_notification: Boolean,
        push_notification: Boolean,
        auto_fill: Boolean,
        createdAt: String!
        updatedAt: String!
      }`;

    this.getUsers = `getUsers(userId: Int): [${this.schemaName}]`;
    this.getMyProfile = `getMyProfile: ${this.schemaName}`;

    this.editProfile = `editProfile(
        username: String,
        phone_number: String,
        country_id: Int
        email: String,
        display_name: String,
        profile_image: String,
        gender: String,
        active: Boolean,
    ): ${this.schemaName}`;

    this.editPersonalSettings = `editPersonalSettings(
        email_notification: Boolean,
        push_notification: Boolean,
        auto_fill: Boolean,
    ): ${this.settingSchemaName}`;

    this.changePassword = `changePassword(
      currentPassword: String!,
      newPassword: String!
    ): ${helper.successMessageSchemaName}`;

    this.assignRole = `assignRole(
      user_id: Int!,
      role_value: Int!
    ): ${this.schemaName}`;
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

  static async editPersonalSettings(args, req) {
    isAuth(req.user);

    return updatePersonalSettings(args, req.user.id);
  }

  static async changePassword(args, req) {
    isAuth(req.user);
    await changePassword(args, req.user);

    return { message: 'Password was changed successfully!' };
  }

  static async assignRole(args, req) {
    isAuth(req.user);
    if (req.user.role_value !== 7) throw new Error('You are not a super admin!');

    if (![1, 7].includes(args.role_value)) throw new Error(`The role value ${args.role_value} does not exists`);

    const user = await updateRole(args, args.user_id);

    if (!user) throw new Error('Failed to update user role');
    return user.dataValues;
  }
}

export default UserController;
