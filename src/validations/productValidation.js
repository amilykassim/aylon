/* eslint-disable no-restricted-globals */
import Joi from '@hapi/joi';
import Helper from '../helpers/helper';

const { validate } = Helper;

class Validations {
  static validateProduct(args) {
    const schema = {
      product_id: Joi.number().integer().min(1),
      shop_id: Joi.number().integer().min(1),
      category_id: Joi.number().integer().min(1),
      name: Joi.string().min(3).max(255),
      description: Joi.string().min(3).max(1000),
      price: Joi.number().integer().min(1),
      image1: Joi.string().min(3).max(510),
      image2: Joi.string().min(3).max(510),
      image3: Joi.string().min(3).max(510),
    };

    return validate(args, schema);
  }
}

export default Validations;
