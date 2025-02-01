import { GiftManager, TimeFormat } from '../../packages/atosjs/dist/index.js';
import dotenv from 'dotenv';

dotenv.config();

// TimeFormat
export const time = new TimeFormat();
const uri = process.env.DB_URI;
// GiftManager
export const gift = new GiftManager({
    // dbLocal: {
    //     filePath: './src/gift.db',
    // }
    mongodb: {
        connect: uri,
    }
});