import Sequelize from 'sequelize';
import database from '../database/models';

const { Op } = Sequelize;

class ProductService {
  static async getProducts(userId, productId) {
    // get only one product of a given user
    if (productId) {
      const product = await database.Product.findOne({ where: { user_id: userId, id: productId } });
      if (!product) return null;
      return product.dataValues;
    }

    // get all of the products of a given user
    const products = await database.Product.findAll({ where: { user_id: userId } });
    return products.map(({ dataValues: product }) => product);
  }

  static async addNewProduct(product) {
    return database.Product.create(product);
  }

  static async editProductService(product, productId, userId) {
    await database.Product.update(product, {
      where: {
        [Op.and]: [
          { id: productId },
          { user_id: userId }],
      },
    });

    return database.Product.findOne({ where: { user_id: userId, id: productId } });
  }
}

export default ProductService;
