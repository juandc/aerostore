'use strict'

const methods = require('./methods')

exports.userAPI = require('./user')(methods)
exports.categoryAPI = require('./category')(methods)
