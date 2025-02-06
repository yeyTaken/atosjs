import { QuickDB } from 'quick.db';
import consola from 'consola';
import chalk from 'chalk';

import { dbHandler } from '../../classes/GiftManager/@types/db';

export class QuickDBHandler implements dbHandler {
  private db: QuickDB;

  constructor(filePath: string) {
    this.db = new QuickDB({ filePath });
    consola.success(
      chalk.gray(`Connected to 📦 ${chalk.yellowBright.bold('QuickDB')} (${chalk.gray.underline(filePath)})`)
    );
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
