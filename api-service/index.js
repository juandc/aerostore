const cors = require('micro-cors');
const { router, get, post } = require('microrouter');
const { microGraphql, microGraphiql } = require('graphql-server-micro');
const executableSchema = require('./schema');

const handler = router(
  get('/api/graphiql', microGraphiql({
    endpointURL: '/api/graphql',
  })),
  post('/api/graphql', microGraphql({
    schema: executableSchema,
  })),
);

module.exports = cors({ allowMethods: ['GET', 'POST'] })(handler);
