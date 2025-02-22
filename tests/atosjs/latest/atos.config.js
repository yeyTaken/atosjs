const {
    GiftManager,
    sleep,
    time,
    queue,
    ms,
} = require('../../../packages/atosjs/dist/index.cjs');

const gift = new GiftManager({
    dbLocal: {
        filePath: './gifts.json',
    },
});

module.exports = { gift, time, queue, sleep, ms };
