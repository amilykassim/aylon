import UserService from '../services/userServices';
import Response from '../helpers/response';

const { customResponse, badRequestError } = Response;

const { getUsers, getMyProfileData, updateProfile } = UserService;

class UserController {
  static async getAllUsers(req, res) {
    // get users if there is any.
    const users = await getUsers(req.params.user_id);
    if (users.length < 1) return badRequestError(res, 'No users found');

    customResponse(res, 200, 'All of the users', users);
  }

  static async getMyProfile(req, res) {
    // get profile data of the logged in user
    const data = await getMyProfileData(req.user.id);

    customResponse(res, 200, 'This is your profile', data);
  }

  static async editProfile(req, res) {
    const data = await updateProfile(req.body, req.user.id);

    customResponse(res, 200, 'This is your profile', data);
  }
}

export default UserController;
