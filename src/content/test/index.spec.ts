import { app } from '../src/index';

describe('application', () => {
  // Test application
  test('application', () => {
    expect(app()).toBe('app');
  });
});
