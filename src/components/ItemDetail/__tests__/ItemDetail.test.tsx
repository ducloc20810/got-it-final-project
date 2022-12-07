/* eslint-disable camelcase */
import { Route, Routes } from 'react-router-dom';
import { waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { renderWithProviders } from 'utils/test.utils';
import * as itemAction from 'redux/actions/item.action';
import * as categoryAction from 'redux/actions/category.action';
import ItemDetail from '../ItemDetail';

const categoryId = '1';
const itemId = '1';
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
  rest.get(`${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId/items/:itemId`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: 1,
        author: {
          id: 1,
          name: 'Loc',
        },
        description: 'Item 1 description',
        img_url: 'url',
      }),
    )),

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

describe('fetch item list data', () => {
  test('fetch successfully with data', async () => {
    const fetchItemSpy = jest.spyOn(itemAction, 'fetchItemDetail');
    const fetchCategorySpy = jest.spyOn(categoryAction, 'fetchCategoryDetail');

    renderWithProviders(
      <Routes>
        <Route path="/categories/:categoryId/items/:itemId" element={<ItemDetail />} />
        ,
      </Routes>,
      {},
      undefined,
      `/categories/${categoryId}/items/${itemId}`,
    );

    await waitFor(() => {
      expect(screen.getByText(/item 1 description/i)).toBeInTheDocument();
      expect(screen.getByText(/loc/i)).toBeInTheDocument();
    });

    expect(fetchItemSpy).toBeCalledTimes(1);
    expect(fetchItemSpy).toBeCalledWith(+categoryId, +itemId);
    expect(fetchCategorySpy).toBeCalledTimes(1);
    expect(fetchCategorySpy).toBeCalledWith(+categoryId);

    fetchItemSpy.mockRestore();
    fetchCategorySpy.mockRestore();
  });

  test('fetch successfully with empty data', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId/items/:itemId`,
        (req, res, ctx) =>
          res(
            ctx.status(200),

          ),
      ),
    );

    const fetchItemSpy = jest.spyOn(itemAction, 'fetchItemDetail');
    const fetchCategorySpy = jest.spyOn(categoryAction, 'fetchCategoryDetail');

    renderWithProviders(
      <Routes>
        <Route path="/categories/:categoryId/items/:itemId" element={<ItemDetail />} />
        ,
      </Routes>,
      {},
      undefined,
      `/categories/${categoryId}/items/${itemId}`,
    );

    await waitFor(() => {
      expect(screen.getByText(/author/i)).toBeInTheDocument();
      expect(screen.getByText(/description/i)).toBeInTheDocument();
    });

    expect(fetchItemSpy).toBeCalledTimes(1);
    expect(fetchItemSpy).toBeCalledWith(+categoryId, +itemId);
    expect(fetchCategorySpy).toBeCalledTimes(0);

    fetchItemSpy.mockRestore();
    fetchCategorySpy.mockRestore();
  });
});
