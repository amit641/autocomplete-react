import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

describe("Autocomplete", () => {
  const suggestions = ["apple", "banana", "cherry", "date"];

  it("renders without crashing", () => {
    const { getByTestId } = render(<Autocomplete suggestions={suggestions} />);
    expect(getByTestId("autocomplete")).toBeInTheDocument();
  });

  it("displays suggestions when input is typed", () => {
    const { getByTestId, getByLabelText, queryByText } = render(
      <Autocomplete suggestions={suggestions} />
    );

    const input = getByLabelText("Autocomplete Search");
    fireEvent.change(input, { target: { value: "a" } });

    expect(getByTestId("suggestions")).toBeInTheDocument();
    expect(queryByText("apple")).toBeInTheDocument();
    expect(queryByText("banana")).toBeInTheDocument();
    expect(queryByText("date")).toBeInTheDocument();
  });

  it("selects suggestion when clicked", () => {
    const { getByTestId, getByLabelText, queryByText } = render(
      <Autocomplete suggestions={suggestions} />
    );

    const input = getByLabelText("Autocomplete Search");
    fireEvent.change(input, { target: { value: "a" } });

    const suggestion = getByTestId("suggestion-0");
    fireEvent.click(suggestion);

    expect(queryByText("apple")).not.toBeInTheDocument();
    expect(input.value).toBe("apple");
  });
});
