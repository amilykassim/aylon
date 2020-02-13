/* eslint-disable max-len */
import ProductService from '../services/productServices';
import Helper from '../helpers/helper';
import productValidation from '../validations/productValidation';

const { isAuth } = Helper;

const { getProducts, addNewProduct, editProductService } = ProductService;
const { validateProduct } = productValidation;

class ProductController {
  constructor() {
    this.schemaName = 'Product';
    this.schema = `
        type ${this.schemaName} {
        id: ID!
        user_id: Int!
        category: String!
        name: String!
        price: Int!
        quantity: Int!
        createdAt: String!
        updatedAt: String!
      }`;

    this.getProducts = `getProducts(productId: Int): [${this.schemaName}]`;
    this.addProduct = `addProduct(
      category: String!,
      name: String!,
      price: Int!
      quantity: Int!
    ): ${this.schemaName}`;
    this.editProduct = `editProduct(
      product_id: Int!,
      category: String!,
      name: String!,
      price: Int!
      quantity: Int!
    ): ${this.schemaName}`;
  }

  static async getProducts(args, req) {
    const products = await getProducts(req.user.id, args.productId);
    if (!products) throw new Error(`Product with id ${args.productId} is not found in your products list`);

    if (products.length < 1) throw new Error('No products found');

    return products;
  }

  static async addProduct(args, req) {
    isAuth(req.user);

    const { error } = validateProduct(args);
    if (error) throw new Error(error.details[0].message);

    const data = args;
    data.user_id = req.user.id; // add the user_id to the product

    const newProduct = await addNewProduct(data);
    return newProduct;
  }

  static async editProduct(args, req) {
    isAuth(req.user);

    const { error } = validateProduct(args);
    if (error) throw new Error(error.details[0].message);

    const newProduct = await editProductService(args, args.product_id, req.user.id);
    if (!newProduct) throw new Error('You are not the owner of the product');

    return newProduct;
  }
}

export default ProductController;
