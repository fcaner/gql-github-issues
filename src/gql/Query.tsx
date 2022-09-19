import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  query getIssues {
  repository(owner:"facebook", name:"react") {
    issues(last:20, states:CLOSED) {
      edges {
        node {
          title
          url
          labels(first:5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }}
  
`;