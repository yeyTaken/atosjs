import { defineConfig } from 'vitest/config.js';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['**/node_modules/**', '**/test/setupTests.ts'],
    setupFiles: ['./test/setupTests.ts'],
    include: ['test/**/*.test.ts'],
  },
});
