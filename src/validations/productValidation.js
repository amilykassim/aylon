/* eslint-disable no-restricted-globals */
import Joi from '@hapi/joi';
import Helper from '../helpers/helper';

const { validate } = Helper;

class Validations {
  static validateProduct(args) {
    const schema = {
      name: Joi.string().required().min(3).max(255),
      category: Joi.string().required().min(3).max(255),
      quantity: Joi.number().integer().required().min(1),
      price: Joi.number().integer().required().min(1),
      product_id: Joi.number().integer().min(1),
    };

    return validate(args, schema);
  }
}

export default Validations;
