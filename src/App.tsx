import React, { Key } from "react";
import logo from "./logo.svg";
import { useQuery } from "@apollo/client";
import { GET_ISSUES } from "./gql/Query";
import "./App.css";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { IssueList } from "./components/IssueList/IssueList";

function App() {
  const { loading, error, data } = useQuery(GET_ISSUES);
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage message={error.message} />;

  return <IssueList issues={data.repository.issues.edges} />;
}

export default App;
