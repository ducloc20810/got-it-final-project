import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import { renderWithProviders } from 'utils/test.utils';
import SignUp from 'pages/SignUp/SignUp';
import Message from 'components/Common/Message';
import { store } from 'redux/store';
import * as action from 'redux/actions/user.action';

const buildSignUpData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: 'Tran Duc Loc',
});

describe('sign up validate', () => {
  test('sign up without input value', async () => {
    renderWithProviders(<SignUp />, { user: { isLoggedIn: false } });

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
  });

  test('sign up with wrong format email and password', async () => {
    renderWithProviders(<SignUp />, { user: { isLoggedIn: false } });

    const data = {
      email: 'wrongEmailFormat',
      password: '123',
      name: 'Trần Đức Lộc',
    };

    await userEvent.type(screen.getByPlaceholderText(/email/i), data.email);
    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      data.password,
    );
    await userEvent.type(screen.getByPlaceholderText(/your name/i), data.name);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    expect(
      screen.getByText(
        /name should not contain any special characters, numbers and have more than one space between words/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    expect(
      screen.getByText(/password should be at least 6 characters/i),
    ).toBeInTheDocument();
  });

  test('sign up with email and name longer than 30 characters', async () => {
    renderWithProviders(<SignUp />, { user: { isLoggedIn: false } });

    const data = {
      email: `${Array(30).fill('a')}@gmail.com`,
      password: '123456',
      name: Array(30).fill('a').toString(),
    };

    await userEvent.type(screen.getByPlaceholderText(/your name/i), data.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), data.email);
    await userEvent.type(
      screen.getByPlaceholderText(/password/i),
      data.password,
    );

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    expect(
      screen.getByText(/maximum length of email is 30 characters/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/maximum length of name is 30 characters/i),
    ).toBeInTheDocument();
  });
});

describe('sign up with API call', () => {
  const server = setupServer(
    rest.post<{ email: string; password: string; name: string }>(
      `${process.env.REACT_APP_BACK_END_URL}/users`,
      (req, res, ctx) => {
        const { password, email, name } = req.body;

        if (!email) {
          return res(
            ctx.status(401),
            ctx.json({ message: 'Email is missing' }),
          );
        }

        if (!password) {
          return res(
            ctx.status(401),
            ctx.json({ message: 'Password is missing' }),
          );
        }

        if (!name) {
          return res(ctx.status(401), ctx.json({ message: 'Name is missing' }));
        }
        return res(
          ctx.status(200),
          ctx.json({
            access_token: '123456',
          }),
        );
      },
    ),

    rest.get(
      `${process.env.REACT_APP_BACK_END_URL}/users/me`,
      (req, res, ctx) => res(
        ctx.status(200),
        ctx.json({
          id: '1',
          name: 'Loc',
        }),
      ),
    ),

    rest.post<{ email: string; password: string }>(
      `${process.env.REACT_APP_BACK_END_URL}/auth`,
      (req, res, ctx) => {
        const { password, email } = req.body;

        if (!email) {
          return res(
            ctx.status(401),
            ctx.json({ message: 'Email is missing' }),
          );
        }

        if (!password) {
          return res(
            ctx.status(401),
            ctx.json({ message: 'Password is missing' }),
          );
        }
        return res(
          ctx.status(200),
          ctx.json({
            access_token: '123456',
          }),
        );
      },
    ),
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

  test('sign up successfully', async () => {
    renderWithProviders(
      <>
        <Message />
        <SignUp />
      </>,
      undefined,
      store,
    );
    const signUpSpy = jest.spyOn(action, 'register');
    const loginSpy = jest.spyOn(action, 'login');
    const fetchUserDataSpy = jest.spyOn(action, 'getUserInfo');

    const { name, email, password } = buildSignUpData();
    await userEvent.type(screen.getByPlaceholderText(/your name/i), name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /register/i }),
      ).toBeInTheDocument();
    });

    expect(signUpSpy).toBeCalledTimes(1);
    expect(signUpSpy).toBeCalledWith(name, email, password);

    expect(loginSpy).toBeCalledTimes(1);
    expect(fetchUserDataSpy).toBeCalledTimes(1);

    const pathName = window.location.pathname;
    expect(pathName).toBe('/');

    signUpSpy.mockRestore();
    loginSpy.mockRestore();
    fetchUserDataSpy.mockRestore();
  });

  test('sign up with existed email', async () => {
    server.use(
      rest.post<{ email: string; password: string; name: string }>(
        `${process.env.REACT_APP_BACK_END_URL}/users`,
        async (req, res, ctx) => {
          const { email } = req.body;
          if (email === 'email@example.com') {
            return res(
              ctx.status(400),
              ctx.json({ message: 'Email has been taken' }),
            );
          }
          return res();
        },
      ),
    );

    renderWithProviders(
      <>
        <Message />
        <SignUp />
      </>,
      undefined,
      store,
    );

    const data = {
      email: 'email@example.com',
      password: '123456',
      name: 'Loc',
    };
    const { email, password, name } = data;

    await userEvent.type(screen.getByPlaceholderText(/email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);
    await userEvent.type(screen.getByPlaceholderText(/your name/i), name);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /register/i }),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('400: Email has been taken')).toBeInTheDocument();
    });
  });

  test('unexpected error', async () => {
    const errorMessage = 'Oh no server error';
    server.use(
      rest.post<{ email: string; password: string }>(
        `${process.env.REACT_APP_BACK_END_URL}/users`,
        async (req, res, ctx) => res(ctx.status(500), ctx.json({ message: errorMessage })),
      ),
    );
    renderWithProviders(
      <>
        <Message />
        <SignUp />
      </>,
      undefined,
      store,
    );
    const { email, password, name } = buildSignUpData();
    await userEvent.type(screen.getByPlaceholderText(/email/i), email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);
    await userEvent.type(screen.getByPlaceholderText(/your name/i), name);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /register/i }),
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('500: Oh no server error')).toBeInTheDocument();
    });
  });
});
