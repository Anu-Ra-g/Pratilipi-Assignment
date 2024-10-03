const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors')
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 4000;

async function startServer() {

    await server.start();

    app.use(
      '/graphql',
      cors(),
      express.json(),
      expressMiddleware(server),
    );

    app.listen(PORT, () => console.log('Server running at localhost:4000/graphql'))
}

startServer()