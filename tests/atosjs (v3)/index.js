import { gift, time } from './atos.config.js';

async function main() {
    const giftId = await gift.generate({
        type: 'test',
        value: 'test giftId in string'
    });
    console.log(giftId)

};

main().catch(console.error);