import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is my litle Trello clone made only with vanilla react!/i);
  expect(linkElement).toBeInTheDocument();
});
