/* eslint-disable no-restricted-globals */
import validator from 'validator';
import Joi from '@hapi/joi';
import voca from 'voca';
import ProductValidation from '../validations/productValidation';
import Helper from '../helpers/helper';


const { validationError, trimSpaces } = Helper;

const { validateProductService } = ProductValidation;

class Validations {
  static async validateSignUp(args) {
    const schema = {
      username: Joi.string().required().min(3).max(255),
      password: Joi.string().required().min(6).max(255),
      is_admin: Joi.boolean(),
    };

    const data = {};
    data.username = trimSpaces(args.username);
    data.password = voca.trim(args.password);

    return Validations.validate(data, schema);
  }

  static validate(data, schema) {
    const res = {};
    const { error } = Joi.validate(data, schema);
    // if there is an error, return an object with an error property
    if (error) {
      res.error = error;
      return res;
    }
    // if there is no error, return data
    return data;
  }

  static async validateProduct(req, res, next) {
    const { error } = validateProductService(req);
    if (error) return validationError(res, error.details[0].message);

    if (validator.contains(req.body.price, 'e')) return validationError(res, 'Only numbers are allowed');
    if (validator.contains(req.body.quantity, 'e')) return validationError(res, 'Only numbers are allowed');

    if (req.body.price >= 1000000000 || req.body.quantity >= 1000000000) {
      return validationError(res, 'The price and quantity should be below 1 Billion, i.e below < 10000000000');
    }

    next();
  }
}

export default Validations;
