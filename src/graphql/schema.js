import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';
import ProductController from '../controllers/productController';
import Helper from '../helpers/helper';

const { buildSchema } = require('graphql');

const user = new UserController();
const auth = new AuthController();
const product = new ProductController();
const helper = new Helper();

module.exports = buildSchema(`
${user.schema}
${product.schema}
${helper.successMessageSchema}

type RootQuery {
    ${user.getUsers}
    ${user.getMyProfile}
    ${product.getProducts}
}

type RootMutation {
    ${auth.signupMutation}
    ${auth.loginMutation}
    ${user.editProfile}
    ${user.changePassword}
    ${product.addProduct}
    ${product.editProduct}
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
