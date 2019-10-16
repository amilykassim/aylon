import Joi from '@hapi/joi';
import voca from 'voca';

class ProductValidation {
  static validateProductService(req) {
    const schema = {
      name: Joi.string().required().min(3).max(255),
      category: Joi.string().required().min(3).max(255),
      quantity: Joi.number().integer().required().min(1),
      price: Joi.number().integer().required().min(1),
    };

    req.body.name = voca.camelCase(req.body.name).trim().toLowerCase();
    req.body.category = voca.camelCase(req.body.category).trim().toLowerCase();

    return Joi.validate(req.body, schema);
  }
}

export default ProductValidation;
