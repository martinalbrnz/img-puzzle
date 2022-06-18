import { render } from '@testing-library/react';
import App from './App';

test('Void test', () => {
  render(<App />);
  expect(1).toBe(1);
});
