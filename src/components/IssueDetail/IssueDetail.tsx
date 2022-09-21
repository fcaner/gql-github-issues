import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../gql/Query";
import { ISSUE_COMMENT } from "../../interfaces/comment";
import { ISSUE } from "../../interfaces/issue";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import "./IssueDetail.scss";

export const IssueDetail = () => {
  const currentIssueId = window.location.pathname
    .split("/")
    .join("")
    .replace("detail", "");

  const { loading, error, data } = useQuery(GET_COMMENTS);
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage message={error.message} />;

  const selectedIssue = data.repository.issues.edges.filter((x: ISSUE) => {
    return x.node.id === currentIssueId;
  });
  const creationDate = new Date(selectedIssue[0].node.createdAt);
  const creatorName = selectedIssue[0].node.author.login;
  const selectedIssueTitle = selectedIssue[0].node.title;
  const selectedIssueComments = selectedIssue[0].node.comments;

  const renderComment = selectedIssueComments.edges.map((x: ISSUE_COMMENT) => {
    const date = new Date(x.node.publishedAt);
    return (
      <>
        <div className="commentInfo">
          <div>
            <b>{x.node.author.login}</b>
            <span className="date">
              commented at {date.getDate()}/{date.getMonth()} at{" "}
              {date.getHours()}: {date.getMinutes()}
            </span>
          </div>
        </div>
        <div className="comment"> {x.node.body}</div>
      </>
    );
  });

  const renderCommentInfo = (
    <div>
      <b>{creatorName}</b>
      <span className="date">
        created at {creationDate.getDate()}/{creationDate.getMonth()} at{" "}
        {creationDate.getHours()}:{creationDate.getMinutes()}
      </span>
    </div>
  );

  const renderTitelBody = (
    <div className="titleBody"> {selectedIssue[0].node.body}</div>
  );

  return (
    <>
      <div className="title">{selectedIssueTitle}</div>
      <div className="commentInfo"> {renderCommentInfo}</div>
      <div>{renderTitelBody}</div>
      <div>{renderComment}</div>
    </>
  );
};
