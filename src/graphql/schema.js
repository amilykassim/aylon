import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';
import ProductController from '../controllers/productController';
import Helper from '../helpers/helper';
import ShopController from '../controllers/shopController';
import ReportController from '../controllers/reportController';
import FeedController from '../controllers/feedController';
import CategoryController from '../controllers/categoryController';

const { buildSchema } = require('graphql');

const user = new UserController();
const auth = new AuthController();
const product = new ProductController();
const shop = new ShopController();
const report = new ReportController();
const feed = new FeedController();
const category = new CategoryController();
const helper = new Helper();

module.exports = buildSchema(`
${user.schema}
${product.schema}
${category.schema}
${shop.schema}
${helper.successMessageSchema}
${product.productFilterInputSchema}
${shop.shopFilterInputSchema}
${user.settingSchema}

type RootQuery {
    ${user.getUsers}
    ${user.getMyProfile}
    ${product.getProducts}
    ${product.searchProducts}
    ${shop.getShops}
    ${shop.searchShops}
}

type RootMutation {
    ${auth.signupMutation}
    ${auth.loginMutation}
    ${user.editProfile}
    ${user.changePassword}
    ${user.assignRole}
    ${product.addProduct}
    ${product.editProduct}
    ${product.deleteProduct}
    ${product.likeProduct}
    ${shop.addShop}
    ${shop.editShop}
    ${shop.deleteShop}
    ${shop.followShop}
    ${user.editPersonalSettings}
    ${report.addReport}
    ${auth.resetPassword}
    ${auth.sendResetPasswordCode}
    ${feed.addFeed}
    ${category.addCategory}
    ${category.getCategory}
    ${category.editCategory}
    ${category.deleteCategory}
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
