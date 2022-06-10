import { minus, sum } from '../src/math';

// Test application
describe('application', () => {
  test('sum', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(4, 7)).toBe(11);
  });

  test('minus', () => {
    expect(minus(3, 2)).toBe(1);
    expect(minus(7, 7)).toBe(0);
  });
});
