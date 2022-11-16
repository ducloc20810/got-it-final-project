import { Provider } from "react-redux";
import { createStore } from "redux";
import { render } from "@testing-library/react";
import { reducer } from "redux/store";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(
  ui: React.ReactElement,
  initState = {},
  // Automatically create a store instance if no store was passed in
  store = createStore(reducer, initState),
  ...renderOptions: any
) {
  function Wrapper({ children }: React.PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderWithReduxProviderOnly(
  ui: React.ReactElement,
  initState = {},
  // Automatically create a store instance if no store was passed in
  store = createStore(reducer, initState),
  ...renderOptions: any
) {
  function Wrapper({ children }: React.PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
