import { defineConfig } from 'vitest/config';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

function getSetupFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory()) {
      files.push(...getSetupFiles(fullPath));
    } else if (item === 'setupTests.ts') {
      files.push(fullPath);
    }
  }

  return files;
}

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['**/node_modules/**'],
    setupFiles: getSetupFiles('./packages'),
    include: ['./packages/**/test/**/*.test.ts'],
  },
});
