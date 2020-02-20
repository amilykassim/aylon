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

  static async getFollow(userId, shopId) {
    // get your follow on this shop
    const myFollow = await database.Follower.findOne({ where: { user_id: userId, shop_id: shopId } });
    if (!myFollow) return null;
    return myFollow.dataValues;
  }

  static async getAllFollowers(shopId) {
    // get all followers of a given shop
    const followers = await database.Follower.findAll({ where: { shop_id: shopId } });
    if (!followers) return 0;
    return followers.length;
  }

  static async removeFollow(userId, shopId) {
    await database.Follower.destroy({
      where: {
        [Op.and]: [
          { user_id: userId },
          { shop_id: shopId }],
      },
    });

    return database.Shop.findOne({ where: { id: shopId } });
  }

  static async addFollow(follow) {
    await database.Follower.create(follow);

    return database.Shop.findOne({ where: { id: follow.shop_id } });
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
