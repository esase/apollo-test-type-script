import { gql } from 'apollo-server';
import AuthorModel, { IAuthor } from './mongo';
import BookModel from '../book/mongo';

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
      authors: async () => await AuthorModel.find({}).exec(),
      author:  async(parent, { id }) => await AuthorModel.findById(id).exec(),
    },
    Mutation: {
      addAuthor: async (_, args) => await AuthorModel.create(args),
      deleteAuthor: async(_, args) =>  {
        const author = await AuthorModel.findById(args.id).exec();

        if (author) {
          await AuthorModel.findByIdAndDelete(args.id).exec();

          return true;
        }

        return false;
      }
    },
    Author: {
      // try to resolve an author's list of books
      books: async(obj: IAuthor) => await BookModel.find({
        authorId: obj.id
      }).exec()
    }
};