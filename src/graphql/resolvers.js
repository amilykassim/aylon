import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import ProductController from '../controllers/productController';
import ShopController from '../controllers/shopController';

const { signup, login } = AuthController;
const {
  getUsers, getMyProfile, editProfile, changePassword, assignRole,
} = UserController;

const {
  getProducts, addProduct, editProduct, deleteProduct,
} = ProductController;

const {
  getShops, addShop, editShop, deleteShop,
} = ShopController;

const rootResolver = {
  signup,
  login,
  getUsers,
  getMyProfile,
  editProfile,
  changePassword,
  assignRole,
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getShops,
  addShop,
  editShop,
  deleteShop,
};

export default rootResolver;
