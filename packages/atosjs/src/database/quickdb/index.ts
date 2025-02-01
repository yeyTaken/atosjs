import { QuickDB } from "quick.db";
import { dbHandler } from "../../classes/GiftManager/@types/db";

export class QuickDBHandler implements  dbHandler  {
    private db: QuickDB;

    constructor(filePath: string) {
        this.db = new QuickDB({ filePath });
    }

    async set(key: string, value: any) {
        return this.db.set(key, value);
    }

    async get<T>(key: string): Promise<T | null> {
        return this.db.get(key);
    }

    async delete(key: string) {
        return this.db.delete(key);
    }
}
