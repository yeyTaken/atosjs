import mongoose, { UpdateQuery } from 'mongoose';
import chalk from 'chalk';
import consola from 'consola';

import { GiftModel } from './models/gift';
import { Gift } from '../../classes/GiftManager/@types/gifts';
import { dbHandler } from '../../classes/GiftManager/@types/db';

export class MongooseHandler implements dbHandler {
  private dbName: string;

  constructor(uri: string, dbName: string = 'gifts') {
    this.dbName = dbName;
    mongoose
      .connect(uri, {
        dbName: this.dbName,
      })
      .then(() => {
        consola.success(
          chalk.gray(
            `Connected to 🍃 ${chalk.greenBright.bold('MongoDB')} (${chalk.gray.underline(this.dbName)})`
          )
        );
      })
      .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
  }

  async set(key: string, data: unknown) {
    const id = key.split('.')[1]; // Extrai o ID da chave (ex: "gifts.123" -> "123")
    // Realiza o cast de "data" para o tipo UpdateQuery<Gift>
    return GiftModel.findOneAndUpdate({ id }, data as UpdateQuery<Gift>, { upsert: true, new: true });
  }

  async get<T>(key: string): Promise<T | null> {
    const id = key.split('.')[1]; // Extrai o ID da chave (ex: "gifts.123" -> "123")
    const gift = await GiftModel.findOne({ id });
    return gift ? (gift.toObject() as T) : null;
  }

  async delete(key: string) {
    const id = key.split('.')[1]; // Extrai o ID da chave (ex: "gifts.123" -> "123")
    return GiftModel.deleteOne({ id });
  }
}
