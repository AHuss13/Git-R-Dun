import { gql } from "@apollo/client";

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      name
      description
    }
  }
`;

export const QUERY_PROJECT = gql`
  query getProject($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      name
      description
      tasks {
        _id
        name
        status
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      projects {
        _id
        name
        description
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      projects {
        _id
        name
        description
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_TASKS = gql`
  query getTasks {
    tasks {
      _id
      name
      status
    }
  }
`;

export const QUERY_TASK = gql`
  query getTask($taskId: ID!) {
    task(taskId: $taskId) {
      _id
      name
      status
    }
  }
`;

export const QUERY_ME_PROJECTS = gql`
  query me {
    me {
      _id
      username
      projects {
        _id
        name
        description
        tasks {
          _id
          name
          status
        }
      }
    }
  }
`;
