import { render, screen } from '@testing-library/react';
import App from './components/App';

// Example of a unit test

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Yay — look! It's the GitHub people!/i);
  expect(linkElement).toBeInTheDocument();
});
