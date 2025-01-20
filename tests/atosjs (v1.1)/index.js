import { GiftManager } from "atosjs";

async function amain() {
    const gm = new GiftManager({
        fileName: 'using-bun',
        fileType: 2
    });

    const giftId = await gm.generate({
        type: 'test',
        value: 'test giftId in string'
    });

    console.log({ 
        giftID: giftId,
        giftView: await gm.view(giftId),
        giftRedeem: await gm.redeem(giftId),
        giftRedeemError: await gm.redeem(giftId)
    });

    
};

amain()