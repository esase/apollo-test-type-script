import { merge } from 'lodash';

// list of all features
import { 
  typeDef as base, 
  resolvers as baseResolvers,
} from './features/base/schema';

import { 
  typeDef as book, 
  resolvers as bookResolvers
} from './features/book/schema';

import bookService from './features/book/service';

import { 
  typeDef as author, 
  resolvers as authorResolvers
} from './features/author/schema';

import authorService from './features/author/service';

const file = `
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

const query = `
  type Query {
    _empty: String
  }
`;

const mutation = `
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [
  file,
  query,
  mutation,
  base,
  book,
  author
];

export const resolvers = merge(
  {}, 
  baseResolvers,
  bookResolvers,
  authorResolvers
);

export const services = [
  bookService,
  authorService
];