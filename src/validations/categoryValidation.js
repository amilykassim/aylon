/* eslint-disable no-restricted-globals */
import Joi from '@hapi/joi';
import Helper from '../helpers/helper';

const { validate } = Helper;

class Validations {
  static validateCategory(args) {
    const schema = {
      id: Joi.number().integer().min(1),
      name: Joi.string().min(3).max(128),
    };

    return validate(args, schema);
  }
}

export default Validations;
