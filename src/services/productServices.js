/* eslint-disable max-len */
import Sequelize from 'sequelize';
import database from '../database/models';

const { Op } = Sequelize;

class ProductService {
  static async getProducts(shopId, productId) {
    // get only one product of a given shop
    if (productId) {
      const product = await database.Product.findOne({ where: { shop_id: shopId, id: productId } });
      if (!product) return null;
      return [product.dataValues];
    }

    // get all of the products of a given shop
    const products = await database.Product.findAll({ where: { shop_id: shopId } });
    return products.map(({ dataValues: product }) => product);
  }

  static async addNewProduct(product) {
    return database.Product.create(product);
  }

  static async editProductService(product) {
    await database.Product.update(product, {
      where: {
        [Op.and]: [
          { id: product.product_id },
          { shop_id: product.shop_id }],
      },
    });

    return database.Product.findOne({ where: { shop_id: product.shop_id, id: product.product_id } });
  }

  static async deleteProductService(product) {
    // database.Request.destroy({ where: { id } });

    return database.Product.destroy({
      where: {
        [Op.and]: [
          { id: product.product_id },
          { shop_id: product.shop_id }],
      },
    });

    // return database.Product.findOne({ where: { shop_id: product.shop_id, id: product.product_id } });
  }
}

export default ProductService;
