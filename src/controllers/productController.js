/* eslint-disable max-len */
import ProductService from '../services/productServices';
import Response from '../helpers/response';

const { customResponse, badRequestError } = Response;

const { getProducts, addNewProduct, editProductService } = ProductService;

class ProductController {
  static async getAllProducts(req, res) {
    const products = await getProducts(req.user.id, req.params.product_id);
    if (!products) return badRequestError(res, `Product with id ${req.params.product_id} is not found in your products list`);

    if (products.length < 1) return badRequestError(res, 'No products found');

    customResponse(res, 200, 'All of your products', products);
  }

  static async addProduct(req, res) {
    req.body.user_id = req.user.id; // add the userId to the product
    const newProduct = await addNewProduct(req.body);

    customResponse(res, 200, 'Product added successfully', newProduct);
  }

  static async editProduct(req, res) {
    const newProduct = await editProductService(req.body, req.params.product_id, req.user.id);

    customResponse(res, 200, 'Edited product successfully', newProduct);
  }
}

export default ProductController;
