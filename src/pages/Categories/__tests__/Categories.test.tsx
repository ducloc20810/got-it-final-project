/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';
import { renderWithProviders } from 'utils/test.utils';
import { Categories } from 'pages';
import * as action from 'redux/actions/category.action';
import { Message, Modal } from 'components/Common';
import { TEST_IMAGE_URL } from 'constants/test';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_BACK_END_URL}/categories`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        total_items: 2,
        items: [
          {
            id: 1,
            name: 'Category 1',
            description: 'Category 1 description',
            img_url: 'url',
          },

          {
            id: 2,
            name: 'Category 2',
            description: 'Category 2 description',
            img_url: 'url',
          },
        ],
      }),
    )),

  rest.post<{ name: string; image_url: string; description: string }>(
    `${process.env.REACT_APP_BACK_END_URL}/categories`,
    (req, res, ctx) => {
      const { name, image_url, description } = req.body;

      if (!name) return res(ctx.status(400), ctx.json({ message: 'Name is missing' }));
      if (!image_url) return res(ctx.status(400), ctx.json({ message: 'Image url is missing' }));
      if (!description) {
        return res(ctx.status(400), ctx.json({ message: 'Description is missing' }));
      }

      return res(
        ctx.status(201),
        ctx.json({
          id: 3,
          name,
          image_url,
          description,
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

describe('fetch category list data', () => {
  test('fetch successfully with data', async () => {
    const fetchCategorySpy = jest.spyOn(action, 'fetchCategoryList');
    const pageNumber = 1;

    renderWithProviders(<Categories />);
    expect(fetchCategorySpy).toBeCalledTimes(1);
    expect(fetchCategorySpy).toBeCalledWith(pageNumber);

    await waitFor(() => {
      expect(
        screen.getByRole('columnheader', {
          name: /id/i,
        }),
      ).toBeInTheDocument();
    });

    fetchCategorySpy.mockRestore();
  });

  test('fetch successfully with empty data', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_BACK_END_URL}/categories`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            total_items: 0,
            items: [],
          }),
        )),
    );

    const fetchCategorySpy = jest.spyOn(action, 'fetchCategoryList');
    const pageNumber = 1;
    renderWithProviders(<Categories />);
    expect(fetchCategorySpy).toBeCalledTimes(1);
    expect(fetchCategorySpy).toBeCalledWith(pageNumber);

    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    fetchCategorySpy.mockRestore();
  });

  test('unexpected error', async () => {
    const errorMessage = 'Oh no server error';
    server.use(
      rest.get(`${process.env.REACT_APP_BACK_END_URL}/categories`, async (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: errorMessage }))),
    );

    renderWithProviders(
      <>
        <Message />
        <Categories />
      </>,
    );

    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('500: Oh no server error')).toBeInTheDocument();
    });
  });
});

describe('create category', () => {
  describe('open modal', () => {
    test('user is logged in', async () => {
      renderWithProviders(
        <>
          <Modal />
          <Message />
          <Categories />
        </>,
        { user: { isLoggedIn: true } },
      );

      await waitFor(() => {
        expect(
          screen.getByRole('columnheader', {
            name: /id/i,
          }),
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /create category/i }));

      await waitFor(() => {
        expect(screen.getByText(/create category form/i)).toBeInTheDocument();
      });
    });

    test('user is not logged in', async () => {
      renderWithProviders(
        <>
          <Modal />
          <Message />
          <Categories />
        </>,
        { user: { isLoggedIn: false } },
      );

      await waitFor(() => {
        expect(
          screen.getByRole('columnheader', {
            name: /id/i,
          }),
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /create category/i }));

      await waitFor(() => {
        expect(screen.getByText(/warning authentication/i)).toBeInTheDocument();
      });
    });
  });

  describe('form validation', () => {
    test('submit with empty inputs', async () => {
      renderWithProviders(
        <>
          <Modal />
          <Message />
          <Categories />
        </>,
        { user: { isLoggedIn: true } },
      );

      await waitFor(() => {
        expect(
          screen.getByRole('columnheader', {
            name: /id/i,
          }),
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /create category/i }));

      await waitFor(() => {
        expect(screen.getByText(/create category form/i)).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(screen.getByText(/please enter your category name/i));
      expect(screen.getByText(/please enter your category image url/i));
      expect(screen.getByText(/please enter your category description/i));
    });
  });

  describe('call api', () => {
    test('create successfully', async () => {
      renderWithProviders(
        <>
          <Modal />
          <Message />
          <Categories />
        </>,
        { user: { isLoggedIn: true } },
      );

      await waitFor(() => {
        expect(
          screen.getByRole('columnheader', {
            name: /id/i,
          }),
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /create category/i }));

      await waitFor(() => {
        expect(screen.getByText(/create category form/i)).toBeInTheDocument();
      });

      const data = {
        name: 'category test',
        imageUrl: TEST_IMAGE_URL,
        description: 'category description test',
      };

      await userEvent.type(screen.getByPlaceholderText(/name/i), data.name);

      await userEvent.type(screen.getByPlaceholderText(/image url/i), data.imageUrl);

      await userEvent.type(screen.getByPlaceholderText(/description/i), data.description);

      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText(/create category successfully/i)).toBeInTheDocument();
      });
    });

    test('submit with invalid image URL', async () => {
      server.use(
        rest.post(`${process.env.REACT_APP_BACK_END_URL}/categories`, async (_, res, ctx) =>
          res(
            ctx.status(400),
            ctx.json({
              message: 'Not a valid URL',
            }),
          )),
      );

      renderWithProviders(
        <>
          <Modal />
          <Message />
          <Categories />
        </>,
        { user: { isLoggedIn: true } },
      );

      await waitFor(() => {
        expect(
          screen.getByRole('columnheader', {
            name: /id/i,
          }),
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /create category/i }));

      await waitFor(() => {
        expect(screen.getByText(/create category form/i)).toBeInTheDocument();
      });

      const data = {
        name: 'category test',
        imageUrl: 'abc',
        description: 'category description test',
      };

      await userEvent.type(screen.getByPlaceholderText(/name/i), data.name);

      await userEvent.type(screen.getByPlaceholderText(/image url/i), data.imageUrl);

      await userEvent.type(screen.getByPlaceholderText(/description/i), data.description);

      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText(/400: not a valid url/i)).toBeInTheDocument();
      });
    });
  });
});
