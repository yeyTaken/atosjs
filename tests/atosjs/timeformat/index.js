const { TimeFormat, ms } = require('../../../packages/atosjs/dist/index.cjs');

async function main() {
    console.log(ms('24h'));

    const a = new TimeFormat({
        time: '1s',
        type: 2,
        repeat: 3,
        start() {
            console.log('Repeat');
        }
    });

    const b = new TimeFormat({
        time: '2s',
        type: 1,
        start() {
            console.log('timeout');
        }
    });
};

main();