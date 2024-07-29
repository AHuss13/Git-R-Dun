const express = require("express");
const { ApolloServer } = require("apollo-server-express");
// const { expressMiddleware } = require('@apollo/server/express4');
const path = require("path");
// const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = 3001 || process.env.PORT;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/graphql', expressMiddleware(server, {
//   context: authMiddleware
// }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql}`);
    });
  });
};

startApolloServer(typeDefs, resolvers);
