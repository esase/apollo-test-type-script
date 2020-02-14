import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './global-schema';
import * as depthLimit from 'graphql-depth-limit';
import * as mongoose from 'mongoose';

// connect to mongo
mongoose.connect('mongodb://localhost:27017/admin', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: 'root',
  pass: 'example'
});

mongoose.connection.once('open', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    validationRules: [depthLimit(3)], // the maximum level of nested nodes
  });

  server.listen()
    .then(({ url }) => console.log(`Server ready at ${url}. `));
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        server.stop();
        mongoose.connection.close();
    });
  }
});
