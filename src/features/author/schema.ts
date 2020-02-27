import { gql } from 'apollo-server';
import { IAuthor } from './mongo';

export const typeDef = gql`
  extend type Query {
    authors: [Author!],
    author(id: ID): Author
  }

  extend type Mutation {
    addAuthor(name: String!): Author,
    deleteAuthor(id: String!): Boolean
  }

  type Author implements Node {
    id: ID!
    name: String!
    books: [Book!]
  }
`;

export const resolvers = {
    Query: {
      authors: async (_, args, context) => await context.services.author.findAllAuthors(),
      author:  async(parent, { id }, context) => await context.services.author.findAuthor(id),
    },
    Mutation: {
      addAuthor: async (_, args, context) => await context.services.author.createAuthor(args),
      deleteAuthor: async(_, { id }, context) => await context.services.author.deleteAuthor(id)
    },
    Author: {
      // try to resolve an author's list of books
      books: async(obj: IAuthor, _, context) => await context.services.book.findAllBooks(obj.id)
    }
};