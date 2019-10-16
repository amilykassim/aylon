/** Class representing response util. */
class Response {
  /**
       * Retuns a structured response
       * @param {object} res  details.
       * @param {string} status  details.
       * @param {string} message  details.
       * @param {object} data  details.
       * @returns {object}.
       */
  static customResponse(res, status, message = null, data = null) {
    return res.status(status).json({
      status,
      message,
      data,
    });
  }

  /**
       * @param {object} res  details.
       * @param {string} message  details.
       * @param {object} error  details.
       * @returns {object}.
       */
  static validationError(res, message) {
    return res.status(422).json({
      status: 422,
      error: 'Validation Error',
      message,
    });
  }

  /**
       * Retuns a authorization error response
       * @param {object} res  details.
       * @param {string} message  details.
       * @param {object} data  details.
       * @returns {object}.
       */
  static authenticationError(res, message) {
    return res.status(401).json({
      status: 401,
      error: 'Authentication Error',
      message,
    });
  }

  /**
       * Retuns a authorization error response
       * @param {object} res  details.
       * @param {string} message  details.
       * @param {object} data  details.
       * @returns {object}.
       */
  static authorizationError(res, message) {
    return res.status(403).json({
      status: 403,
      error: 'Authorization Error',
      message,
    });
  }

  /**
       * Retuns a not found error response
       * @param {object} res  details.
       * @param {string} message  details.
       * @param {object} data  details.
       * @returns {object}.
       */
  static notFoundError(res, message) {
    return res.status(404).json({
      status: 404,
      error: 'Not Found',
      message,
    });
  }

  /**
       * Retuns a conflict error response
       * @param {object} res  details.
       * @param {string} message  details.
       * @param {object} data  details.
       * @returns {object}.
       */
  static conflictError(res, message) {
    return res.status(409).json({
      status: 409,
      error: 'Conflict Error',
      message,
    });
  }

  /**
       * Retuns a bad error response
       * @param {object} res  details.
       * @param {string} message  details.
       * @param {object} data  details.
       * @returns {object}.
       */
  static badRequestError(res, message) {
    return res.status(400).json({
      status: 400,
      error: 'Bad Request',
      message,
    });
  }
}

export default Response;
