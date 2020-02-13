/* eslint-disable no-restricted-globals */
import Joi from '@hapi/joi';
import voca from 'voca';
import Helper from '../helpers/helper';

const { trimSpaces, validate } = Helper;

class Validations {
  static validateSignUp(args) {
    const schema = {
      username: Joi.string().required().min(3).max(255),
      password: Joi.string().required().min(6).max(255),
      is_admin: Joi.boolean(),
    };

    const data = {};
    data.username = trimSpaces(args.username);
    data.password = voca.trim(args.password);

    return validate(data, schema);
  }
}

export default Validations;
