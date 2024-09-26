import { gql } from "@apollo/client";

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
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

export const QUERY_PROJECT = gql`
  query getProject($projectId: ID!) {
    project(projectId: $projectId) {
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
  }
`;

export const QUERY_USERS = gql`
  query user($username: String!) {
    user(username: $username) {
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
      projectId
      owner
      createdAt
    }
  }
`;
