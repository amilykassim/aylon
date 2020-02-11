import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../graphql/schema';
import graphQlResolvers from '../graphql/resolvers';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/aylon', graphqlHTTP({
  schema,
  rootValue: graphQlResolvers,
  graphiql: true,
}));

export default router;
