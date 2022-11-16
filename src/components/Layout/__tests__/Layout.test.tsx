import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
import { renderWithReduxProviderOnly } from "../../../utils/test.utils";

test("Layout contains header and sidebar", () => {
  renderWithReduxProviderOnly(<App />, { user: { isLoggedIn: false } });

  const loginText = screen.queryByText(/login/i);
  expect(loginText).toBeInTheDocument();

  const sidebarText = screen.queryByText(/home/i);
  expect(sidebarText).toBeInTheDocument();
});

test("Layout appears on every page", async () => {
  renderWithReduxProviderOnly(<App />, { user: { isLoggedIn: false } });

  const sidebarCategoryText = screen.getByText(/category/i);
  const headerLoginText = screen.getByText(/login/i);
  expect(sidebarCategoryText).toBeInTheDocument();

  // Click to navigate to /login
  await userEvent.click(headerLoginText);

  // Check if sidebar and header is still appear
  expect(sidebarCategoryText).toBeInTheDocument();
  expect(headerLoginText).toBeInTheDocument();
});
