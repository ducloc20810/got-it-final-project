import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { faker } from "@faker-js/faker";
import { renderWithProviders } from "utils/test.utils";
import Login from "../Login";
import Message from "components/Common/Message";
import { store } from "redux/store";

const buildLoginData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const localStorageMock = (function () {
  let store: any = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: any) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const server = setupServer(
  rest.post(`http://localhost:5000/auth`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: "123456",
      })
    );
  }),

  rest.get(
    `${process.env.REACT_APP_BACK_END_URL}/users/me`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: "1",
          name: "Loc",
        })
      );
    }
  )
);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

test("login successfully", async () => {
  const spyLocalStorage = jest.spyOn(localStorage, "removeItem");
  renderWithProviders(<Login />, { user: { isLoggedIn: false } });

  const { email, password } = buildLoginData();
  await userEvent.type(screen.getByPlaceholderText(/email/i), email);
  await userEvent.type(screen.getByPlaceholderText(/password/i), password);

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(spyLocalStorage).toHaveBeenCalled();
  const pathName = window.location.pathname;
  expect(pathName).toBe("/");
});

test("login without input value", async () => {
  renderWithProviders(<Login />, { user: { isLoggedIn: false } });

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
  expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
});

test("login with wrong format email and password", async () => {
  renderWithProviders(<Login />, { user: { isLoggedIn: false } });

  const data = {
    email: "wrongEmailFormat",
    password: "123",
  };

  await userEvent.type(screen.getByPlaceholderText(/email/i), data.email);
  await userEvent.type(screen.getByPlaceholderText(/password/i), data.password);

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
  expect(
    screen.getByText(/password should be at least 6 characters/i)
  ).toBeInTheDocument();
});

test("login with wrong email and password", async () => {});

test("unexpected error", async () => {
  const errorMessage = "Oh no server error";
  server.use(
    rest.post("http://localhost:5000/auth", async (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: errorMessage }));
    })
  );
  renderWithProviders(
    <>
      <Message />
      <Login />
    </>,
    null,
    store
  );
  const { email, password } = buildLoginData();
  await userEvent.type(screen.getByPlaceholderText(/email/i), email);
  await userEvent.type(screen.getByPlaceholderText(/password/i), password);

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
});
