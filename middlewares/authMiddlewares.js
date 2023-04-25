const {
  Types: { ObjectId },
} = require('mongoose');
const { User } = require('../models');
const { Unauthorized } = require('http-errors');
const jwtToken = require('../helpers/jwtToken');

exports.checkAuth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer' || !token) {
      throw new Unauthorized('Not authorized');
    }

    // Витягуємо id з токена
    let id = null;
    try {
      id = jwtToken.jwtTokenVerify(token).id;
    } catch (error) {
      throw new Unauthorized('Not authorized');
    }

    // Перевіряємо чи id є валідним mongoose ObjectId
    const isValidId = ObjectId.isValid(id);
    if (!isValidId) {
      throw new Unauthorized('Not authorized');
    }

    const user = await User.findById(id).select('-password');

    if (!user || !user.token || user.token !== token) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.message === 'Invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};
