import { gift, time } from './atos.config.js';

async function main() {
    const giftId = await gift.generate({
        type: 'test',
        value: 'test giftId in string'
    });
    
    const viewGift = await gift.view(giftId);

    console.log({
        giftId,
        viewGift
    })

};
time.after('5s', () => {
    main().catch(console.error);

})