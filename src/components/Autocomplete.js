import React, { useState } from "react";

/**
 * A component that provides autocomplete functionality for a search input field.
 * @param {Object} props - The props object that contains an array of suggestions.
 * @param {Array} props.suggestions - An array of strings that represent the suggestions to be displayed.
 * @returns {JSX.Element} - A JSX element that renders the Autocomplete component.
 */
function Autocomplete({ suggestions }) {
  const [input, setInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [active, setActive] = useState(0);
  const [isShow, setIsShow] = useState(false);

  /**
   * Filters the list of suggestions based on the input string.
   * @param {string} str - The input string to filter the suggestions.
   * @returns {Array} - An array of strings that match the input string.
   */
  const filterListHandler = (str) => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(str.toLowerCase())
    );
  };

  /**
   * Handles the input change event and updates the state accordingly.
   * @param {Object} e - The event object that contains the input value.
   */
  const inputChangeHandler = (e) => {
    setInput(e.target.value);
    setFilteredList(filterListHandler(e.target.value));
    setActive(0);
    setIsShow(true);
  };

  /**
   * Handles the key down event and updates the state accordingly.
   * @param {Object} e - The event object that contains the key code.
   */
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      // For enter key
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

  /**
   * Handles the selection of a suggestion and updates the state accordingly.
   * @param {string} str - The selected suggestion string.
   */
  const onSelect = (str) => {
    setActive(0);
    setIsShow(false);
    setFilteredList([]);
    setInput(str);
  };

  /**
   * Renders the autocomplete suggestions based on the state.
   * @returns {JSX.Element} - A JSX element that renders the autocomplete suggestions.
   */
  const renderAutoComplete = () => {
    if (isShow && input) {
      if (filteredList.length) {
        return (
          <ul className="autocomplete-list" data-testid="suggestions">
            {filteredList.map((item, index) => {
              return (
                <li
                  className={index === active ? "active" : ""}
                  key={index}
                  data-testid={`suggestion-${index}`}
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
          <div className="no-autocomplete-list">
            <em>Not found</em>
          </div>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <div className="autocomplete-wrapper" data-testid="autocomplete">
      <label htmlFor="autocomplete-input">Autocomplete Search</label>
      <input
        id="autocomplete-input"
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
