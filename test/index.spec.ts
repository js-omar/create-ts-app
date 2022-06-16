import { isDevMode } from '../src/utils';

describe('application', () => {
  // Test Dev Mode
  test('is not Dev Mode', () => {
    expect(isDevMode).toBe(false);
  });
});
