import { QuickDB } from 'quick.db';
import { consola } from 'consola';
import chalk from 'chalk';

import { dbHandler } from '../../types/db';

export class QuickDBHandler implements dbHandler {
  private db: QuickDB;
  private logging: boolean;

  constructor(filePath: string, logging: boolean = true) {
    this.db = new QuickDB({ filePath });
    this.logging = logging;
    if (this.logging) {
      consola.success(
        chalk.gray(`Connected to 📦 ${chalk.yellowBright.bold('QuickDB')} (${chalk.gray.underline(filePath)})`)
      );
    }
  }

  async set(key: string, value: unknown) {
    return this.db.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    return this.db.get(key);
  }

  async delete(key: string) {
    return this.db.delete(key);
  }
}
