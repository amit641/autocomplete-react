import React, { useState } from "react";

function Autocomplete({ suggestions }) {
  const [input, setInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [active, setActive] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const filterListHandler = (str) => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(str.toLowerCase())
    );
  };

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
    setFilteredList(filterListHandler(e.target.value));
    setActive(0);
    setIsShow(true);
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      // For space key
      setInput(filteredList[active]);
      setActive(0);
      setIsShow(false);
      setFilteredList([]);
    } else if (e.keyCode === 38) {
      // For up arrow key
      return active === 0 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // For down arrow key
      return active === filteredList.length - 1 ? null : setActive(active + 1);
    }
  };

  const onSelect = (str) => {
    setActive(0);
    setIsShow(false);
    setFilteredList([]);
    setInput(str);
  };

  const renderAutoComplete = () => {
    if (isShow && input) {
      if (filteredList.length) {
        return (
          <ul className="autocomplete">
            {filteredList.map((item, index) => {
              return (
                <li
                  className={index === active ? "active" : ""}
                  key={index}
                  onClick={() => onSelect(item)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>Not found</em>
          </div>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <div className="autocomplete-wrapper">
      <label htmlFor="autocomplete-input">Autocomplete Search</label>
      <input
        id="autocomplete-inputs"
        type="text"
        value={input}
        onChange={(e) => inputChangeHandler(e)}
        onKeyDown={(e) => onKeyDownHandler(e)}
      />
      {renderAutoComplete()}
    </div>
  );
}

export default Autocomplete;
