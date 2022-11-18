import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { faker } from "@faker-js/faker";
import { renderWithProviders } from "utils/test.utils";
import Login from "../Login";
import Message from "components/Common/Message";
import { store } from "redux/store";
import * as action from "redux/actions/user.action";

const buildLoginData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("login validate", () => {
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
    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      data.password
    );

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    expect(
      screen.getByText(/password should be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  test("login with email longer than 30 characters", async () => {
    renderWithProviders(<Login />, { user: { isLoggedIn: false } });

    const data = {
      email: Array(30).fill("a") + "@gmail.com",
      password: "123456",
    };

    await userEvent.type(screen.getByPlaceholderText(/email/i), data.email);
    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      data.password
    );

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText(/maximum length of email is 30 characters/i)
    ).toBeInTheDocument();
  });
});

describe("login with API call", () => {
  const server = setupServer(
    rest.post<{ email: string; password: string }>(
      `${process.env.REACT_APP_BACK_END_URL}/auth`,
      (req, res, ctx) => {
        const { password, email } = req.body;

        if (!email)
          return res(
            ctx.status(401),
            ctx.json({ message: "Email is missing" })
          );

        if (!password)
          return res(
            ctx.status(401),
            ctx.json({ message: "Password is missing" })
          );
        return res(
          ctx.status(200),
          ctx.json({
            access_token: "123456",
          })
        );
      }
    ),

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

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("login successfully", async () => {
    renderWithProviders(
      <>
        <Message />
        <Login />
      </>,
      undefined,
      store
    );
    const loginSpy = jest.spyOn(action, "login");
    const fetchUserDataSpy = jest.spyOn(action, "getUserInfo");

    const { email, password } = buildLoginData();
    await userEvent.type(screen.getByPlaceholderText(/email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    expect(loginSpy).toBeCalledTimes(1);
    expect(loginSpy).toBeCalledWith(email, password);

    expect(fetchUserDataSpy).toBeCalledTimes(1);

    const pathName = window.location.pathname;
    expect(pathName).toBe("/");

    loginSpy.mockRestore();
    fetchUserDataSpy.mockRestore();
  });

  test("login with unregistered email", async () => {
    server.use(
      rest.post<{ email: string; password: string }>(
        `${process.env.REACT_APP_BACK_END_URL}/auth`,
        async (req, res, ctx) => {
          const { email } = req.body;
          if (email !== "email@example.com")
            return res(
              ctx.status(401),
              ctx.json({ message: "Email is not existed" })
            );
        }
      )
    );

    renderWithProviders(
      <>
        <Message />
        <Login />
      </>,
      undefined,
      store
    );
    const { email, password } = buildLoginData();
    await userEvent.type(screen.getByPlaceholderText(/email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("401: Email is not existed")).toBeInTheDocument();
    });
  });

  test("login with wrong password", async () => {
    server.use(
      rest.post<{ email: string; password: string }>(
        `${process.env.REACT_APP_BACK_END_URL}/auth`,
        async (req, res, ctx) => {
          const { password } = req.body;
          if (password !== "123456")
            return res(
              ctx.status(401),
              ctx.json({ message: "Password is incorrect" })
            );
        }
      )
    );

    renderWithProviders(
      <>
        <Message />
        <Login />
      </>,
      undefined,
      store
    );
    const { email, password } = buildLoginData();
    await userEvent.type(screen.getByPlaceholderText(/email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("401: Password is incorrect")
      ).toBeInTheDocument();
    });
  });

  test("unexpected error", async () => {
    const errorMessage = "Oh no server error";
    server.use(
      rest.post<{ email: string; password: string }>(
        `${process.env.REACT_APP_BACK_END_URL}/auth`,
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: errorMessage }));
        }
      )
    );
    renderWithProviders(
      <>
        <Message />
        <Login />
      </>,
      undefined,
      store
    );
    const { email, password } = buildLoginData();
    await userEvent.type(screen.getByPlaceholderText(/email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("500: Oh no server error")).toBeInTheDocument();
    });
  });
});
