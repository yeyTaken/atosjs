const { GiftManager, TimeFormat } = require('atosjs');

// TimeFormat
const t = new TimeFormat();

// GiftManager
const gm = new GiftManager({
    fileName: 'atos.gifts', // archive file name
    fileType: 1 // 1 is JSON, 2 is YAML.
});

module.exports = {
    gift: gm,
    time: t,
}