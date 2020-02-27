import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers, services } from './global-schema';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import depthLimit from 'graphql-depth-limit';
import mongoose from 'mongoose';

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
    debug: true,
    introspection: true,
    playground: true,
    cacheControl: {
      defaultMaxAge: 5,
    },
    plugins: [responseCachePlugin()],
    validationRules: [depthLimit(3)], // the maximum level of nested nodes,
    context: ({ req }) => {
      // init services
      let serviceList = {};
      services.forEach(service => {
        serviceList[service.name] = service.factory(1)
      });
      return {
        services: serviceList
      };
    }
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
