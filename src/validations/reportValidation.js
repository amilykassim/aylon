/* eslint-disable no-restricted-globals */
import Joi from '@hapi/joi';
import Helper from '../helpers/helper';

const { validate } = Helper;

class Validations {
  static validateReport(args) {
    const schema = {
      user_id: Joi.number(),
      description: Joi.string().min(3).max(255),
    };

    return validate(args, schema);
  }
}

export default Validations;
