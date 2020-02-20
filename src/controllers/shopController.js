/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import Helper from '../helpers/helper';
import shopValidation from '../validations/shopValidation';
import ShopService from '../services/shopServices';

const { isAuth, trimSpaces } = Helper;

const {
  getShopsService, addNewShopService, editShopService, deleteShopService,
  getAllShops, addFollow, removeFollow, getAllFollowers, getFollow, verifyShopService,
} = ShopService;
const { validateShop } = shopValidation;
const helper = new Helper();

class ShopController {
  constructor() {
    this.schemaName = 'Shop';
    this.schema = `
        type ${this.schemaName} {
        id: ID!,
        user_id: Int!,
        name: String!,
        description: String!,
        image: String!,
        country_id: Int!,
        active: Boolean!
        is_verified: Boolean!
        followers: Int
        createdAt: String!
        updatedAt: String!
      }`;

    this.getShops = `getShops(
       shop_id: Int
    ): [${this.schemaName}]`;

    this.addShop = `addShop(
        name: String!,
        description: String!,
        image: String!,
        country_id: Int!,
    ): ${this.schemaName}`;

    this.editShop = `editShop(
        shop_id: Int!,
        name: String,
        description: String,
        image: String,
        country_id: Int,
        active: Boolean,
        is_verified: Boolean,
    ): ${this.schemaName}`;

    this.deleteShop = `deleteShop(
      shop_id: Int!,
    ): ${helper.successMessageSchemaName}`;

    this.followShop = `followShop(
      shop_id: Int!
    ): ${this.schemaName}`;

    this.shopFilterInputSchemaName = 'ShopFilterInput';
    this.shopFilterInputSchema = `input ${this.shopFilterInputSchemaName} {
      name: String
    }`;

    this.searchShops = `searchShops(filter: ${this.shopFilterInputSchemaName}): [${this.schemaName}]`;
  }

  static async getShops(args, req) {
    isAuth(req.user);

    // get a shop with this id
    let shops = await getShopsService(args.shop_id);
    if (!shops) throw new Error(`shop with id ${args.shop_id} does not exist`);

    if (shops.length < 1) return [];
    shops = await ShopController.attachFollowers(shops);
    return shops.map(async (singleShop) => ShopController.verifyShop(singleShop));
  }

  static async verifyShop(shopPassed) {
    const shop = await shopPassed;

    if (!shop.is_verified && shop.followers >= 1000) {
      shop.is_verified = true;
      await verifyShopService(shop);
      return shop;
    }
    return shop;
  }

  static async searchShops(args, req) {
    isAuth(req.user);

    const shops = await getAllShops();
    // get all shop/s name that matches the name passed
    const exactMatch = shops.filter((shop) => trimSpaces(shop.name) === trimSpaces(args.filter.name));
    // get all products name that starts with the name passed
    const startWithMatch = shops.filter((shop) => trimSpaces(shop.name).startsWith(trimSpaces(args.filter.name)));
    // get all shop/s name contains the name passed
    const containsMatch = shops.filter((shop) => trimSpaces(shop.name).includes(trimSpaces(args.filter.name)));
    const foundShop = [...exactMatch, ...startWithMatch, ...containsMatch];
    // remove duplicates
    const uniquefoundShop = Array.from(new Set(foundShop));

    if (uniquefoundShop.length === 0) throw new Error('Sorry, we did not find any results related to your search');
    return uniquefoundShop;
  }

  static async followShop(args, req) {
    isAuth(req.user);

    const follow = await getFollow(req.user.id, args.shop_id);
    if (follow) {
      const shop = await removeFollow(req.user.id, args.shop_id);
      return ShopController.attachFollowers(shop);
    }

    // if you didn't follow the shop, then add your follow to the shop
    const shop = await addFollow({ user_id: req.user.id, shop_id: args.shop_id });
    return ShopController.attachFollowers(shop);
  }

  static async attachFollowers(shop) {
    // if you're viewing shops, then attach it's followers
    let shopsWiFollowers = null;
    if (Array.isArray(shop)) {
      shopsWiFollowers = shop.map(async (singleShop) => {
        const numberOfFollowers = await getAllFollowers(singleShop.id);
        singleShop.followers = numberOfFollowers;
        return singleShop;
      });
      return shopsWiFollowers;
    }

    // if you're following or unfollowing a shop, then attach remaining followers too.
    const numberOfFollowers = await getAllFollowers(shop.id);
    shop.followers = numberOfFollowers;
    return shop;
  }

  static async addShop(args, req) {
    isAuth(req.user);

    const { error } = validateShop(args);
    if (error) throw new Error(error.details[0].message);

    // add a user id
    const data = args;
    data.user_id = req.user.id;

    // check shop name
    const shops = await getAllShops();
    const foundShop = shops.filter((shop) => trimSpaces(shop.name) === trimSpaces(data.name));

    if (foundShop.length) throw new Error('The name of your new shop already exits, choose another one');

    const newShop = await addNewShopService(data);
    return newShop;
  }

  static async editShop(args, req) {
    isAuth(req.user);

    const { error } = validateShop(args);
    if (error) throw new Error(error.details[0].message);

    const newShop = await editShopService(args, req.user.id);
    if (!newShop) throw new Error('You are not the owner of this shop');

    return newShop;
  }

  static async deleteShop(args, req) {
    isAuth(req.user);

    const deletedShop = await deleteShopService(args.shop_id, req.user.id);
    if (!deletedShop) return { message: 'You are not the owner of this shop' };

    return { message: 'Deleted the shop successfully' };
  }
}

export default ShopController;
