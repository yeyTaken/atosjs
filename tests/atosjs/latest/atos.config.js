const {
    GiftManager,
    sleep,
    time,
    queue,
    ms,
} = require('../../../packages/atosjs/dist/index.cjs');


const gift = new GiftManager({
    logging: true, // padrão é 'true', esse logging serve para mostrar a log de conectado com a database
});

module.exports = { gift, time, queue, sleep, ms };