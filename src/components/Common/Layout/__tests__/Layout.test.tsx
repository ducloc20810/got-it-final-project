import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../../App";
import { renderWithReduxProviderOnly } from "../../../../utils/test";

test("Layout contains header and sidebar", () => {
  renderWithReduxProviderOnly(<App />, { user: { isLoggedIn: false } });

  const loginText = screen.queryByText(/login/i);
  expect(loginText).toBeInTheDocument();

  const sidebarText = screen.queryByText(/home/i);
  expect(sidebarText).toBeInTheDocument();
});

test("Layout appears on every page", async () => {
  renderWithReduxProviderOnly(<App />, { user: { isLoggedIn: false } });

  expect(screen.getByText(/home/i)).toBeInTheDocument();

  // Click to navigate to /login
  await userEvent.click(screen.getByText(/login/i));

  // Check if sidebar and header is still appear
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/register/i)).toBeInTheDocument();
});
