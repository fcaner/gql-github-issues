import { useQuery } from "@apollo/client";
import { GET_ISSUES } from "./gql/Query";
import "./App.css";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { IssueList } from "./components/IssueList/IssueList";
import { Route, Routes } from "react-router";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { IssueDetail } from "./components/IssueDetail/IssueDetail";
import "./App.css";
import { BaseSyntheticEvent, useCallback } from "react";

function Root() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    (x: BaseSyntheticEvent) => navigate("/", { replace: true }),
    [navigate]
  );

  const { loading, error, data } = useQuery(GET_ISSUES);
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage message={error.message} />;

  return (
    <>
      <div className="header" onClick={handleOnClick}>
        <span>Issues - React Repo</span>
        <span className="contact">
          <a href="mailto:fikret.caner@outlook.com">Created By Fikret Caner</a>
        </span>
      </div>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<IssueList issues={data.repository.issues.edges} />}
          />
          <Route path="/:id/detail" element={<IssueDetail />} />
          <Route path="*" element={<LoadingPage />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
