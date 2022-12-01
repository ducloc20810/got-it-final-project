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
import { TEST_IMAGE_URL } from 'constants/test';
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

  rest.post<{ image_url: string; description: string }>(
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

  rest.put<{ image_url: string; description: string }>(
    `${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId/items/:itemId`,
    (req, res, ctx) => {
      const { image_url, description } = req.body;

      if (!image_url) return res(ctx.status(400), ctx.json({ message: 'Image url is missing' }));
      if (!description) {
        return res(ctx.status(400), ctx.json({ message: 'Description is missing' }));
      }

      return res(
        ctx.status(201),
        ctx.json({
          image_url,
          description,
        }),
      );
    },
  ),

  rest.delete(`${process.env.REACT_APP_BACK_END_URL}/categories/:categoryId/items/:itemId`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))),
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

describe('edit item', () => {
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

      await userEvent.click(screen.getAllByRole('button', { name: /edit item/i })[0]);

      await waitFor(() => {
        expect(screen.getByText(/edit item form/i)).toBeInTheDocument();
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

      await userEvent.click(screen.getAllByRole('button', { name: /edit item/i })[0]);

      await waitFor(() => {
        expect(screen.getByText(/authentication warning/i)).toBeInTheDocument();
      });
    });
  });

  describe('call api', () => {
    test('edit successfully', async () => {
      // Edit category with id 1
      const editItemActionSpy = jest.spyOn(itemAction, 'editItem');
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

      await userEvent.click(screen.getAllByRole('button', { name: /edit item/i })[0]);

      await waitFor(() => {
        expect(screen.getByText(/edit item form/i)).toBeInTheDocument();
      });

      const data = {
        imageUrl: TEST_IMAGE_URL,
        description: 'item description test',
      };

      await userEvent.clear(screen.getByPlaceholderText(/image url/i));
      await userEvent.type(screen.getByPlaceholderText(/image url/i), data.imageUrl);

      await userEvent.clear(screen.getByPlaceholderText(/description/i));
      await userEvent.type(screen.getByPlaceholderText(/description/i), data.description);

      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText(/edit item successfully/i)).toBeInTheDocument();
      });

      // Check if item is updated on the UI
      expect(screen.getByRole('cell', { name: /item description test/i })).toBeInTheDocument();

      expect(editItemActionSpy).toBeCalledTimes(1);
      expect(editItemActionSpy).toHaveBeenCalledWith(+categoryId, 1, expect.objectContaining(data));

      editItemActionSpy.mockRestore();
    });
  });
});

describe('remove category', () => {
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

      await userEvent.click(screen.getAllByRole('button', { name: /remove item/i })[0]);

      await waitFor(() => {
        expect(screen.getByText(/delete warning/i)).toBeInTheDocument();
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

      await userEvent.click(screen.getAllByRole('button', { name: /edit item/i })[0]);

      await waitFor(() => {
        expect(screen.getByText(/authentication warning/i)).toBeInTheDocument();
      });
    });
  });

  describe('call api', () => {
    test('remove successfully', async () => {
      // Edit category with id 1
      const deleteItemSpyOn = jest.spyOn(itemAction, 'removeItem');
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

      await userEvent.click(screen.getAllByRole('button', { name: /remove item/i })[0]);

      await waitFor(() => {
        expect(screen.getByText(/delete warning/i)).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('button', { name: /confirm/i }));

      await waitFor(() => {
        expect(screen.getByText(/delete item successfully/i)).toBeInTheDocument();
      });

      // Check if item is updated on the UI
      expect(screen.queryByRole('cell', { name: /item 1 description/i })).toBeNull();

      expect(deleteItemSpyOn).toBeCalledTimes(1);
      expect(deleteItemSpyOn).toBeCalledWith(+categoryId, 1);

      deleteItemSpyOn.mockRestore();
    });
  });
});
