import { render, screen } from '@testing-library/react';
import Field from './Field';

test('renders Field', () => {
  render(<Field placeholder="Name"/>);
  const inputElement = screen.getByPlaceholderText("Name");
  expect(inputElement).toBeInTheDocument();
});

test('renders Field w/ error', () => {
  render(<Field error="foo" />);
  const inputElement = screen.getByText("foo");
  expect(inputElement).toBeInTheDocument();
});
