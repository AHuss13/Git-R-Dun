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

export const LOGOUT_USER = gql`
  mutation logout {
    logout {
      message
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
      user {
        username
        _id
      }
      token
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($input: ProjectInput!) {
    addProject(input: $input) {
      _id
      name
      description
      owner
      members {
        _id
        username
      }
      createdAt
      tasks {
        _id
        name
        status
        owner
        createdAt
      }
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
      projectId
      status
      owner
      createdAt
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($input: ProjectInput!) {
    updateProject(input: $input) {
      _id
      name
      description
      owner {
        _id
        username
      }
      members {
        _id
        username
      }
      createdAt
      tasks {
        _id
        name
        status
        owner {
          _id
          username
        }
        createdAt
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
    }
  }
`;

