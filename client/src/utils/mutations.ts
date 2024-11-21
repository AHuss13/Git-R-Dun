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
  mutation addUser($input: UserInput!) {
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
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($projectId: ID!, $input: TaskInput!) {
    addTask(projectId: $projectId, input: $input) {
      _id
      name
      status
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($projectId: ID!, $input: ProjectInput!) {
    updateProject(projectId: $projectId, input: $input) {
      _id
      name
      description
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($taskId: ID!, $input: TaskInput!) {
    updateTask(taskId: $taskId, input: $input) {
      _id
      name
      status
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

export const REMOVE_TASK = gql`
  mutation removeTask($taskId: ID!) {
    removeTask(taskId: $taskId) {
      _id
    }
  }
`;
