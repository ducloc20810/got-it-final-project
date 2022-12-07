import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'utils/test';
import Home from '../Home';

test('Homepage with greeting message', async () => {
  renderWithProviders(<Home />);

  expect(screen.getByText(/welcome to Hello/i)).toBeInTheDocument();
  expect(
    screen.getByText(
      /a category management system that allows you to share category and item list/i,
    ),
  ).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /get started/i }));
  const pathName = window.location.pathname;
  expect(pathName).toBe('/categories');
});
