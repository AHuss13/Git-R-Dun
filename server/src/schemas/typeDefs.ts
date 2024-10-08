import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Project {
    _id: ID!
    name: String!
    description: String
    owner: User!
    members: [User]
    createdAt: String!
    tasks: [Task]
  }

  input ProjectInput {
    name: String!
    description: String!
    owner: ID!
    members: [ID]
  }

  type Task {
    _id: ID!
    name: String!
    status: String!
    owner: String
    createdAt: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    # user(id: ID!): User
    projects: [Project]!
    project(projectId: ID!): Project
    tasks: [Task]!
    task(taskId: ID!): Task
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    # removeUser(userId: ID!): User
    login(email: String!, password: String!): Auth
    addProject(
      name: String!
      description: String!
      owner: ID!
      members: [ID]
    ): Project
    addTask(name: String!, projectId: ID!, owner: ID, status: String): Task
    removeProject(projectId: ID!): Project
    removeTask(taskId: ID!): Task
  }
`;

export default typeDefs;
