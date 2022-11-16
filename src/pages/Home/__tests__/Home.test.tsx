import { render, screen } from "@testing-library/react";
import Home from "../Home";

test("Homepage with greeting message", () => {
  render(<Home />);

  expect(screen.getByText(/welcome to Hello/i)).toBeInTheDocument();
  expect(screen.getByText(/This is my final project/i)).toBeInTheDocument();
});
