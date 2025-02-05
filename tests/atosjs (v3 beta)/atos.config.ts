import { GiftManager, TimeFormat } from 'atosjs';

import 'dotenv/config';

export const time = new TimeFormat();

export const gift = new GiftManager({
  dbLocal: {
    filePath: "dbLocal.sqlite"
  },
});

