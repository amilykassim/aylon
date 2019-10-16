import jwt from 'jsonwebtoken';
import Response from '../helpers/response';

const { authenticationError } = Response;

export default (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;

    next();
  } catch (ex) {
    authenticationError(res, 'Invalid token');
  }
};
