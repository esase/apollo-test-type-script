import { gql } from 'apollo-server';

export default gql`
  type Query {
    testMessage: String!
    testMessage2: String!
    testMessage3: String!
  }
`;