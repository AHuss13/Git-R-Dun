const typeDefs = `

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    projects: [Project]
  }

  type Project {
    _id: ID!
    name: String!
    description: String
    owner: User!
    members: [User!]!
    createdAt: String!
  }

  type Task {
    _id: ID!
    name: String!
    status: String!
    projectId: ID!
    owner: String!
    createdAt: String
   }

  type Query {
    users: [User!]
    projects: [Project]!
    project(id: ID!): Project
    tasks: [Task]!
    }

  type Mutation{
    addUser(username: String!, email: String!, password: String! ): User!
    addProject(name: String!, description: String!, owner: ID!, members: [ID]): Project
    removeProject(projectId: ID!): Project
    addTask(name: String!, projectId: ID!, owner: ID!, status: String): Task
    login(email: String!, password: String!): Auth
  } 
  `;

module.exports = typeDefs;
