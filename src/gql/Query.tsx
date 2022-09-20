import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  {
    repository(owner: "facebook", name: "react") {
      issues(first: 3, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            title
            url
            body
            state
            createdAt
            comments(last: 2) {
              edges {
                node {
                  body
                }
              }
            }
          }
        }
      }
    }
  }
`;
