import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  {
    repository(owner: "facebook", name: "react") {
      issues(first: 6, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            id
            title
            url
            body
            state
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  {
    repository(owner: "facebook", name: "react") {
      issues(first: 6, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            body
            title
            id
            publishedAt
            createdAt
            author {
              login
            }
            comments(first: 10) {
              edges {
                node {
                  body
                  publishedAt
                  author {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
