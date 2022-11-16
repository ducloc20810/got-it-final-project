import * as React from "react";
import { renderWithProviders } from "../../../utils/test.utils";
import { screen } from "@testing-library/react";

import Header from "../Header";

test("user is not logged in", () => {
  renderWithProviders(<Header />, { user: { isLoggedIn: false } });

  const loginTest = screen.getByText(/login/i);
  expect(loginTest).toBeInTheDocument();
});

test("user is logged in", () => {
  renderWithProviders(<Header />, { user: { isLoggedIn: true } });

  // const header = document.querySelector(".Header");

  // let avatar;
  // if (header)
  //   avatar = header.querySelector(
  //     "#root > div > div:nth-child(1) > div > div > div:nth-child(2) > div > div > svg"
  //   );

  // if (avatar) {
  //   userEvent.click(avatar);
  //   expect(screen.getByText(/logout/i)).toBeInTheDocument();
  // }

  expect(screen.queryByText(/login/i)).toBeNull();
});
