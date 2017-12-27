'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./queries')
const resolvers = require('../resolvers')


module.exports = makeExecutableSchema({ typeDefs, resolvers })
