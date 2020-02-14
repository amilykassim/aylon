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
        shop_id: Int!,
        name: String!,
        description: String!,
        image1: String!,
        image2: String!,
        image3: String!,
        price: Int!,
        category_id: Int!
        createdAt: String!
        updatedAt: String!
      }`;

    this.getProducts = `getProducts(shop_id: Int!, product_id: Int): [${this.schemaName}]`;
    this.addProduct = `addProduct(
      shop_id: Int!,
      name: String!,
      description: String!,
      image1: String!,
      image2: String!,
      image3: String!,
      price: Int!,
      category_id: Int!
    ): ${this.schemaName}`;
    this.editProduct = `editProduct(
      product_id: Int!,
      shop_id: Int!,
      name: String!,
      description: String!,
      image1: String!,
      image2: String!,
      image3: String!,
      price: Int!,
      category_id: Int!
    ): ${this.schemaName}`;
  }

  static async getProducts(args, req) {
    const products = await getProducts(args.shop_id, args.product_id);
    if (!products) throw new Error(`Product with id ${args.product_id} is not found in this shop`);

    if (products.length < 1) return [];
    return products;
  }

  static async addProduct(args, req) {
    isAuth(req.user);

    const { error } = validateProduct(args);
    if (error) throw new Error(error.details[0].message);

    const newProduct = await addNewProduct(args);
    return newProduct;
  }

  static async editProduct(args, req) {
    isAuth(req.user);

    const { error } = validateProduct(args);
    if (error) throw new Error(error.details[0].message);

    const newProduct = await editProductService(args);
    if (!newProduct) throw new Error('You are not the owner of the product');

    return newProduct;
  }
}

export default ProductController;
