/* eslint-disable max-len */
import Sequelize from 'sequelize';
import database from '../database/models';

const { Op } = Sequelize;

class ShopService {
  static async getShopsService(shopId, userId) {
    // get only one shop of a given user
    if (shopId) {
      const shop = await database.Shop.findOne({ where: { id: shopId, user_id: userId } });
      if (!shop) return null;
      return [shop.dataValues];
    }

    // get all of the shops of a given user
    const shops = await database.Shop.findAll({ where: { user_id: userId } });
    return shops.map(({ dataValues: shop }) => shop);
  }

  static async getAllShops() {
    let shops = await database.Shop.findAll();
    shops = shops.map(({ dataValues: shop }) => shop);

    if (!shops) return null;
    return shops;
  }

  static async checkIfIsYourShop(shopId, userId) {
    const shop = await database.Shop.findOne({ where: { id: shopId, user_id: userId } });

    if (!shop) return null;
    return shop;
  }

  static async addNewShopService(shop) {
    return database.Shop.create(shop);
  }

  static async editShopService(shop, userId) {
    await database.Shop.update(shop, {
      where: {
        [Op.and]: [
          { id: shop.shop_id },
          { user_id: userId }],
      },
    });

    return database.Shop.findOne({ where: { id: shop.shop_id, user_id: userId } });
  }

  static async deleteShopService(shopId, userId) {
    return database.Shop.destroy({
      where: {
        [Op.and]: [
          { id: shopId },
          { user_id: userId }],
      },
    });
  }
}

export default ShopService;
