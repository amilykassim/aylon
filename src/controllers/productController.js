/* eslint-disable max-len */
import ProductService from '../services/productServices';
import Helper from '../helpers/helper';
import productValidation from '../validations/productValidation';
import ShopService from '../services/shopServices';

const { isAuth } = Helper;

const {
  getProducts, addNewProduct, editProductService, deleteProductService,
} = ProductService;
const { checkIfIsYourShop } = ShopService;
const { validateProduct } = productValidation;
const helper = new Helper();

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

    this.getProducts = `getProducts(
      shop_id: Int!, 
      product_id: Int
    ): [${this.schemaName}]`;


    this.tableStringFilterInputSchemaName = 'TableStringFilterInput';
    this.tableStringFilterInputSchema = `input ${this.tableStringFilterInputSchemaName} {
      ne: String
      eq: String
      le: String
      lt: String
      ge: String
      gt: String
      contains: String
      notContains: String
      starWith: String
    }`;

    this.productFilterInputSchemaName = 'ProductFilterInput';
    this.productFilterInputSchema = `input ${this.productFilterInputSchemaName} {
      name: ${this.tableStringFilterInputSchemaName}
      description: String
    }`;

    this.searchProducts = `searchProducts(filter: ${this.productFilterInputSchemaName}): ${this.schemaName}`;

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
      name: String,
      description: String,
      image1: String,
      image2: String,
      image3: String,
      price: Int,
      category_id: Int
    ): ${this.schemaName}`;

    this.deleteProduct = `deleteProduct(
      shop_id: Int!,
      product_id: Int
    ): ${helper.successMessageSchemaName}`;
  }

  static async getProducts(args, req) {
    isAuth(req.user);

    // check if it is your shop
    const isYourShop = await checkIfIsYourShop(args.shop_id, req.user.id);
    if (!isYourShop) throw new Error(`You are not the owner of the shop with id ${args.shop_id}`);


    const products = await getProducts(args.shop_id, args.product_id);
    if (!products) throw new Error(`You do not have a product with id ${args.product_id} under your shop of id ${args.shop_id}`);

    if (products.length < 1) return [];
    return products;
  }

  static async searchProducts(args, req) {
    isAuth(req.user);

    // check if it is your shop
    console.log('the result is: ', args.filter.name.contains);
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

    // check if it is your shop
    const isYourShop = await checkIfIsYourShop(args.shop_id, req.user.id);
    if (!isYourShop) throw new Error(`You are not the owner of the shop with id ${args.shop_id}`);

    const newProduct = await editProductService(args);
    if (!newProduct) throw new Error(`You do not have a product with id ${args.product_id} under your shop of id ${args.shop_id}`);

    return newProduct;
  }

  static async deleteProduct(args, req) {
    isAuth(req.user);

    // check if it is your shop
    const isYourShop = await checkIfIsYourShop(args.shop_id, req.user.id);
    if (!isYourShop) throw new Error(`You are not the owner of the shop with id ${args.shop_id}`);

    const deletedProduct = await deleteProductService(args);
    if (!deletedProduct) return { message: `You do not have a product with id ${args.product_id} under your shop of id ${args.shop_id}` };

    return { message: 'Delete the product successfully' };
  }
}

export default ProductController;
