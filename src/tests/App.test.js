//This is an example test. Make other tests for other components

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("renders component correctly", () => {
    render(<App />);
    // Add your assertions using `screen` object from `@testing-library/react`
    //expect(screen.getByText("")).toBeInTheDocument();
  });
});
