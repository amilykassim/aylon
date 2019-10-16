import express from 'express';
import authentication from '../middlewares/authentication';
import ProductController from '../controllers/productController';
import validations from '../middlewares/validations';

const { getAllProducts, addProduct, editProduct } = ProductController;
const { validateProduct } = validations;

const router = express.Router();

router.get('/', [authentication], getAllProducts); // get all of the products
router.get('/:product_id', [authentication], getAllProducts); // get only one product
router.post('/', [authentication, validateProduct], addProduct); // add a product
router.patch('/:product_id', [authentication, validateProduct], editProduct); // edit a product

export default router;
