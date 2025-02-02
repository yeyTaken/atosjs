const { gift } = require('./atos.config');

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

main().catch(console.error);