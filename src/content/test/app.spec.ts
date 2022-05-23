import { app } from '../src/app';

describe('application', () => {
  // Test application
  test('application', () => {
    expect(app()).toBe('app');
  });
});
