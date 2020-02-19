/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import ProductService from '../services/productServices';
import Helper from '../helpers/helper';
import productValidation from '../validations/productValidation';
import ShopService from '../services/shopServices';

const { isAuth } = Helper;

const {
  getProducts, addNewProduct, editProductService, deleteProductService,
  getAllProductsAccordingCategory, getLike, removeLike, getAllLikes, addLike,
} = ProductService;
const { checkIfIsYourShop } = ShopService;
const { validateProduct } = productValidation;
const { trimSpaces } = Helper;
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
        likes: Int,
        category_id: Int!
        createdAt: String!
        updatedAt: String!
      }`;

    this.getProducts = `getProducts(
      shop_id: Int!, 
      product_id: Int
    ): [${this.schemaName}]`;

    this.productFilterInputSchemaName = 'ProductFilterInput';
    this.productFilterInputSchema = `input ${this.productFilterInputSchemaName} {
      categoryId: Int!
      name: String
      description: String
      price: Int
    }`;

    this.searchProducts = `searchProducts(filter: ${this.productFilterInputSchemaName}): [${this.schemaName}]`;

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

    this.likeProduct = `likeProduct(
      product_id: Int!
    ): ${this.schemaName}`;
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

  static async likeProduct(args, req) {
    isAuth(req.user);

    const like = await getLike(req.user.id, args.product_id);
    if (like) {
      const product = await removeLike(req.user.id, args.product_id);
      return ProductController.attachLikes(product);
    }

    // if you didn't like the product, then add your like to the product
    const product = await addLike({ user_id: req.user.id, product_id: args.product_id });
    return ProductController.attachLikes(product);
  }

  static async attachLikes(product) {
    const numberOfLikes = await getAllLikes(product.id);
    product.likes = numberOfLikes;
    return product;
  }

  static async searchProducts(args, req) {
    isAuth(req.user);

    const products = await getAllProductsAccordingCategory(args.filter.categoryId);
    // get all products name that matches the name passed
    const exactMatch = products.filter((product) => trimSpaces(product.name) === trimSpaces(args.filter.name));
    // get all products name that starts with the name passed
    const startWithMatch = products.filter((product) => trimSpaces(product.name).startsWith(trimSpaces(args.filter.name)));
    // get all productss name contains the name passed
    const containsMatch = products.filter((product) => trimSpaces(product.name).includes(trimSpaces(args.filter.name)));
    const foundproducts = [...exactMatch, ...startWithMatch, ...containsMatch];
    // remove duplicates
    const uniqueFoundProducts = Array.from(new Set(foundproducts));

    if (uniqueFoundProducts.length === 0) throw new Error('Sorry, we did not find any results related to your search');
    return uniqueFoundProducts;
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
