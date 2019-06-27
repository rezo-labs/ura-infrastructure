const config = require('../config');

module.exports = require('babel-jest').createTransformer(config.babelrc);
