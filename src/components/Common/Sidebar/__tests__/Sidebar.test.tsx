import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../../../utils/test.utils";
import Sidebar from "../Sidebar";

test("Sidebar contains main pages and will style the current page with different color", () => {
  renderWithProviders(<Sidebar />);
  expect(screen.getByText(/home/i)).toHaveStyle({
    color: `var(--colorPrimary)`,
  });

  const categoryText = screen.getByText(/category/i);
  userEvent.click(categoryText);

  expect(categoryText).toHaveStyle({
    color: `var(--colorPrimary)`,
  });
});
