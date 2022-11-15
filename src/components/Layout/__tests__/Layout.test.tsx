import { ReactElement } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
import { renderWithProviders } from "../../../utils/test.utils";

test("Layout contains header and sidebar", () => {
  renderWithProviders(<App />, { user: { isLoggedIn: false } });

  const header = document.querySelector(".header");
  expect(header?.querySelector("svg")).toBeInTheDocument();

  const sidebarText = screen.getByText(/home/i);
  expect(sidebarText).toBeInTheDocument();
});

test("Layout appears on every page", async () => {
  renderWithProviders(<App />, { user: { isLoggedIn: false } });

  const sidebarCategoryText = screen.getByText(/category/i);
  const headerLoginText = screen.getByText(/login/i);
  expect(sidebarCategoryText).toBeInTheDocument();

  // Click to navigate to /login
  await userEvent.click(headerLoginText);

  // Check if sidebar and header is still appear
  expect(sidebarCategoryText).toBeInTheDocument();
  expect(headerLoginText).toBeInTheDocument();
});
