import { vi } from 'vitest';

vi.mock('module-name', () => {
  return {
    functionName: vi.fn(),
  };
});
