import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/lib/node";
import { rest } from "msw";
import { renderWithProviders } from "utils/test.utils";
import { Categories } from "pages";
import * as action from "redux/actions/category.action";
import { Message } from "components";

describe("fetch category list data", () => {
  const server = setupServer(
    rest.get(
      `${process.env.REACT_APP_BACK_END_URL}/categories`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            total_items: 2,
            items: [
              {
                id: 1,
                name: "Category 1",
                description: "Category 1 description",
                img_url: "url",
              },

              {
                id: 2,
                name: "Category 2",
                description: "Category 2 description",
                img_url: "url",
              },
            ],
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

  test("fetch successfully with data", async () => {
    const fetchCategorySpy = jest.spyOn(action, "fetchCategoryList");
    const offset = 0;
    renderWithProviders(<Categories />);
    expect(fetchCategorySpy).toBeCalledTimes(1);
    expect(fetchCategorySpy).toBeCalledWith(offset);

    await waitFor(() => {
      expect(
        screen.getByRole("columnheader", {
          name: /id/i,
        })
      ).toBeInTheDocument();
    });

    fetchCategorySpy.mockRestore();
  });

  test("fetch successfully with empty data", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACK_END_URL}/categories`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              total_items: 0,
              items: [],
            })
          );
        }
      )
    );

    const fetchCategorySpy = jest.spyOn(action, "fetchCategoryList");
    const offset = 0;
    renderWithProviders(<Categories />);
    expect(fetchCategorySpy).toBeCalledTimes(1);
    expect(fetchCategorySpy).toBeCalledWith(offset);

    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    fetchCategorySpy.mockRestore();
  });

  test("unexpected error", async () => {
    const errorMessage = "Oh no server error";
    server.use(
      rest.get(
        `${process.env.REACT_APP_BACK_END_URL}/categories`,
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: errorMessage }));
        }
      )
    );

    renderWithProviders(
      <>
        <Message />
        <Categories />
      </>
    );

    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("500: Oh no server error")).toBeInTheDocument();
    });
  });
});
