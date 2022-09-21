import { ISSUE_COMMENT } from "./comment";

export interface ISSUE {
  node: {
    title: String;
    url: String;
    body: String;
    state: String;
    comments: ISSUE_COMMENT;
    createdAt: String;
    id: string;
  };
}
