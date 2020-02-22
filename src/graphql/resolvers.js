import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';
import ProductController from '../controllers/productController';
import ShopController from '../controllers/shopController';
import ReportController from '../controllers/reportController';
import FeedController from '../controllers/feedController';

const {
  signup, login, sendResetPasswordCode, resetPassword,
} = AuthController;
const {
  getUsers, getMyProfile, editProfile, changePassword, assignRole,
  editPersonalSettings,
} = UserController;

const {
  getProducts, addProduct, editProduct, deleteProduct, searchProducts,
  likeProduct,
} = ProductController;

const {
  getShops, addShop, editShop, deleteShop, followShop, searchShops,
} = ShopController;

const { addReport } = ReportController;
const { addFeed } = FeedController;

const rootResolver = {
  signup,
  login,
  getUsers,
  getMyProfile,
  editProfile,
  changePassword,
  assignRole,
  getProducts,
  searchProducts,
  addProduct,
  editProduct,
  deleteProduct,
  likeProduct,
  getShops,
  addShop,
  editShop,
  deleteShop,
  followShop,
  searchShops,
  editPersonalSettings,
  addReport,
  sendResetPasswordCode,
  resetPassword,
  addFeed,
};

export default rootResolver;
