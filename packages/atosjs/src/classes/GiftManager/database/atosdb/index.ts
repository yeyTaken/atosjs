import { AtosDB } from '@atosjs/database';
import consola from 'consola';
import chalk from 'chalk';

import { dbHandler } from '../../types/db';

export class AtosDBHandler implements dbHandler {
  private db: AtosDB;
  private logging: boolean;

  constructor(filePath: string, logging: boolean = true) {
    this.db = new AtosDB({ filePath });
    this.logging = logging;
    if (this.logging) {
      consola.success(
        chalk.gray(`Connected to 📦 ${chalk.blueBright.bold('AtosDB')} (${chalk.gray.underline(filePath)})`)
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
