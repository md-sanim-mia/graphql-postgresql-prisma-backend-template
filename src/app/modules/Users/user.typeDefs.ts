import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    # Exclude the password field from the User type
    # password field database এ আছে কিন্তু client এ দেখাবো না
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!  # ✅ add this
  }

  type Query {
    users: [User!]!
     user(id: ID!): User
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
  }
`;
