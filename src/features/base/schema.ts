const { gql } = require('apollo-server-express');
// import { gql } from 'apollo-server';

export const typeDef = gql`
  # a root interface all types
  interface Node {
    id: ID!
  }

  extend type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

export const resolvers = {
  Node: {
    __resolveType() {
      return null;
    }
  },
  Mutation: {
    uploadFile: (_, { file }) => {
      return file.then(file => {
        // curl localhost:4000/graphql \
        // -F operations='{ "query": "mutation ($file: Upload!) { uploadFile(file: $file) { filename } }", "variables": { "file": null } }' \
        // -F map='{ "0": ["variables.file"] }' \
        // -F 0=@package.json

        //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        //file.stream is a node stream that contains the contents of the uploaded file
        //node stream api: https://nodejs.org/api/stream.html
        return file;
      });
    }
  }
};