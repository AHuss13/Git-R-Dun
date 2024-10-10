import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
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
    owner: User
    members: [User]!
    createdAt: String!
    tasks: [Task]!
  }

  input ProjectInput {
    name: String!
    description: String!
    owner: ID
  }

  type Task {
    _id: ID!
    name: String!
    status: String!
    owner: User
    createdAt: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
    projects: [Project]!
    project(projectId: ID!): Project
    tasks: [Task]!
    task(taskId: ID!): Task
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    addProject(input: ProjectInput!): Project
    addTask(name: String!, projectId: ID!, status: String): Task
    updateProject(
      projectId: ID!
      name: String
      description: String
      members: [ID]
      owner: ID
    ): Project
    removeUser(userId: ID!): User
    removeProject(projectId: ID!): Project
    removeTask(taskId: ID!): Task
  }
`;

export default typeDefs;
