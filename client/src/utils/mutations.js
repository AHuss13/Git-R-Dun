import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $owner: ID!
    $members: [ID]
  ) {
    addProject(
      name: $name
      description: $description
      owner: $owner
      members: $members
    ) {
      _id
      name
      description
      owner
      members {
        _id
        username
      }
      createdAt
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask(
    $name: String!
    $projectId: ID!
    $owner: ID!
    $status: String
  ) {
    addTask(
      name: $name
      projectId: $projectId
      owner: $owner
      status: $status
    ) {
      _id
      name
      status
      projectId
      owner
      createdAt
    }
  }
`;
