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

import { 
  typeDef as author, 
  resolvers as authorResolvers
} from './features/author/schema';

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
