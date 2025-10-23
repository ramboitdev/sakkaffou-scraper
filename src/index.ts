import { ApolloServer, gql } from 'apollo-server';
import { PrismaRecipeRepository } from './infra/database/PrismaRecipeRepository';

const typeDefs = gql\`
  type Recipe {
    id: ID!
    title: String!
    ingredients: String!
    steps: String
    sourceUrl: String!
  }

  type Query {
    recipes: [Recipe!]!
  }
\`;

const repo = new PrismaRecipeRepository();

const resolvers = {
  Query: {
    recipes: async () => repo.findAll(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(\`Server ready at \${url}\`));