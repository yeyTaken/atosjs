const { GiftManager, TimeFormat } = require('atosjs');

const time = new TimeFormat();

const gift = new GiftManager({
  dbLocal: {
    filePath: './gifts.json',
  },
});

module.exports = { time, gift };