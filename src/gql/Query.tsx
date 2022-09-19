import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  {
    repository(owner: "facebook", name: "react") {
      issues(last: 2) {
        edges {
          node {
            title
            url
            body
            state
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
