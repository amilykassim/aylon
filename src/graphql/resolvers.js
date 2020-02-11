import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import ProductController from '../controllers/productController';

const { signup, login } = AuthController;
const {
  getUsers, getMyProfile, editProfile, changePassword,
} = UserController;

const { getProducts, addProduct, editProduct } = ProductController;

const rootResolver = {
  signup,
  login,
  getUsers,
  getMyProfile,
  editProfile,
  changePassword,
  getProducts,
  addProduct,
  editProduct,
};

export default rootResolver;
