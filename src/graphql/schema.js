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

const some = 'input ProductFilterInput { name: String! description: String! }';

module.exports = buildSchema(`
${user.schema}
${product.schema}
${shop.schema}
${helper.successMessageSchema}
${product.productFilterInputSchema}
${product.tableStringFilterInputSchema}

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
    ${shop.addShop}
    ${shop.editShop}
    ${shop.deleteShop}
    ${product.searchProducts}
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
