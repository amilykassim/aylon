/** Class representing response util. */
import voca from 'voca';
import Joi from '@hapi/joi';


class Helper {
  constructor() {
    this.successMessageSchemaName = 'Success';
    this.successMessageSchema = `
    type ${this.successMessageSchemaName} {
    message: String
  }`;
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

  static isAuth(user) {
    if (!user) throw new Error('Invalid token');
  }

  static trimSpaces(data) {
    return voca.camelCase(data).trim().toLowerCase();
  }
}

export default Helper;
