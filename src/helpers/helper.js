/** Class representing response util. */
import voca from 'voca';

class Helper {
  constructor() {
    this.successMessageSchemaName = 'Success';
    this.successMessageSchema = `
    type ${this.successMessageSchemaName} {
    message: String
  }`;
  }

  static isAuth(user) {
    if (!user) throw new Error('Invalid token');
  }

  static trimSpaces(data) {
    return voca.camelCase(data).trim().toLowerCase();
  }
}

export default Helper;
