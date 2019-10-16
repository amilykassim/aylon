/* eslint-disable no-restricted-globals */
import validator from 'validator';
import UserValidation from '../validations/userValidation';
import ProductValidation from '../validations/productValidation';
import Response from '../helpers/response';

const { validationError } = Response;

const { validateLoginService, validateSignupService } = UserValidation;
const { validateProductService } = ProductValidation;

class Validations {
  static async validateSignUp(req, res, next) {
    const { error } = validateSignupService(req);
    if (error) return validationError(res, error.details[0].message);

    next();
  }

  static async validateLogin(req, res, next) {
    const { error } = validateLoginService(req);
    if (error) return validationError(res, error.details[0].message);

    next();
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
