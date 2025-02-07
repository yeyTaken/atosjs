import { GiftManager, TimeFormat, ms } from 'atosjs';

export const gift = new GiftManager({
    dbLocal: {
        filePath: 'gifts.yaml',
    },
});

export { TimeFormat, ms };
