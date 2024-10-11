import { gql } from "@apollo/client";

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
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
    }
  }
`;

export const QUERY_PROJECT = gql`
  query getProject($projectId: ID!) {
    project(projectId: $projectId) {
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
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
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
      owner {
        _id
        username
      }
      createdAt
    }
  }
`;
