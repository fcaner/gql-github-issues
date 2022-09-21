import { BaseSyntheticEvent, Key, useCallback, useState } from "react";
import { ISSUE } from "../../interfaces/issue";
import "./IssueList.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  issues: [ISSUE];
}

export const IssueList = (props: Props) => {
  const [currentSearchText, setSearchText] = useState("");

  const [initialList, setFilteredList] = useState<ISSUE[]>(props.issues);

  const resetSearch = () => {
    setSearchText("");
    setFilteredList(props.issues);
  };

  const handleFilter = (event: BaseSyntheticEvent) => {
    setSearchText(event.target.value);
    const newList = props.issues.filter((ttl) => {
      return (
        ttl.node.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        ttl.node.body.toLowerCase().includes(event.target.value.toLowerCase())
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

  const navigate = useNavigate();
  const handleOnClick = useCallback(
    (x: BaseSyntheticEvent) =>
      navigate(`/${x.target.id}/detail`, { replace: true }),
    [navigate]
  );

  return (
    <>
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
          initialList.map((item: ISSUE, i: Key) => {
            return (
              <div className="table">
                <div
                  id={item.node.id}
                  className="row"
                  key={i}
                  onClick={handleOnClick}
                >
                  <div className="cell" id={item.node.id}>
                    {item.node.title}
                  </div>
                  <div className="cell" id={item.node.id}>
                    {item.node.state}
                  </div>
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
