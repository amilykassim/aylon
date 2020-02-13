/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import routes from './routes/index';
import authentication from './middlewares/authentication';
import schema from './graphql/schema';
import graphQlResolvers from './graphql/resolvers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authentication);

app.use('/aylon', graphqlHTTP({
  schema,
  rootValue: graphQlResolvers,
  graphiql: true,
}));
app.use('/', routes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`listening to port ${port}....`));

export default server;
