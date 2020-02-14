const { gql } = require('apollo-server-express');

export const typeDef = gql`
  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  # a root interface all types
  interface Node {
    id: ID!
  }
`;

export const resolvers = {
  Node: {
    __resolveType() {
      return null;
    }
  }
};