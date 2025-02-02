import { GiftManager, TimeFormat } from '../../packages/atosjs/dist/index.js';
import dotenv from 'dotenv';

dotenv.config();

export const time = new TimeFormat();

export const gift = new GiftManager({
    mongodb: {
        connect: process.env.DB_URI,
        dbName: 'gift_db',
    }
});