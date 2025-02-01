import mongoose from "mongoose";
import { GiftModel } from "./models/gift";
import chalk from "chalk";
import { dbHandler } from "../../classes/GiftManager/@types/db";
import { DeleteResult } from "mongodb";
import consola from "consola";

export class MongooseHandler implements dbHandler {
    private dbName: string;

    constructor(uri: string, dbName: string = "gifts") {
        this.dbName = dbName;
        mongoose
        .connect(uri, {
            dbName: this.dbName
        })
        .then(() => {
            consola.success(chalk.gray(`Connected to 🍃 ${chalk.greenBright.bold("MongoDB")} (${chalk.gray.underline(this.dbName)})`));
        })
        .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

    }

    async set(id: string, data: any) {
        return GiftModel.findOneAndUpdate({ id }, data, { upsert: true, new: true });
    }

    async get<T>(id: string): Promise<T | null> {
        return GiftModel.findOne({ id }) as unknown as T;
    }

    async delete(id: string): Promise<DeleteResult> {
        return GiftModel.deleteOne({ id });
    }
}
