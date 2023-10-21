import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders the Autocomplete component", () => {
    render(<App />);
    const autocompleteElement = screen.getByTestId("autocomplete");
    expect(autocompleteElement).toBeInTheDocument();
  });
});
