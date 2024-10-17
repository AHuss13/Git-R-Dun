// Be careful with changing this file!

import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]!
  }

  type Project {
    _id: ID
    name: String
    description: String
    tasks: [Task]!
  }

  type Task {
    _id: ID
    name: String
    status: String
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  input ProjectInput {
    name: String!
    description: String!
  }

  input TaskInput {
    name: String!
    status: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    projects: [Project]!
    project(projectId: ID!): Project
    tasks: [Task]
    task(taskId: ID!): Task
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput!): Auth
    addProject(input: ProjectInput!): Project
    addTask(projectId: ID!, input: TaskInput!): Task
    updateProject(projectId: ID!, input: ProjectInput!): Project
    removeUser(username: String!): User
    removeProject(projectId: ID!): Project
    removeTask(taskId: ID!): Task
  }
`;

export default typeDefs;
