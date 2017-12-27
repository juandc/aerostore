'use strict'

const cors = require('micro-cors')
const { router, get, post } = require('microrouter')
const { microGraphql, microGraphiql } = require('graphql-server-micro')
const executableSchema = require('./schema')


const handler = router(
  get('/api/graphiql', (req, res) =>
    microGraphiql({ endpointURL: '/api/graphql' })(req, res)
  ),
  post('/api/graphql', (req, res) =>
    microGraphql({ schema: executableSchema })(req, res)
  )
)


module.exports = cors({ allowMethods: ['GET', 'POST'] })(handler)
