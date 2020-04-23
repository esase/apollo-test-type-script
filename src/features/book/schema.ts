import { UserInputError, gql } from 'apollo-server';
import { IBook } from './mongo';

export const typeDef = gql`
  extend type Query {
    books: [Book!],
    book(id: ID): Book
  }

  extend type Mutation {
    addBook(title: String!, authorId: String!): Book,
    deleteBook(id: String!): Boolean
  }

  type Book implements Node @cacheControl(maxAge: 120) {
    id: ID!
    title: String!
    author: Author
  }
`;

export const resolvers = {
    Query: {
        books: async (_, args, context) => await context.services.book.findAllBooks(),
        book:  async(_, { id }, context) => await context.services.book.findBook(id)
    },
    Mutation: {
      addBook: async (_, args, context) => {
        const author = await context.services.author.findAuthor(args.authorId);

        if (!author) {
          throw new UserInputError('Author id is invalid or not existing', {
            invalidArgs: Object.keys(args),
          });
        }

        return await context.services.book.createBook(args);
      },
      deleteBook: async(_, { id }, context) =>  {
        return await context.services.book.deleteBook(id);
      }
    },
    Book: {
      // try to resolve a book's author
      author: async(obj: IBook, _, context) => await context.services.author.findAuthor(obj.authorId)
  }
};