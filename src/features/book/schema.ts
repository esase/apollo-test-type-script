import { UserInputError, gql } from 'apollo-server';
import BookModel, { IBook } from './mongo';
import AuthorModel from '../author/mongo';

export const typeDef = gql`
  extend type Query {
    books: [Book!],
    book(id: ID): Book
  }

  extend type Mutation {
    addBook(title: String!, authorId: String!): Book,
    deleteBook(id: String!): Boolean
  }

  type Book implements Node {
    id: ID!
    title: String!
    author: Author!
  }
`;

export const resolvers = {
    Query: {
        books: async () => await BookModel.find({}).exec(),
        book:  async(_, { id }) => await BookModel.findById(id).exec()
    },
    Mutation: {
      addBook: async (_, args) => {
        const author = await AuthorModel.findById(args.authorId).exec();

        if (!author) {
          throw new UserInputError('Author id is invalid or not existing', {
            invalidArgs: Object.keys(args),
          });
        }

        return await BookModel.create(args);
      },
      deleteBook: async(_, { id }) =>  {
        const book = await BookModel.findById(id).exec();

        if (book) {
          await BookModel.findByIdAndDelete(id).exec();

          return true;
        }

        return false;
      }
    },
    Book: {
      // try to resolve a book's author
      author: async(obj: IBook) => await AuthorModel.findById(obj.authorId).exec()
  }
};