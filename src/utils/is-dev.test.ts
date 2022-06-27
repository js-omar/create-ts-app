import { isDevMode } from './is-dev.utils';

// Test application
describe('application', () => {
  test('isDev', () => {
    expect(isDevMode).toBe(false);
    expect(!isDevMode).toBe(true);
  });
});
