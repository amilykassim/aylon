/* eslint-disable no-restricted-globals */
import Joi from '@hapi/joi';
import Helper from '../helpers/helper';

const { validate } = Helper;

class Validations {
  static validateShop(args) {
    const schema = {
      shop_id: Joi.number().integer().min(1),
      name: Joi.string().min(3).max(255),
      description: Joi.string().min(3).max(1000),
      country_id: Joi.number().integer().min(1),
      image: Joi.string().min(3).max(510),
      active: Joi.boolean(),
      is_verified: Joi.boolean(),
    };

    return validate(args, schema);
  }
}

export default Validations;
