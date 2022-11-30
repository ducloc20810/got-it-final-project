/* eslint-disable camelcase */
import { waitFor, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/lib/node';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { Message, Modal } from 'components/Common';
import * as itemAction from 'redux/actions/item.action';
import { store } from 'redux/store';
import { renderWithProviders } from 'utils/test.utils';
import Items from '../Items';

const categoryId = '1';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({

        id: 1,
        name: 'Category 1',
        description: 'Category 1 description',
        img_url: 'url',

      }),
    )),
  rest.get(`${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId/items`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        total_items: 2,
        items: [
          {
            id: 1,
            author: {
              id: 1,
              name: 'Loc',
            },
            description: 'Item 1 description',
            img_url: 'url',
          },

          {
            id: 2,
            author: {
              id: 1,
              name: 'Loc',
            },
            description: 'Item 2 description',
            img_url: 'url',
          },
        ],
      }),
    )),

  rest.post<{ name: string; image_url: string; description: string }>(
    `${process.env.REACT_APP_BACK_END_URL}/categories`,
    (req, res, ctx) => {
      const { image_url, description } = req.body;

      if (!image_url) return res(ctx.status(400), ctx.json({ message: 'Image url is missing' }));
      if (!description) {
        return res(ctx.status(400), ctx.json({ message: 'Description is missing' }));
      }

      return res(
        ctx.status(201),
        ctx.json({
          id: 3,

          image_url,
          description,
        }),
      );
    },
  ),
);

window.scrollTo = jest.fn();

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

describe('fetch item list data', () => {
  test('fetch successfully with data', async () => {
    const fetchItemSpy = jest.spyOn(itemAction, 'fetchItemList');
    const pageNumber = 1;

    renderWithProviders(
      <Routes>
        <Route path="/categories/:categoryId/items" element={<Items />} />
        ,
      </Routes>,
      {},
      store,
      `/categories/${categoryId}/items`,
    );
    expect(fetchItemSpy).toBeCalledTimes(1);
    expect(fetchItemSpy).toBeCalledWith(categoryId, pageNumber);

    await waitFor(() => {
      expect(
        screen.getByRole('columnheader', {
          name: /id/i,
        }),
      ).toBeInTheDocument();
    });

    fetchItemSpy.mockRestore();
  });

  test('fetch successfully with empty data', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId/items`,
        (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              total_items: 0,
              items: [],
            }),
          ),
      ),
    );

    const fetchItemSpy = jest.spyOn(itemAction, 'fetchItemList');
    const pageNumber = 1;

    renderWithProviders(
      <Routes>
        <Route path="/categories/:categoryId/items" element={<Items />} />
      </Routes>,
      {},
      store,
      `/categories/${categoryId}/items`,
    );
    expect(fetchItemSpy).toBeCalledTimes(1);
    expect(fetchItemSpy).toBeCalledWith(categoryId, pageNumber);

    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    fetchItemSpy.mockRestore();
  });
});

describe('create item', () => {
  describe('open modal', () => {
    test('user is logged in', async () => {
      renderWithProviders(
        <>
          <Modal />
          <Message />
          <Routes>
            <Route path="/categories/:categoryId/items" element={<Items />} />
          </Routes>
          ,
        </>,
        { user: { isLoggedIn: true } },
        undefined,
        `/categories/${categoryId}/items`,
      );

      await waitFor(() => {
        expect(
          screen.getByRole('columnheader', {
            name: /id/i,
          }),
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /create item/i }));

      await waitFor(() => {
        expect(screen.getByText(/create item form/i)).toBeInTheDocument();
      });
    });

    test('user is not logged in', async () => {
      renderWithProviders(
        <>
          <Modal />
          <Message />
          <Routes>
            <Route path="/categories/:categoryId/items" element={<Items />} />
          </Routes>
          ,
        </>,
        { user: { isLoggedIn: false } },
        undefined,
        `/categories/${categoryId}/items`,
      );

      await waitFor(() => {
        expect(
          screen.getByRole('columnheader', {
            name: /id/i,
          }),
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /create item/i }));

      await waitFor(() => {
        expect(screen.getByText(/authentication warning/i)).toBeInTheDocument();
      });
    });
  });

  describe('form validation', () => {
    test('submit with empty inputs', async () => {
      renderWithProviders(
        <>
          <Modal />
          <Message />
          <Routes>
            <Route path="/categories/:categoryId/items" element={<Items />} />
          </Routes>
          ,
        </>,
        { user: { isLoggedIn: true } },
        undefined,
        `/categories/${categoryId}/items`,
      );

      await waitFor(() => {
        expect(
          screen.getByRole('columnheader', {
            name: /id/i,
          }),
        ).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /create item/i }));

      await waitFor(() => {
        expect(screen.getByText(/create item form/i)).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(screen.getByText(/please enter your item image url/i));
      expect(screen.getByText(/please enter your item description/i));
    });
  });
});
