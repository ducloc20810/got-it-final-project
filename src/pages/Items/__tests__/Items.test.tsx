import { waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { Route, Routes } from 'react-router-dom';
import * as itemAction from 'redux/actions/item.action';
import { store } from 'redux/store';
import { renderWithProviders } from 'utils/test.utils';
import Items from '../Items';

const server = setupServer(
  rest.get(`${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId`, (req, res, ctx) =>
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

        ],
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
    const categoryId = '1';

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
      rest.get(`${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId/items`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            total_items: 0,
            items: [],
          }),
        )),
    );

    const fetchItemSpy = jest.spyOn(itemAction, 'fetchItemList');
    const pageNumber = 1;
    const categoryId = '1';

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
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    fetchItemSpy.mockRestore();
  });
});
