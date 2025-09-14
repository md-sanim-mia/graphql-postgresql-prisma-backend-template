import { ApolloServer } from "apollo-server-express";
import app, { typeDefs, resolvers } from "./app.js";
import { userTypeDefs } from "./app/modules/Users/user.typeDefs.js";
import { userResolvers } from "./app/modules/Users/user.resolver.js";

const port = 5001;
async function main() {
  const server = new ApolloServer({ typeDefs:[userTypeDefs], resolvers:[userResolvers],formatError: (error) => {
    // Customize the error message
    return {
      message: error.message,
    };
  },
            
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}

main();