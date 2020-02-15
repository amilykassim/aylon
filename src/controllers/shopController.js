/* eslint-disable max-len */
import Helper from '../helpers/helper';
import shopValidation from '../validations/shopValidation';
import ShopService from '../services/shopServices';

const { isAuth, trimSpaces } = Helper;

const {
  getShopsService, addNewShopService, editShopService, deleteShopService,
  getAllShops,
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
        createdAt: String!
        updatedAt: String!
      }`;

    this.getShops = `getShops(
       shop_id: Int, 
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
  }

  static async getShops(args, req) {
    isAuth(req.user);

    const shops = await getShopsService(args.shop_id, req.user.id);
    if (!shops) throw new Error(`You don't have a shop with id ${args.shop_id}`);

    if (shops.length < 1) return [];
    return shops;
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
