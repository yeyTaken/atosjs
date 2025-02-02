import { GiftManager, TimeFormat } from '../../packages/atosjs/dist/index.js';
import 'dotenv/config';

export const time = new TimeFormat();

export const gift = new GiftManager({
  mongodb: {
    connect: process.env.DB_URI,
    dbName: 'gifts',
  },
});

