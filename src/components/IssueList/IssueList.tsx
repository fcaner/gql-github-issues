import React, { BaseSyntheticEvent, FormEvent, Key, useState } from "react";
import { Issue } from "../../interfaces/issue";
import "./IssueList.scss";

interface Props {
  issues: [Issue];
}

export const IssueList = (props: Props) => {
  const [currentSearchText, setSearchText] = useState("");

  const [initialList, setFilteredList] = useState<Issue[]>(props.issues);

  const resetSearch = () => {
    setSearchText("");
    setFilteredList(props.issues);
  };

  const handleFilter = (event: BaseSyntheticEvent) => {
    console.log(event);
    setSearchText(event.target.value);
    const newList = props.issues.filter((ttl) => {
      return (
        ttl.node.title.includes(event.target.value) ||
        ttl.node.body.includes(event.target.value)
      );
    });
    setFilteredList(newList);
  };

  const handleBadgeFilter = (event: BaseSyntheticEvent) => {
    const newList = props.issues.filter((stt) => {
      setSearchText(event.target.value);
      return stt.node.state.includes(event.target.value);
    });

    currentSearchText === event.target.value
      ? resetSearch()
      : setFilteredList(newList);
  };

  return (
    <>
      <div className="header">React Repo Issues</div>
      <div className="app">
        <div className="filter">
          <label>Filter</label>
          <input
            type="text"
            placeholder="search for something"
            onChange={handleFilter}
            value={currentSearchText}
          />
        </div>
        <div className="buttonrow">
          <button
            className="button"
            type="button"
            onClick={handleBadgeFilter}
            value="OPEN"
          >
            Open
          </button>
          <button
            className="button"
            type="button"
            onClick={handleBadgeFilter}
            value="CLOSED"
          >
            Closed
          </button>
        </div>

        {initialList.length > 0 ? (
          initialList.map((item: Issue, i: Key) => {
            return (
              <div className="table">
                <div className="row" key={i}>
                  <div className="cell"> {item.node.title}</div>
                  <div className="cell">{item.node.state}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Nothing found</div>
        )}
      </div>
    </>
  );
};
