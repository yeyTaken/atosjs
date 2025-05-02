import mongoose, { UpdateQuery } from 'mongoose';
import chalk from 'chalk';
import { consola } from 'consola';

import { GiftModel } from './models/gift';
import { Gift } from '../../types/gifts';
import { dbHandler } from '../../types/db';

export class MongooseHandler implements dbHandler {
  private dbName: string;
  private logging: boolean;

  constructor(uri: string, dbName: string = 'gifts', logging: boolean = true) {
    this.dbName = dbName;
    this.logging = logging;
    mongoose
      .connect(uri, {
        dbName: this.dbName,
      })
      .then(() => {
        if (this.logging) {
          consola.success(
            chalk.gray(
              `Connected to 🍃 ${chalk.greenBright.bold('MongoDB')} (${chalk.gray.underline(this.dbName)})`
            )
          );
        }
      })
      .catch((err) => console.error('Error connecting to MongoDB:', err));
  }

  async set(key: string, data: unknown) {
    const id = key.split('.')[1];
    return GiftModel.findOneAndUpdate({ id }, data as UpdateQuery<Gift>, { upsert: true, new: true });
  }

  async get<T>(key: string): Promise<T | null> {
    const id = key.split('.')[1];
    const gift = await GiftModel.findOne({ id });
    return gift ? (gift.toObject() as T) : null;
  }

  async delete(key: string) {
    const id = key.split('.')[1];
    return GiftModel.deleteOne({ id });
  }
}
