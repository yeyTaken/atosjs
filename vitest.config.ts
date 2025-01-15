import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['**/node_modules/**', '**/test/setupTests.ts'],
    setupFiles: ['./test/setupTests.ts'],  // Apenas para configuração global, não é um teste
    include: ['test/**/*.ts'],             // Aponta para os testes
  },
});
