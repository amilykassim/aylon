import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';
import ProductController from '../controllers/productController';
import Helper from '../helpers/helper';
import ShopController from '../controllers/shopController';

const { buildSchema } = require('graphql');

const user = new UserController();
const auth = new AuthController();
const product = new ProductController();
const shop = new ShopController();
const helper = new Helper();

module.exports = buildSchema(`
${user.schema}
${product.schema}
${shop.schema}
${helper.successMessageSchema}
${product.productFilterInputSchema}

type RootQuery {
    ${user.getUsers}
    ${user.getMyProfile}
    ${product.getProducts}
    ${product.searchProducts}
    ${shop.getShops}
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
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
