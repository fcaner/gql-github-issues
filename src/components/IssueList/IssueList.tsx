import { Key } from "react";
import { Issue } from "../../interfaces/issue";

interface Props {
  issues: [];
}

export const IssueList = (props: Props) => {
  return (
    <>
      {props.issues.map((item: Issue, i: Key) => {
        return <div key={i}>{item.node.title}</div>;
      })}
    </>
  );
};
